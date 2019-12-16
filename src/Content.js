import { html } from 'lit-html'
import { Component } from './Component';


export class ContentComponent extends Component {
  template (data) {
    return html`
      <h1 id='hello'>Hello World</h1>
    `;
  }

}

