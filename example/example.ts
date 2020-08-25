import { Construct } from 'constructs';
import { App, Chart } from 'cdk8s';
import { Hosting } from '../lib/index';
import * as path from 'path';

export class MyChart extends Chart {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    // default options
    new Hosting(this, 'default');

    // explicit options
    new Hosting(this, 'explicit', {
      host: 'www.example.com',
      public: path.join(__dirname, 'public')
    });
  }
}

const app = new App();
new MyChart(app, 'example');
app.synth();
