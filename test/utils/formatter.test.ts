import { camelize, pascalize } from '../../src/utils/formatter'

describe('camelize', () => {
  it.each([
    ['testString', 'testString'],
    ['TestString', 'testString'],
    ['test string', 'testString'],
    ['Test String', 'testString'],
    ['test  multiple   spaces', 'testMultipleSpaces'],
  ])('should correctly camelize %s', (input, expected) => {
    expect(camelize(input)).toBe(expected)
  })
})

describe('pascalize', () => {
  it.each([
    ['testString', 'TestString'],
    ['TestString', 'TestString'],
    ['test string', 'TestString'],
    ['Test String', 'TestString'],
    ['test  multiple   spaces', 'TestMultipleSpaces'],
  ])('should correctly pascalize %s', (input, expected) => {
    expect(pascalize(input)).toBe(expected)
  })
})
