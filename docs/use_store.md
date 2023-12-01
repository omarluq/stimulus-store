# useStore

The useStore hook is the core feature of the Stimulus Store library, it facilitates the interaction between stimulus the application's global state and ensures that subscriptions are established and disconnected during the lifecycle of controller.

## Subscribing to a Store Updates

When you invoke `useStore(this)` within the connect method of a Stimulus controller, `useStore` subscribes to all stores listed in a `static stores` array of `store` objects created with `createStore` on the controller. This subscription enables the controller to access and modify the states of these stores. Additionally, it ensures the controller is notified of any changes to the states within these stores.

Here's an example:

```js
  import { Controller } from 'stimulus';
  import { useStore } from 'stimulus-store';
  import { counterStore } from './stores/counter';

  export default class extends Controller {
    static stores = [counterStore]

    connect() {
      useStore(this);
    }
  }
```

In this example, the controller subscribes to counterStore upon connection. The controller can now interact with counterStore and respond to its updates.

## Accessing a Store Value

To access the state of a store in your Stimulus controller, you can use `this.<storeName>Value` property provided by `useStore`.
After the controller subscribes to the store, it can directly access the current state of any store it's subscribed to at any givin time.

Here's an example:


```js
  import { Controller } from 'stimulus';
  import { useStore } from 'stimulus-store';
  import { counterStore } from './stores/counter';

  export default class extends Controller {
    static stores = [counterStore]

    connect() {
      useStore(this)
      this.logCounterValue()
    }

    logCounterValue() {
      console.log('Counter store updated:', this.counterStoreValue);
    }
  }
```

## Reacting to a Store Value Updates

When a store's state is updated, all subscribed controllers are automatically notified. You can implement a method named `on<StoreName>Update` in your controller to handle these updates. This method will be called with the store's new state, allowing you to respond accordingly.

```js
  import { Controller } from 'stimulus';
  import { useStore } from 'stimulus-store';
  import { counterStore } from './stores/counter';

  export default class extends Controller {
    static stores = [counterStore]

    connect() {
      useStore(this);
    }

    onCounterStoreUpdate() {
      console.log('Counter store updated:', this.counterStoreValue);
    }
  }
```
In this version, `this.counterStoreValue` is used to access the store's value.

- Passing the Store Value as an Argument:
  ```js
    onCounterStoreUpdate(value) {
      console.log('Counter store updated:', value);
    }
  ```
  In this alternate syntax, the store's value is passed as an argument to the `onCounterStoreUpdate` method.

  Both approaches for handling store updates in your Stimulus controller are effective and will correctly display the current state of the store. The method you choose depends on your application's specific needs and your personal coding preferences.

## Updating a Store Value

To update the state of a store, you can use the `this.set<StoreName>Value` method provided `useStore`. This method ensures that all subscribed controllers are notified of the change, maintaining the reactivity of your application.

Here's an example of how you can update a value in the counterStore:

```js
  import { Controller } from 'stimulus';
  import { useStore } from 'stimulus-store';
  import { counterStore } from './stores/counter';

  export default class extends Controller {
    static stores = [counterStore]

    connect() {
      useStore(this);
    }

    increment() {
      const newValue = this.counterStoreValue + 1
      this.setCounterStoreValue(newValue)
    }
  }
```

In this example, we retrieve the current value of the counter, increment it, and then update the store with the new value.

Additionally, You can pass a callback function or a Promise that resolves to the new value. 
```js
  increment() {
    this.setCounterStoreValue((value) => value + 1)
  }
```
You can also pass in an options object with a filter function. This function takes the new value of the store and returns a boolean indicating whether or not to notify the controller of the change.
```js
  decrement() {
    this.setCounterStoreValue((value) => value - 1, { filter: (value) => value === 0 })
  }
```

### Best Practices for Updating Store Values and Common Pitfalls

- **Predictability**: For complex states, consider using reducer functions or other state management patterns to keep updates predictable and manageable.
- **Immutability**: Directly mutating the store state can lead to unpredictable behaviors. Always use the setter function.
- **Over-updating**: Minimize the number of times you update the store to avoid unnecessary renders.
