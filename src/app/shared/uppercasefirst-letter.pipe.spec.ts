import { UppercasefirstLetterPipe } from './uppercasefirst-letter.pipe';

describe('UppercasefirstLetterPipe', () => {
  it('create an instance', () => {
    const pipe = new UppercasefirstLetterPipe();
    expect(pipe).toBeTruthy();
  });
});
