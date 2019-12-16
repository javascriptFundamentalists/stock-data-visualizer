import { html } from 'lit-html';
import { Component } from './Component';


export class SideBarComponent extends Component {
  template (data) {
    return html`
      <div class="sidebar-section">
        <ul id="sidebar-list-1">
          <li><a class=".click-item" href="#">Item 1</a>
          <li><a class=".click-item" href="#">Item 2</a>
          <li><a class=".click-item" href="#">Item 3</a>
        </ul>
      </div>
    `;
  }

  events () {
    return [
      {type: 'click', selector: 'a', handler: (e) => this.triggerNameChange(e)},
    ]
  }

  triggerNameChange(e) {
    e.preventDefault();
    const num = Math.floor(Math.random() * 10);
    const nameChangeEvent = new CustomEvent('name-change', {
      bubbles: true,
      detail: {id: num}
    });
    const el = document.getElementById(this.parentId);
    el.dispatchEvent(nameChangeEvent);
  }

}
