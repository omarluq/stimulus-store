import { checkValue, handlePromiseError } from '../errors/storeErrorHandlers'
import type { Subscription } from '../types/Subscription'
import type { CurrentValueCallback } from '../types/currentValueCallback'
import type { NotifySubscriberOptions } from '../types/notifySubscriberOptions'
import type { SetOptions } from '../types/setOptions'
import type { StoreValue } from '../types/storeValue'
import type { TypeKey } from '../types/typeKey'
import type { UnsubscribeFunction } from '../types/unsubscribeFunction'
import type { UpdateMethod } from '../types/updateMethod'

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

export class Store {
  readonly name: symbol
  private value!: StoreValue
  private subscribers: Set<UpdateMethod>
  private type: TypeKey

  /**
   * Creates a new store.
   *
   * @param {symbol} name - The name of the store.
   * @param {TypeKey} type - The type of the store's value.
   */
  constructor(name: symbol, type: TypeKey) {
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
    newValue:
      | StoreValue
      | CurrentValueCallback
      | Promise<StoreValue | CurrentValueCallback>,
    options: SetOptions = { filter: () => true },
  ) {
    if (newValue instanceof Promise)
      return this.resolvePromise(newValue, options)
    if (newValue === this.get()) return
    const finalValue: StoreValue =
      typeof newValue === 'function'
        ? (newValue as CurrentValueCallback)(this.get())
        : newValue
    checkValue(finalValue, this.type)
    this.setValue(finalValue)
    this.notifySubscribers(options)
  }

  /**
   * Gets the current value of the store.
   *
   * @returns {StoreValue} The current value.
   */
  get(): StoreValue {
    return this.value
  }

  private setValue(value: StoreValue) {
    this.value = value
  }

  /**
   * Subscribes to the store.
   *
   * @param {UpdateMethod} callback - The function to call when the store's value changes.
   * @returns {UnsubscribeFunction} A function that unsubscribes the callback.
   */
  private subscribe(callback: UpdateMethod): UnsubscribeFunction {
    this.subscribers.add(callback)
    callback(this.get()) // Immediate call for initial value
    return () => this.unsubscribe(callback) // Return an unsubscribe function
  }

  /**
   * Unsubscribes from the store.
   *
   * @param {UpdateMethod} callback - The function to unsubscribe.
   */
  private unsubscribe(callback: UpdateMethod) {
    this.subscribers.delete(callback)
  }

  /**
   * Gets a subscription object with subscribe, when invoked subscribe returns an unsubscribe function.
   *
   * @returns {Subscription} A subscription object.
   */
  public getSubscription(): Subscription {
    return {
      subscribe: (callback: UpdateMethod) => this.subscribe(callback),
    }
  }

  private notifySubscribers(options: NotifySubscriberOptions) {
    Array.from(this.subscribers)
      .filter(() => options.filter(this.get()))
      .forEach((callback) => callback(this.get()))
  }

  private async resolvePromise(
    newValue: Promise<StoreValue | CurrentValueCallback>,
    options: SetOptions,
  ) {
    try {
      const resolvedValue = await newValue
      this.set(resolvedValue, options)
    } catch (error) {
      handlePromiseError(error)
    }
  }
}
