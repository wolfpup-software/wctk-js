# Events Controller

Pass custom element functions to event listeners.

## How to use

### Params

An Events `params` object has three properties:

```ts
interface EventParams {
	host: Node;
	callbacks: Array<[string, EventListener]>;
	target?: Node;
}
```

Two required properties instruct the Events controller to binds a set of `callbacks` to a `host`.

Afterwards, the Events controller adds the callbacks as event listeners on a `target` Node.

The `target` Node could be a shadowRoot, a document, or the custom element itself.

If the `target` property is undefined, the `host` property is used as a fallback.

### Controller

Below is an example of the `Events` controller.

```ts
import { Events, Wc } from "wctk";

class MyElement extends HTMLElement {
	#wc = new Wc();
	#ec = new Events({
		host: this,
		target: this.#wc.shadowRoot,
		callbacks: [["keydown", this.#onKeyDown]],
	});

	#onKeyDown(e: KeyboardEvent) {
		// do something with keyboard events here!
	}

	// lifecycle method
	connectedCallback() {
		this.#ec.connect();
	}

	// lifecycle method
	disconnectedCallback() {
		this.#ec.disconnect();
	}
}
```
