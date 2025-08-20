<p align="center">
  <a target="_blank" href="https://www.stimulus-store.com" alt="Stimulus Store Documentation site">
    <img src="images/stimulus_store_logo.png" alt="Stimulus Store Logo"/>
  </a>
</p>

<div align="center">
  
  [![GitHub package.json version](https://img.shields.io/github/package-json/v/omarluq/stimulus-store)](https://github.com/omarluq/stimulus-store)
  [![GitHub Actions](https://github.com/omarluq/stimulus-store/actions/workflows/test.yml/badge.svg)](https://github.com/omarluq/stimulus-store/actions/workflows/test.yml)
  [![Netlify Status](https://api.netlify.com/api/v1/badges/f2b2e5e9-67f0-4e3f-b6b5-8e1310ea4ad7/deploy-status)](https://netlify.com)
  [![Last Commit](https://img.shields.io/github/last-commit/omarluq/stimulus-store)](https://github.com/omarluq/stimulus-store/commits/main)
  [![Commit Activity](https://img.shields.io/github/commit-activity/m/omarluq/stimulus-store)](https://github.com/omarluq/stimulus-store/graphs/commit-activity)
  [![All Contributors](https://img.shields.io/github/all-contributors/omarluq/stimulus-store)](https://github.com/omarluq/stimulus-store/graphs/contributors)
  [![Pull Requests](https://img.shields.io/github/issues-pr/omarluq/stimulus-store)](https://github.com/omarluq/stimulus-store/pulls)
  [![Closed Pull Requests](https://img.shields.io/github/issues-pr-closed-raw/omarluq/stimulus-store)](https://github.com/omarluq/stimulus-store/pulls?q=is%3Apr+is%3Aclosed)
  [![GitHub issues](https://img.shields.io/github/issues/omarluq/stimulus-store)](https://github.com/omarluq/stimulus-store/issues)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/omarluq/stimulus-store)
  [![GitHub stars](https://img.shields.io/github/stars/omarluq/stimulus-store?style=flat)](https://github.com/omarluq/stimulus-store/stargazers)
  [![GitHub forks](https://img.shields.io/github/forks/omarluq/stimulus-store?style=flat)](https://github.com/omarluq/stimulus-store/network/members)
  [![GitHub watchers](https://img.shields.io/github/watchers/omarluq/stimulus-store?style=flat)](https://github.com/omarluq/stimulus-store/watchers)
  [![Type Definitions](https://img.shields.io/npm/types/stimulus-store)](https://www.typescriptlang.org)
  [![BiomeJS](https://img.shields.io/badge/-BiomeJs-60A5FA?logo=biome&logoColor=white)](https://biomejs.dev)
  [![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/omarluq/stimulus-store/maintainability)
  [![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/omarluq/stimulus-store/test_coverage)
  [![npm version](https://badge.fury.io/js/stimulus-store.svg)](https://npmjs.com/package/stimulus-store)
  [![npm downloads](https://img.shields.io/npm/dm/stimulus-store.svg)](https://npmjs.com/package/stimulus-store)
  [![Bundle Size](https://img.shields.io/bundlephobia/minzip/stimulus-store@0.0.2)](https://bundlephobia.com/result?p=stimulus-store@0.0.2)
  [![Bundle Min](https://img.shields.io/bundlephobia/min/stimulus-store@0.0.2)](https://bundlephobia.com/result?p=stimulus-store@0.0.2)
  [![Tree-shaking size](https://badgen.net/bundlephobia/tree-shaking/stimulus-store@0.0.2)](https://bundlephobia.com/result?p=stimulus-store@0.0.2)
  [![Top Language](https://img.shields.io/github/languages/top/omarluq/stimulus-store)](https://github.com/omarluq/stimulus-store)
  [![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/omarluq/stimulus-store)](https://github.com/omarluq/stimulus-store)
  [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/omarluq/stimulus-store)
  [![Dependabot](https://badgen.net/github/dependabot/omarluq/stimulus-store)](https://dependabot.com)
  [![Made with Love](https://img.shields.io/badge/Made%20with-Love-ff69b4.svg)](https://github.com/omarluq/stimulus-store)
  [![](https://dcbadge.vercel.app/api/server/ScU4JKgxaU?style=flat)](https://discord.gg/ScU4JKgxaU)
  
</div>

</br>

<p align="center">
  <b>Ultra lightweight state management for your Stimulus powered web applications.</b>
</p>

</br>

- **Create and manage global state with ease.** 🔄
- **Share state between different controllers effortlessly using a unified, atomic `Store` class.** 🔀
- **1.04KB Minified and Brotlied** 🪶

## Installation

### With a build system

Install with [npm](https://www.npmjs.com/):

```sh
npm install stimulus-store
```

Install with [yarn](https://yarnpkg.com):

```sh
yarn add stimulus-store
```

### UMD

If you prefer not to use a build system, you can load `stimulus-store` in a `<script>` tag and it will be globally available through the `window.StimulusStore` object.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <script src="https://unpkg.com/stimulus/dist/stimulus.umd.js"></script>
    <script src="https://unpkg.com/stimulus-store/dist/bundle.umd.js"></script>
    <script>
      (() => {
        const application = Stimulus.Application.start();

        const helloStore = StimulusStore.createStore({
          name: "helloStore",
          type: String,
          initialValue: "Hello World!",
        });

        application.register(
          "hello",
          class extends Stimulus.Controller {
            static stores = [helloStore];

            connect() {
              StimulusStore.useStore(this);
              this.element.innerHtml = `<p>${this.helloStoreValue}</p>`;
            }
          }
        );
      })();
    </script>
  </head>
  <body>
    <div data-controller="hello">…</div>
  </body>
</html>
```

## Documentation

complete documentation on Stimulus Store, including guides, API details, and more can be found on [www.stimulus-store.com](https://www.stimulus-store.com).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
