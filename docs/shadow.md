# Shadow Root Controller

Wrangle the shadow dom!

## Api

### Properties:

- elementInternals -> `ElementInternals`
- declarative -> `boolean`
- shadowRoot -> `ShadowRoot`

### Methods

- constructor -> `(HtmlElement, ShadowRootInit): void`

## How to use

Add a `Shadow` controller to wrangle the shadow dom.

Check if the shadow dom is `declarative` in the `constructor`. If the shadow dom is not declarative, compose a dom fragment and append the dom fragment onto the shadow root. Otherwise, add event listeners to the existing declarative shadow dom.

```ts
import { Shadow } from "wctk";

class MyElement extends HTMLElement {
    #sd = new Shadow(this, { mode: "closed" });

    constructor() {
        super();

        if !this.#sd.declarative {
            // compose and append DOM to this.#sd.shadowRoot
        }

        // add event listeners to DOM
    }
}
```

## Details

The `Shadow` controller inspects an element for declarative shadow dom. A new shadow dom is created if a declarative shadow dom is not found.

The shadow root will always be available at `this.#sd.shadowRoot`. It doesn't matter if the shadow dom is open or closed.
