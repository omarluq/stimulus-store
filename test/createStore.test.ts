import { createStore } from '../src/createStore';

describe('createStore', () => {
  it('should throw an error if no initial value is provided', () => {
    expect(() => createStore({ name: 'testStore', type: Number } as any)).toThrow('Store must be initialized with a value');
  });

  it('should throw an error if no name is provided', () => {
    expect(() => createStore({ initialValue: 0, type: Number } as any)).toThrow('Store name must be of Type string');
  });

  it('should create a new store with the provided name, initial value, and type', () => {
    const store = createStore({ name: 'testStore', initialValue: 0, type: Number });
    expect(store.get()).toBe(0);
    expect(typeof store.get()).toBe('number');
    expect(store.name.toString()).toBe('Symbol(testStore)');
  });
});