/**
 * A simple data store.
 *
 * The store is an Observer, listening for changes to its data.
 * On change, it will notify subscribers.
 */
export class Store {
  constructor () {
    this.listeners = new Set([]);
    this.data = {};
  }

  subscribe (listener) {
    this.listeners.add(listener);
  }

  unsubscribe (listener) {
    this.listeners.delete(listener);
  }

  notify (...args) {
    this.listeners.forEach(listener => {
      listener(...args);
    });
  }

  /**
   * Conditionally update the data in state and notify subscribers.
   *
   * Can be forced to update and notify by passing force=<SOMETHING TRUTHY>
   *
   */
  update ( data, force=false ) {
    if ( !this.deepEqual(data, this.data) || force == true ) {
      Object.assign(this.data, data);
      this.notify();
    } else {
      // pass
    }
  }

  /**
   * Compare to objects for equality.
   *
   * Simple approach using JSON.stringify
   */
  deepEqual (obj1, obj2) {
    const _obj1 = JSON.stringify(obj1, Object.keys(obj1).sort());
    const _obj2 = JSON.stringify(obj2, Object.keys(obj1).sort());
    return _obj1 === _obj2;
  }
}

