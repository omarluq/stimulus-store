import type { Controller } from '@hotwired/stimulus'
import type { Store } from '../store/store'

/**
 * Interface for a StoreController.
 * @template T The type of the store's value.
 * @extends {Controller}
 */
export interface StoreController extends Controller {
  /**
   * Allows any additional properties.
   */
  [key: string]: any

  /**
   * The constructor for the StoreController.
   */
  constructor: {
    /**
     * An optional array of stores.
     */
    stores?: Store[]
  }
}
