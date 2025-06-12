<a name="0.0.3"></a>

## [0.0.3](https://github.com/omarluq/stimulus-store/compare/v0.0.2...0.0.3) 2024-07-05

### Features

- UMD support

<a name="v0.0.2"></a>

## [v0.0.2](https://github.com/omarluq/stimulus-store/compare/v0.0.1...v0.0.2) 2024-01-30

<a name="v0.0.1"></a>

## [v0.0.1](https://github.com/omarluq/stimulus-store/compare/v0.0.1-beta.1...v0.0.1) 2024-01-30

### Bug Fixes

- remove extra run from test
- github actions test workflow changes

### Features

- preserve initial value on store class and introduce `reset<StoreName>` function for controller
- add docsify documentation site
- convert md docs to static site, docsify is magic 💫

<a name="v0.0.1-beta.1"></a>

## [v0.0.1-beta.1](https://github.com/omarluq/stimulus-store/compare/v0.0.1-beta...v0.0.1-beta.1) 2023-11-27

### Bug Fixes

- use rollup-plugin-copy to move .d.ts files from src to dist on build
- currentValueCallback global type sytnax bug

### Features

- improve build, minified size drop to 1.04kb-1.26kb
- enhance type definitions for runtime type checking

<a name="v0.0.1-beta"></a>

## v0.0.1-beta 2023-11-25

### Bug Fixes

- fix readme typo
- Fix README.md
- Fix README.md

### Features

- enhance error handling and warnings
- Add `isWarned` flag that ensures a warning is triggered once
- Implemented setStoreValue method in controllers and added warnings for direct store access inside controllers
- Make store set async and accept promise as arg
- Enhance useStore to provide direct access to store instances and values, update TypeScript types, and add corresponding tests
- Add callback to set
