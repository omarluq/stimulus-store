<img src="./public/stimulus_store_logo.png" alt="Stimulus Store Logo" width="100"/> 

# Stimulus Store

Stimulus Store is a lightweight JavaScript library that simplifies state management in your Stimulus-powered web applications. It provides a simple and intuitive way to create, manage, and share stateful data across different controllers using a common `Store` class.

## Why Stimulus Store?

Stimulus is known for its simplicity and focus on enhancing your HTML with minimal JavaScript. However, as your application grows, you may encounter scenarios where sharing data between controllers becomes challenging. This is where Stimulus Store comes to the rescue.

With Stimulus Store, you can:

- Create and manage global state with ease.
- Share state between different controllers effortlessly using a shared `Store` class.
- Keep your codebase clean and maintainable.

## Installation

You can install Stimulus Store via npm or yarn:

### npm

```bash
npm install stimulus-store
```
### yarn

```bash
yarn add stimulus-store
```

## Quick Start

Let's dive into a simple use case to see how Stimulus Store works. In this example, we'll create two controllers that share a common counter value using a shared Store class.


```html
<!-- index.html -->
<div data-controller="counter">
  <button data-action="click->counter#increment">Increment</button>
</div>

<div data-controller="display">
  <p data-display-target="message">Display: <span></span></p>
</div>
```

```js
// controllers/stores/counter.js
import { Store } from "stimulus-store"; // Import the shared Store class

export const counterStore = new Store(0); // Initialize with an initial value of 0
```

```js
// controllers/counter_controller.js
import { Controller } from "stimulus";
import { useStore } from "stimulus-store"
import { counterStore } from "./stores/counter";

export default class extends Controller {
  connect() {
    useStore(this, [counterStore])
  }

  increment() {
    const newValue = counterStore.value + 1;
    counterStore.set(newValue);
  }

  decrement() {
    // set will also receive a callback
    // and will only notify on condition
    counterStore.set((value)=>value-1, { filter: (value)=>value == 0 })
  }
}
```

```js
// controllers/display_controller.js
import { Controller } from "stimulus";
import { useStore } from "stimulus-store"
import { counterStore } from "./stores/counter"; // Import the counterStore

export default class extends Controller {
  static targets = ["message"];

  connect() {
    useStore(this, [counterStore])
  }

  display(value) {
    this.messageTarget.textContent = `Display: ${value}`;
  }

  onCounterStoreUpdate(value) {
    this.display(value);
  }
}
```

In this example, we've created two controllers: `counter_controller.js` and `display_controller.js`. Both controllers share a common store defined in `controllers/stores/counter.js` to manage the counter value, allowing them to communicate seamlessly.

### MIT License

Copyright (c) 2023 Omar Luqman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
