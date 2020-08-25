import { Testing, Chart } from 'cdk8s';
import { Hosting } from '../lib/hosting';
import * as path from 'path';

test('with public option', () => {
  // GIVEN
  const app = Testing.app();
  const chart = new Chart(app, 'test');

  const contents = path.join(__dirname, 'public');
  new Hosting(chart, 'mypage', {
    public: contents
  });

  // THEN
  expect(Testing.synth(chart)).toMatchSnapshot();
});

test('with host option', () => {
  // GIVEN
  const app = Testing.app();
  const chart = new Chart(app, 'test');

  const contents = path.join(__dirname, 'public');
  new Hosting(chart, 'mypage', {
    host: 'www.example.com',
    public: contents
  });

  // THEN
  expect(Testing.synth(chart)).toMatchSnapshot();
});
