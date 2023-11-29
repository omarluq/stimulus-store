# createStore

To begin using Stimulus Store, you first need to define a store using the the createStore function. This function takes specific arguments to set up your store correctly. Below is a table detailing the required arguments:

| Key            | Type    | Description                                              |
|----------------|---------|----------------------------------------------------------|
| `name`         | String  | A unique identifier for the store.                       |
| `type`         | Type    | Specifies the data type of the store value (String, Number, Boolean, Array, Object).
| `initialValue` | Specified Type     | The initial value of the store.                          |

## Example

```js
  import { createStore } from 'stimulus-store';

  const counterStore = createStore({
    name: 'counterStore',
    type: Number,
    initialValue: 0
  });
```

In this example, a store named 'counterStore' is created. The type argument specifies the data type of the store's value, and initialValue is provided as 0, matching the specified type.