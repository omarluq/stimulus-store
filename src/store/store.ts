import { checkValue, handlePromiseError } from '../errors/storeErrorHandlers'

/**
 * @template T The type of the value that the store holds.
 * Store Class Explanation:
 *
 * The `Store` class is a versatile class for managing and subscribing to data updates in JavaScript applications.
 * It provides a structured way to store data and notify subscribers when the data changes.
 *
 * Key Features:
 * - Generic Class: Can work with different types of data (specified when creating an instance).
 * - Constructor: Sets the initial value of the store.
 * - `set` Method: Updates the value and notifies subscribers.
 * - `get` Method: Gets the current value.
 * - `subscribe` Method: Subscribes to updates and calls a callback function when data changes.
 * - `unsubscribe` Method: Removes a subscription.
 * - `notifySubscribers` Method: Notifies subscribers when data changes.
 */

export class Store<T> {
  name: symbol
  private value!: T
  private subscribers: Set<UpdateMethod>
  private type: new (...args: unknown[]) => unknown

  /**
   * Creates a new store.
   *
   * @param {symbol} name - The name of the store.
   * @param {new (...args: unknown[]) => unknown} type - The type of the store's value.
   */
  constructor(name: symbol, type: new (...args: unknown[]) => unknown) {
    this.name = name
    this.subscribers = new Set()
    this.type = type
  }

  /**
   * Sets the value of the store and notifies subscribers.
   *
   * @param {T | CurrentValueCallback | Promise<T | CurrentValueCallback>} newValue - The new value.
   * @param {SetOptions} [options={ filter: () => true }] - The options for setting the value.
   */
  async set(
    newValue: T | CurrentValueCallback | Promise<T | CurrentValueCallback>,
    options: SetOptions = { filter: () => true }
  ) {
    if (newValue instanceof Promise) return this.resolvePromise(newValue, options)
    if (newValue === this.get()) return
    const finalValue: T = typeof newValue === 'function' ? (newValue as CurrentValueCallback)(this.get()) : newValue
    checkValue(finalValue, this.type)
    this.setValue(finalValue)
    this.notifySubscribers(options)
  }

  /**
   * Gets the current value of the store.
   *
   * @returns {T} The current value.
   */
  get(): T {
    return this.value
  }

  private setValue(value: T) {
    this.value = value
  }

  /**
   * Subscribes to the store.
   *
   * @param {UpdateMethod} callback - The function to call when the store's value changes.
   * @returns {UnsubscribeFunction} A function that unsubscribes the callback.
   */
  subscribe(callback: UpdateMethod): UnsubscribeFunction {
    this.subscribers.add(callback)
    callback(this.get()) // Immediate call for initial value
    return () => this.unsubscribe(callback) // Return an unsubscribe function
  }

  /**
   * Unsubscribes from the store.
   *
   * @param {UpdateMethod} callback - The function to unsubscribe.
   */
  unsubscribe(callback: UpdateMethod) {
    this.subscribers.delete(callback)
  }

  private notifySubscribers(options: NotifySubscriberOptions) {
    Array.from(this.subscribers)
      .filter(() => options.filter(this.get()))
      .forEach(callback => callback(this.get()))
  }

  private async resolvePromise(newValue: Promise<T | CurrentValueCallback>, options: SetOptions) {
    try {
      const resolvedValue = await newValue
      this.set(resolvedValue, options)
    } catch (error) {
      handlePromiseError(error)
    }
  }
}
