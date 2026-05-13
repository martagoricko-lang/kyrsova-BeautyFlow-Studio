export class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listener);
  }

  unsubscribe(eventName, listenerToRemove) {
    if (!this.events[eventName]) return;

    this.events[eventName] = this.events[eventName].filter(
      (listener) => listener !== listenerToRemove,
    );
  }

  emit(eventName, data) {
    if (!this.events[eventName]) return;

    this.events[eventName].forEach((listener) => {
      listener(data);
    });
  }
}
