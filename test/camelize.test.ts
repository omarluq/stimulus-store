import { camelize } from '../src/utils/camelize';

describe('camelize', () => {
  it.each([
    ['testString', false, 'testString'],
    ['TestString', false, 'testString'],
    ['testString', true, 'TestString'],
    ['TestString', true, 'TestString'],

  ])('should correctly camelize %s', (input, firstCharUppercase, expected) => {
    expect(camelize(input, firstCharUppercase)).toBe(expected);
  });
});