interface Listener {
    type: string;
    listener: EventListenerOrEventListenerObject;
    options?: boolean | AddEventListenerOptions
};

declare global {
    interface Window {
        getEventListeners(
            element: Element
        ): { type: string; listener: EventListenerOrEventListenerObject; options?: boolean | AddEventListenerOptions }[];
    }

    interface Element {
        addEventListener(
            type: string,
            listener: EventListenerOrEventListenerObject,
            options?: boolean | AddEventListenerOptions
        ): void;
    }
}

export { type Listener };
