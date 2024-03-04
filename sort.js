class SortedSet {
  constructor(comparator) {
    this.set = new Set();
    this.comparator = comparator;
  }

  add(item) {
    this.set.add(item);
    this.sort();
  }
  first() {
    const array = Array.from(this.set);
    return array[0];
  }
  last() {
    const array = Array.from(this.set);
    return array[array.length - 1];
  }
  sort() {
    this.set = new Set([...this.set].sort(this.comparator));
  }
  delete(item) {
    this.set.delete(item);
  }
  length() {
    return this.set.size;
  }

  log() {
    console.log(this.set);
  }
}

module.exports = SortedSet;
