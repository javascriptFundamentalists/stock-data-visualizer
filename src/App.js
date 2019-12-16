import { html } from 'lit-html';
import { Component } from './Component';


export class AppComponent extends Component {
  template (data) {
    return html`
      <nav class="appbar appbar-primary">
        <div class="padded">
          <a class="appbar-link" href="#">App Bar</a>
        </div>
      </nav>
      <div class="sidebar sidebar-primary">
        <div class="sidebar-section">
          <ul id="sidebar-list-1"/>
        </div>
      </div>
      <div id="content">
      </div>
    `;
  }
}

