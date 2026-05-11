export class BiDirectionalPriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(item, priority) {
    this.items.push({
      item,
      priority,
      insertedAt: Date.now(),
    });
  }

  dequeue(type) {
    if (this.items.length === 0) return null;

    let index = 0;

    if (type === "highest") {
      index = this.items.reduce(
        (maxIndex, current, currentIndex, array) =>
          current.priority > array[maxIndex].priority ? currentIndex : maxIndex,
        0,
      );
    }

    if (type === "lowest") {
      index = this.items.reduce(
        (minIndex, current, currentIndex, array) =>
          current.priority < array[minIndex].priority ? currentIndex : minIndex,
        0,
      );
    }

    if (type === "oldest") {
      index = 0;
    }

    if (type === "newest") {
      index = this.items.length - 1;
    }

    return this.items.splice(index, 1)[0];
  }

  peek(type) {
    if (this.items.length === 0) return null;

    if (type === "highest") {
      return this.items.reduce((highest, current) =>
        current.priority > highest.priority ? current : highest,
      );
    }

    if (type === "lowest") {
      return this.items.reduce((lowest, current) =>
        current.priority < lowest.priority ? current : lowest,
      );
    }

    if (type === "oldest") {
      return this.items[0];
    }

    if (type === "newest") {
      return this.items[this.items.length - 1];
    }

    return null;
  }
}
