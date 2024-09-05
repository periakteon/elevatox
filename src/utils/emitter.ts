import { EventEmitter } from "events";

type EventMap = Record<string, (...args: unknown[]) => void>;

interface Emitter<Events extends EventMap> {
  subscribe<E extends keyof Events>(name: E, cb: Events[E]): () => void;
  publish<E extends keyof Events>(
    name: E,
    ...args: Parameters<Events[E]>
  ): void;
}

const globalEmitter = new EventEmitter();

type Events = {
  refetch: () => void;
  showNotification: (message: unknown) => void;
};

export const emitter: Emitter<Events> = {
  subscribe(name, cb) {
    globalEmitter.on(name, cb);

    return () => {
      globalEmitter.off(name, cb);
    };
  },
  publish(name, ...args) {
    globalEmitter.emit(name, ...args);
  },
};
