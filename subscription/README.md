# Subscribe Controller

Subscribe web components to external state.

## Api

Properties:
- N/A

Methods:
- constructor -> `(HtmlElement, ConnectCallback, DisconnectCallback): void`
- connect -> `(): void`
- disconnect -> `(): void`

## How to use

Add an `Subscription` controller to a web component.

Provide functions to connect a web component to a data store. In the example below, the functions are called `subscribeToRedux` and `unsubscribeToRedux`.

```ts
import type { WithRender } from "./render/dist/mod.ts";

import { Subscription } from "./render/dist/mod.js";
import { store } from "./my-store.js";

class MyElement extends HTMLElement {
	#sb = new Subscribe(this, subscribeToRedux, unsubscribeToRedux);

	connectedCallback() {
		this.#sb.connect();
	}

	disconnectedCallback() {
		this.#sb.disconnect();
	}
}

// return results of subscription in a connect function
function subscribeToRedux(el: WithRender) {
    return store.subscribe(() => {
        el.render();
    });
}

// results of subscription are passed to a disconnect function
function unsubscribeToRedux(el: WithRender, results: Function) {
    results();
}
```

### details

The `Events` controller adds event listeners and binds callbacks to the host component.