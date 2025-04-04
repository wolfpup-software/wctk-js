type Callbacks = Array<[string, EventListenerOrEventListenerObject]>;

interface EventsInterface {
	connect(): void;
	disconnect(): void;
}

interface EventsElementInterface {
	addEventListener: Node["addEventListener"];
	removeEventListener: Node["removeEventListener"];
}

interface EventParams {
	bind: Node;
	target?: Node;
	callbacks: Callbacks;
}

function bindCallbacks(el: Object, callbacks: Callbacks) {
	let events = [];
	for (let [name, cb] of callbacks) {
		let callback = cb;
		if (cb instanceof Function) {
			callback = cb.bind(el);
		}

		events.push([name, callback]);
	}

	return events;
}

class Events implements EventsInterface {
	#connected: boolean = false;
	#el: EventsElementInterface;
	#events: Callbacks = [];
	#targetEl: EventsElementInterface;

	constructor(params: EventParams) {
		const { bind, target, callbacks } = params;

		this.#el = bind;
		this.#targetEl = target ?? bind;
		this.#events = bindCallbacks(this.#el, callbacks);

		this.connect();
	}

	connect() {
		if (this.#connected) return;
		this.#connected = true;

		for (let [name, callback] of this.#events) {
			this.#targetEl.addEventListener(name, callback);
		}
	}

	disconnect() {
		if (!this.#connected) return;
		this.#connected = false;

		for (let [name, callback] of this.#events) {
			this.#targetEl.removeEventListener(name, callback);
		}
	}
}

export type { Callbacks, EventsInterface, EventsElementInterface, EventParams };

export { Events };
