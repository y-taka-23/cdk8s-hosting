import { Construct } from 'constructs';
import { ConfigMap, Container, Deployment, Volume } from 'cdk8s-plus';
import { Ingress } from '../imports/k8s';
import * as path from 'path';

export interface HostingOptions {
    host?: string
    public?: string
}

export class Hosting extends Construct {
  constructor(scope: Construct, name: string, opts: HostingOptions = {}) {
    super(scope, name);

    let publicDir = opts.public || 'public';
    if (!path.isAbsolute(publicDir)) {
        publicDir = path.join(path.dirname(process.argv[1]), publicDir);
    }

    const configMap = new ConfigMap(this, 'cm');
    configMap.addDirectory(publicDir);

    const port = 80;

    const container = new Container({
      image: 'nginx:1.19.2',
      port
    });
    container.mount('/usr/share/nginx/html', Volume.fromConfigMap(configMap));

    const deploy = new Deployment(this, 'deploy', {
      spec: {
        podSpecTemplate: {
          containers: [ container ]
        }
      }
    });

    const service = deploy.expose({ port });

    if (!opts.host) {
      new Ingress(this, 'ing', {
        spec: { backend: { serviceName: service.name, servicePort: port } }
      });
    } else {
      new Ingress(this, 'ing', {
        spec: {
          rules: [{
            host: opts.host,
            http: {
              paths: [{
                path: '/',
                backend: { serviceName: service.name, servicePort: port }
              }]
            }
          }]
        }
      });
    }
  }
}
