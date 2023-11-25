import type { Controller } from '@hotwired/stimulus'
import type { Store } from './store'

/**
 * Interface for a StoreController.
 * @template T The type of the store's value.
 * @extends {Controller}
 */
export interface StoreController<T> extends Controller {
  /**
   * Allows any additional properties.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any

  /**
   * The constructor for the StoreController.
   */
  constructor: {
    /**
     * An optional array of stores.
     */
    stores?: Store<T>[]
  }
}
