import type { StoreValue } from './storeValue'
import type { TypeKey } from './typeKey'

/**
 * Interface for the options to create a store.
 * @template T The type of the store's initial value.
 */
export interface StoreOptions {
  /**
   * The name of the store.
   */
  name: string

  /**
   * The type of the store's value.
   */
  type: TypeKey

  /**
   * The initial value of the store.
   */
  initialValue: StoreValue
}
