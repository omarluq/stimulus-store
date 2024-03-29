<p align="center">
  <img src="images/stimulus_store_logo.png" alt="Stimulus Store Logo"/> 
</p>

<p align="center">

[![All Contributors](https://img.shields.io/github/all-contributors/omarluq/stimulus-store?color=blue)](#contributors)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/omarluq/stimulus-store?color=blue)](https://github.com/omarluq/stimulus-store)
[![npm version](https://badge.fury.io/js/stimulus-store.svg)](https://badge.fury.io/js/stimulus-store)
[![GitHub issues](https://img.shields.io/github/issues/omarluq/stimulus-store)](https://github.com/omarluq/stimulus-store/issues)
[![GitHub forks](https://img.shields.io/github/forks/omarluq/stimulus-store)](https://github.com/omarluq/stimulus-store/network)
[![Netlify Status](https://api.netlify.com/api/v1/badges/f2b2e5e9-67f0-4e3f-b6b5-8e1310ea4ad7/deploy-status)](https://app.netlify.com/sites/stimulus-store/deploys)
[![GitHub stars](https://img.shields.io/github/stars/omarluq/stimulus-store)](https://github.com/omarluq/stimulus-store/stargazers)
[![GitHub watchers](https://img.shields.io/github/watchers/omarluq/stimulus-store)](https://github.com/omarluq/stimulus-store/watchers)
[![TypeScript](https://img.shields.io/badge/-TypeScript-gray&logo=typescript)](https://github.com/omarluq/stimulus-store)
[![Type Definitions](https://img.shields.io/npm/types/stimulus-store)](https://www.npmjs.com/package/stimulus-store)
[![Top Language](https://img.shields.io/github/languages/top/omarluq/stimulus-store)](https://github.com/omarluq/stimulus-store)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)
[![npm downloads](https://img.shields.io/npm/dm/stimulus-store.svg)](https://www.npmjs.com/package/stimulus-store)
[![GitHub Actions](https://github.com/omarluq/stimulus-store/actions/workflows/test.yml/badge.svg)](https://github.com/omarluq/stimulus-store/actions)
[![Last Commit](https://img.shields.io/github/last-commit/omarluq/stimulus-store)](https://github.com/omarluq/stimulus-store/commits/main)
[![Pull Requests](https://img.shields.io/github/issues-pr/omarluq/stimulus-store)](https://github.com/omarluq/stimulus-store/pulls)
[![Closed Pull Requests](https://img.shields.io/github/issues-pr-closed-raw/omarluq/stimulus-store)](https://github.com/omarluq/stimulus-store/pulls?q=is%3Apr+is%3Aclosed)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/omarluq/stimulus-store)](https://github.com/omarluq/stimulus-store)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/stimulus-store@0.0.1-beta.1)](https://bundlephobia.com/package/stimulus-store@0.0.1-beta.1)
[![Bundle Min](https://img.shields.io/bundlephobia/min/stimulus-store@0.0.1-beta.1)](https://bundlephobia.com/package/stimulus-store@0.0.1-beta.1)
[![Tree-shaking size](https://badgen.net/bundlephobia/tree-shaking/stimulus-store@0.0.1-beta.1)](https://bundlephobia.com/package/stimulus-store@0.0.1-beta.1)
[![Commit Activity](https://img.shields.io/github/commit-activity/m/omarluq/stimulus-store)](https://github.com/omarluq/stimulus-store/commits/main)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/omarluq/stimulus-store/graphs/commit-activity)
[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/omarluq/stimulus-store/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/omarluq/stimulus-store/test_coverage)
[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Dependabot](https://badgen.net/github/dependabot/omarluq/stimulus-store)](https://github.com/omarluq/stimulus-store/pulls?q=is%3Apr+author%3Aapp%2Fdependabot-preview)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Made with Love](https://img.shields.io/badge/Made%20with-Love-ff69b4.svg)](https://github.com/omarluq/stimulus-store)

</p>
  

# Stimulus Store

Stimulus Store is an ultra lightweight JavaScript library that simplifies state management in your Stimulus-powered web applications. Despite its minimal footprint, it offers a robust yet simple and intuitive way to create, manage, and share stateful data across different controllers using a unified, atomic `Store` class.

## Size Metrics

- **Original size**: 15.603KB
- **Bundle size**: 14.552KB
- **Gzipped Size**: 1.26KB
- **Minified and Brotlied Size**: 1.04KB

To put the size of the Stimulus Store library into perspective, let's compare its size metrics with those of other popular state management libraries. Keep in mind that the comparison is based on general size metrics and may vary depending on the specific version and build of each library:

- Redux: Redux is one of the most popular state management libraries for JavaScript applications, often used with React. The minified size of Redux (not including required dependencies like redux-thunk or react-redux) is around 16KB before gzip. After gzip, it's approximately 5KB. While still lightweight, Redux is significantly larger than Stimulus Store.

- MobX: MobX is another popular choice for state management in JavaScript applications. The minified size of MobX is about 22KB, and its gzipped size is roughly 7KB.

- Vuex (for Vue.js): Vuex is the state management library tailored for Vue.js. The minified and gzipped size of Vuex is around 3KB, which is larger than Stimulus Store but still maintains a small footprint.

- Context API (React): With React's Context API and Hooks, state management can be handled without additional libraries. However, this is part of React itself, so the size comparison isn’t direct. React (including ReactDOM) is over 100KB minified and gzipped, but this includes much more than just state management.

- Zustand: A smaller, simpler alternative for state management in React applications. Its size is about 7KB gzipped, which is larger than Stimulus Store but smaller compared to more feature-rich libraries like Redux or MobX.

For more detailed analysis, see [BENCHMARKS.md](BENCHMARKS.md).

## Why Stimulus Store?

Stimulus is known for its simplicity and focus on enhancing your HTML with minimal JavaScript. However, as your application grows, you may encounter scenarios where sharing data between controllers becomes challenging. This is where Stimulus Store comes to the rescue.

With Stimulus Store, you can:

- Create and manage global state with ease.
- Share state between different controllers effortlessly using a unified, atomic `Store` class.
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
import { createStore } from "stimulus-store";

export const counterStore = createStore({ name: 'counterStore', initialValue: 0, type: Number });
```

```js
// controllers/counter_controller.js
import { Controller } from "@hotwired/stimulus";
import { useStore } from "stimulus-store"
import { counterStore } from "./stores/counter";

export default class extends Controller {
  static stores = [counterStore];

  connect() {
    useStore(this)
  }

  increment() {
    this.setCounterStoreValue(this.counterStoreValue + 1);
  }

  decrement() {
    // set will also receive a callback
    // and will only notify on condition
    this.setCounterStoreValue((value) => value - 1, { filter: (value) => value === 0 })
  }
}
```

```js
// controllers/display_controller.js
import { Controller } from "@hotwired/stimulus";
import { useStore } from "stimulus-store"
import { counterStore } from "./stores/counter"; // Import the counterStore

export default class extends Controller {
  static targets = ["message"];
  static stores = [counterStore];

  connect() {
    useStore(this)
  }

  onCounterStoreUpdate() {
    this.messageTarget.textContent = `Display: ${this.counterStoreValue}`;
  }
}
```

In this example, we've created two controllers: `counter_controller.js` and `display_controller.js`. Both controllers share a common store defined in `controllers/stores/counter.js` to manage the counter value, allowing them to communicate seamlessly.

## `createStore`

The `createStore` function is used to create a new store. A store is an atomic class where you can keep state that needs to be shared across different parts of your application. 

When you call `createStore`, you pass in an object with the following required properties:

- `name`: A unique name for the store.
- `initialValue`: The initial value for the store's state.
- `type`: The type of the store's state. This can be `Number`, `String`, `Array`, `Object`, `Boolean`.


```javascript
import { createStore } from 'stimulus-store';

const counterStore = createStore({
  name: 'counterStore',
  initialValue: 0,
  type: Number
});
```

## `useStore`

In the Stimulus controller, the `static stores` array is used to specify which stores this controller should subscribe to. Each item in the array should be a store that was created using `createStore`.

When you call `useStore(this)` in the `connect` method, the `useStore` hook will subscribe the controller to all the stores specified in the `static stores` array. This means that the controller will be able to access and modify the state in these stores, and it will be notified when the state in these stores changes.

```js
import { Controller } from '@hotwired/stimulus';
import { useStore } from 'stimulus-store';
import { counterStore } from './stores/counter';

export default class extends Controller {
  static stores = [counterStore]

  connect() {
    useStore(this);
  }
}
```

The `useStore` hook provides several helpers that you can use to interact with the store:
- `this.<storeName>Value`: This property gives you the current value of the store's state.
- `this.set<StoreName>Value`: This function allows you to update the store's state. You can pass in a new value directly, Additionally, You can pass a callback function or a Promise that resolves to the new value. You can also pass in an options object with a filter function. This function takes the new value of the store and returns a boolean indicating whether or not to notify the controller of the change.

- `on<StoreName>Update`: This function is called whenever the store's state changes. You can override this function in your controller to react to state changes.
```js
  import { Controller } from '@hotwired/stimulus';
  import { useStore } from 'stimulus-store';
  import { counterStore } from './stores/counter';

  export default class extends Controller {
    static stores = [counterStore]

    connect() {
      useStore(this);
    }

    increment() {
      this.setCounterStoreValue(this.counterStoreValue + 1);
    }

    decrement() {
      this.setCounterStoreValue((value) => value - 1, { filter: (value) => value === 0 })
    }

    onCounterStoreUpdate() {
      console.log('Counter store updated:', this.counterStoreValue);
    }
  }
```
<sub>Note that while you can technically access `this.<storeName>` inside the controller or `Controller.<storeName>`, this is highly discouraged and will trigger a warning. Stores are considered an atomic unit and an implementation detail. The controller should not make direct calls to it. Instead, use the provided helpers `this.<storeName>Value`, `this.set<StoreName>Value` and `on<storeName>Update` to interact with the store's state.</sub>

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tcarac"><img src="https://avatars.githubusercontent.com/u/64477810?v=4?s=100" width="100px;" alt="Tomas Caraccia"/><br /><sub><b>Tomas Caraccia</b></sub></a><br /><a href="https://github.com/omarluq/stimulus-store/commits?author=tcarac" title="Code">💻</a> <a href="https://github.com/omarluq/stimulus-store/commits?author=tcarac" title="Tests">⚠️</a> <a href="https://github.com/omarluq/stimulus-store/commits?author=tcarac" title="Documentation">📖</a> <a href="#maintenance-tcarac" title="Maintenance">🚧</a> <a href="https://github.com/omarluq/stimulus-store/pulls?q=is%3Apr+reviewed-by%3Atcarac" title="Reviewed Pull Requests">👀</a> <a href="#question-tcarac" title="Answering Questions">💬</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://omarluq.github.io/portfolio/"><img src="https://avatars.githubusercontent.com/u/84993125?v=4?s=100" width="100px;" alt="Omar Luq "/><br /><sub><b>Omar Luq </b></sub></a><br /><a href="https://github.com/omarluq/stimulus-store/commits?author=omarluq" title="Code">💻</a> <a href="https://github.com/omarluq/stimulus-store/commits?author=omarluq" title="Tests">⚠️</a> <a href="https://github.com/omarluq/stimulus-store/commits?author=omarluq" title="Documentation">📖</a> <a href="#maintenance-omarluq" title="Maintenance">🚧</a> <a href="https://github.com/omarluq/stimulus-store/pulls?q=is%3Apr+reviewed-by%3Aomarluq" title="Reviewed Pull Requests">👀</a> <a href="#question-omarluq" title="Answering Questions">💬</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
