import { Testing, Chart } from 'cdk8s';
import { Hosting } from '../lib/hosting';

test('default options', () => {
  // GIVEN
  const app = Testing.app();
  const chart = new Chart(app, 'test');

  new Hosting(chart, 'mypage');

  // THEN
  expect(Testing.synth(chart)).toMatchSnapshot();
});
