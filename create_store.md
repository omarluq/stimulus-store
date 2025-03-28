# createStore

To begin using Stimulus Store, you first need to define a store using the the createStore function. This function takes specific arguments to set up your store correctly. Below is a table detailing the required arguments:

| Key            | Type    | Description                                              |
|----------------|---------|----------------------------------------------------------|
| `name`         | String  | A unique identifier for the store.                       |
| `type`         | Type    | Specifies the data type of the store value (String, Number, Boolean, Array, Object).
| `initialValue` | Specified Type, Callback, Promise     | The initial value of the store. Can be a value of the specified type, a callback function that returns a value of the specified type, or a Promise that resolves to a value of the specified type.                          |

## Example 1: Store with a number as the initial value

```js
  import { createStore } from 'stimulus-store';

  const counterStore = createStore({
    name: 'counterStore',
    type: Number,
    initialValue: 0
  });
```
In this example, a store named `counterStore` is created. The type argument specifies the data type of the store's value, and initialValue is provided as 0, matching the specified type.


## Example 2: Store with a callback function as the initial value

```js
  import { createStore } from 'stimulus-store';

  const callbackStore = createStore({
    name: 'callbackStore',
    type: Number,
    initialValue: () => {
      let calculatedValue = Math.floor(Math.random() * 100) + 1;
      return calculatedValue;
    }
  });
```
In this example, a store named `callbackStore` is created. The type argument specifies the data type of the store's value. The initialValue is a callback function that returns a number, matching the specified type.

## Example 3: Store with a Promise as the initial value

```js
  import { createStore } from 'stimulus-store';

  const promiseStore = createStore({
    name: 'promiseStore',
    type: Number,
    initialValue: new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(20);
      }, 1000);
    })
  });
```

In this example, a store named `promiseStore` is created. The type argument specifies the data type of the store's value. The initialValue is a Promise that resolves to a number, matching the specified type.