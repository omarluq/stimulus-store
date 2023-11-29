# useStore

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

## Accessing a Store State

To access the state of a store in your Stimulus controller, you can `this.<storeName>Value` property provided by `useStore`. After the controller subscribes to the store, it can directly access the current state of any store it's subscribed to at any givin time.

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

## Reacting to a Store Updates

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

- Accessing the Updated Value through this:
  ```js
    onCounterStoreUpdate() {
      console.log('Counter store updated:', this.counterStoreValue);
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