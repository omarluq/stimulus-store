/**
 * Store Class Explanation:
 *
 * The `Store` class is a versatile class for managing and subscribing to data updates in JavaScript applications.
 * It provides a structured way to store data and notify subscribers when the data changes.
 *
 * Key Features:
 * - Generic Class: Can work with different types of data (specified when creating an instance).
 * - Constructor: Sets the initial value of the store.
 * - `set` Method: Updates the value and notifies subscribers.
 * - `subscribe` Method: Subscribes to updates and calls a callback function when data changes.
 * - `unsubscribe` Method: Removes a subscription.
 * - `notifySubscribers` Method: Notifies subscribers when data changes.
 * Example Store: Counter Store
 *
 * This is an example of a store that uses the `stimulus-store` library. It creates a shared
 * counter store with an initial value of 0.
  Import the Store class from the stimulus-store library
  import { Store } from "stimulus-store";

  Create a counterStore instance with an initial value of 0

  export const counterStore = new Store(0);
 */

export class Store<T> {
  private value: T;
  private subscribers: Set<UpdateMethod>;

  constructor(initialValue: T) {
    this.value = initialValue;
    this.subscribers = new Set();
  }

  set(newValue: T) {
    this.value = newValue;
    this.notifySubscribers();
  }

  subscribe(callback: UpdateMethod): UnsubscribeFunction {
    this.subscribers.add(callback);
    callback(this.value); // Immediate call for initial value
    return () => this.unsubscribe(callback); // Return an unsubscribe function
  }

  unsubscribe(callback: UpdateMethod) {
    this.subscribers.delete(callback);
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.value));
  }
}
