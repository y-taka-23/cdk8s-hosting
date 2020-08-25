import { Construct } from 'constructs';
import { App, Chart } from 'cdk8s';
import { Hosting } from '../lib/index';

export class MyChart extends Chart {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new Hosting(this, 'mypage');
  }
}

const app = new App();
new MyChart(app, 'example');
app.synth();
