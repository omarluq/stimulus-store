import {
  checkInitialValue,
  checkName,
  checkTypeConstructor,
  handleStoreSetError,
} from '../errors/createStoreErrorHandlers'
import type { StoreOptions } from '../types/storeOptions'
import type { StoreValue } from '../types/storeValue'
import type { TypeKey } from '../types/typeKey'
import { Store } from './store'

/**
 * The createStore function is a factory function that creates and returns a new instance of the Store class.
 * It takes an options object as a parameter, which should include the name, initialValue, and type for the new store.
 *
 * Here's a technical breakdown of how it works:
 * - The function destructure's the name, type, and initialValue properties from the options object.
 * - It checks if initialValue is undefined. If it is, the function throws an error because a store must be initialized with a value.
 * - It checks if name is not a string. If it isn't, the function throws an error because the store's name must be a string. This name is used to create a unique Symbol which serves as the identifier for the store.
 * - It creates a new Symbol using the name and assigns it to symbolName.
 * - It creates a new instance of the Store class, passing symbolName, initialValue, and type to the Store constructor, and returns this new instance.
 *
 * The Store class encapsulates the state (the initialValue) and provides methods to get and set that state. The type is used for type checking to ensure that the store's value always matches the expected type.
 *
 * Usage Example:
 * ```javascript
 * const countStore = createStore({ name: 'count', initialValue: 0, type: Number });
 * ```
 *
 * @param {StoreOptions<T>} options - The options for the store.
 * @param {string} options.name - The name of the store. This will be used to create a unique Symbol.
 * @param {T} options.initialValue - The initial value of the store. This must be provided.
 * @param {TypeKey} options.type - The type of the store's value. This is used for type checking [String, Number, Boolean, Array, Object].
 *
 * @returns {Store<T>} The new store.
 *
 * @throws {Error} If no initial value is provided.
 * @throws {Error} If the name is not a string.
 */

export function createStore(options: StoreOptions): Store {
  const name: string = options.name
  const type: TypeKey = options.type
  const initialValue: StoreValue = options.initialValue
  checkInitialValue(initialValue)
  checkName(name)
  checkTypeConstructor(type.name)
  const symbolName = Symbol(name)

  const store: Store = new Store(symbolName, type)
  store.set(initialValue).catch((error) => handleStoreSetError(error))
  return store
}
