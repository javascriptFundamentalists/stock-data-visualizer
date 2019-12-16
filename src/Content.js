import { html } from 'lit-html'
import { Component } from './Component';


export class ContentComponent extends Component {
  template (data) {
    return html`
      <h1 id='hello'>Hello ${data.name}</h1>
      <button id="helloBtn" type="button">Click Me!</button>
    `;
  }

  events () {
    return [
      {type: 'click', selector: '#helloBtn', handler: this.helloClick},
    ]
  }

  helloClick (ev) {
    const num = Math.floor(Math.random() * 10);
    this.triggerCustomEvent('name-change', {id: num});
  }

}

