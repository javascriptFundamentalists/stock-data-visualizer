import { html, render } from 'lit-html';
import { Store } from './store';

/**
 * Base class for visual components.
 *
 */
export class Component {
  constructor (data, parentId, children=[]) {
    this.children = [];
    this.parentId = parentId;
    this.store = new Store();
    this.store.subscribe(() => {this.render(this.store.data, this.parentId)})

    this.preMount()
    this.store.update(data, true) // force render
    this.registerEvents();
    this.attachMany(children);
  }

  /**
   * Executes before the render. This can be an alternative to inheritance
   */
  preMount() {}

  /**
   * Executes after the render.
   */
  postMount() {}

  /**
   * Fill template and inject html into the DOM at the parentId node
   */
  render (data, parentId) {
    if ( parentId ) {
      const parent = document.getElementById(parentId);
      render(this.template(data), parent);

      this.children.forEach(child => child.render(data, child.parentId));
      this.postMount()
    }
  }

  // TODO: method to destroy a Component gracefully
  destroy () {}

  /**
   * Add a subcomponent
   */
  attach (child, parentId) {
    if ( parentId ) {
      child.parentId = parentId;
      this.children.push(child);
      const allData = Object.assign(this.store.data, child.store.data);
      this.update(allData, true); // force render
      child.registerEvents();
    }
  }

  // TODO: method to remove a child
  detach (child) {}

  /**
   * Add multiple subcomponents
   * 
   * @param chilren (Array): Array of [Component, parentId] tuples
   */
  attachMany (children) {
    children.forEach(cp => {
      this.attach(cp[0], cp[1]);
    });
  }

  /**
   * Add event listeners for standard and custom events
   */
  registerEvents () {
    this.events().forEach(e => {
      const elements = document.querySelectorAll(e.selector);
      if ( elements ) {
        elements.forEach(el => {
          const handler = e.handler.bind(this);
          el.addEventListener(e.type, handler, false);
        });
      }
    });
  }

  // TODO: method to unbind events
  unregisterEvents () {}

  /**
   * Accessor method for this.store.update
   */
  update ( data, force=false ) {
    this.store.update(data, force);
  }

  /**
   * Utility method to bubble a custom event up the tree to be handled,
   * potentially by the root app widget
   *
   *
   */
  triggerCustomEvent (name, detail) {
    const evt = new CustomEvent(name, {
      bubbles: true,
      detail: detail,
    })
    const el = document.getElementById(this.parentId);
    el.dispatchEvent(evt);
  }

  /**
   * This is a hook-like method to add event listeners. This is called
   * during the constructor, and each object returned will be used to
   * create a listener.
   *
   * e.g. 
   * events () {
   *   return [
   *     {type: 'click', selector: '#button1', handler: (e) => this.clickHandler(e)},
   *     {type: 'change', selector: '#input1', handler: (e) => this.inputHandler(e)},
   *   ]
   * }
   */
  events () {
    return [];
  }

  /**
   * This is where the html structure is defined, using lit-html templates.
   */
  template (data) {
    return html`<div>OVERRIDE ME</div>`;
  }
}


