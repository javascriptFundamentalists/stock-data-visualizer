import { html, render } from 'lit-html';


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

  update ( data ) {
    if ( !this.deepEqual(data, this.data) ) {
      this.data = data;
      this.notify();
    }
  }

  deepEqual (obj1, obj2) {
    return false;
  }
}

export class Component {
  constructor (data, parentId, children=[]) {
    this.children = children;
    this.parentId = parentId;
    this.store = new Store();
    this.store.subscribe(() => {this.render(this.store.data, this.parentId)})

    this.store.update(data)
    this.registerEvents();
    this.attachMany(children);
  }

  attach (child, parentId) {
    if ( parentId ) {
      child.parentId = parentId;
      this.children.push(child);
      const allData = Object.assign(this.store.data, child.store.data);
      this.update(allData);
      child.registerEvents();
    }
  }

  attachMany (children) {
    children.forEach(cp => {
      this.attach(cp[0], cp[1]);
    });
  }

  registerEvents () {
    this.events().forEach(e => {
      const el = document.querySelector(e.selector);
      if ( el ) {
        const handler = e.handler.bind(this);
        el.addEventListener(e.type, handler, false);
      }
    });
  }

  render (data, parentId) {
    if ( parentId ) {
      const el = document.getElementById(parentId);
      render(this.template(data), el);
      this.children.forEach(child => child.render(data, child.parentId));
    }
  }

  update ( data ) {
    this.store.update(data);
  }

  // should be overridden
  events () {
    return [];
  }

  template (data) {
    return html`<div>OVERRIDE ME</div>`;
  }
}


