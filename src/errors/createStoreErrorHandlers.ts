import { typeMap } from '../store/storeValuesTypeMap'

/**
 * Checks if the initial value is defined.
 * @param {T} initialValue - The initial value of the store.
 * @throws {Error} If the initial value is undefined.
 */
export function checkInitialValue<T>(initialValue: T): void {
  if (typeof initialValue === 'undefined') {
    throw new Error('Store must be initialized with a value')
  }
}

/**
 * Checks if the store name is a string.
 * @param {string} name - The name of the store.
 * @throws {Error} If the store name is not a string.
 */
export function checkName(name: string): void {
  if (typeof name !== 'string') {
    throw new Error('Store name must be of Type string')
  }
}

/**
 * Checks if the type constructor exists in the type map.
 * @param {string} type - The type of the store value.
 * @throws {Error} If the type constructor does not exist in the type map.
 */
export function checkTypeConstructor(type: string): void {
  const typeConstructor = typeMap[type]
  if (typeof typeConstructor !== 'function') {
    throw new Error(`Invalid type: ${type}`)
  }
}

/**
 * Handles errors that occur when setting the store value.
 * @param {unknown} error - The error that occurred.
 * @throws {Error} A new error with the same message if the original error is an instance of Error.
 * @throws {Error} A new error with a generic message if the original error is not an instance of Error.
 */
export function handleStoreSetError(error: unknown): never {
  if (error instanceof Error) {
    throw new Error(`Failed to create store: ${error.message}`)
  } else {
    throw new Error('An unknown error occurred while creating the store')
  }
}
