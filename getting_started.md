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
