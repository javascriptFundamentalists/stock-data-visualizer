import { html } from 'lit-html';
import { Component } from './Component';

export class SideBarComponent extends Component {
  template (data) {
    return html`
      <div class="sidebar-section">
        <ul id="sidebar-list-1">
          <li class="padded">
            <label for="tickerInput">Ticker Symbol</Label>
            <select id="tickerInput" name="tickerInput" class="form-control">
              ${data.tickers.map(t => html`
                <option value="${t.key}">${t.name}</option>
                `)};
            </select>
          </li>
        </ul>
      </div>
    `;
  }

  events () {
    return [
      {type: 'click', selector: 'a', handler: this.triggerDataChange},
      {type: 'change', selector: '#tickerInput', handler: this.triggerDataChange},
    ]
  }

  triggerDataChange(e) {
    e.preventDefault();
    const ds = e.target.value;
    this.triggerCustomEvent('data-change', {dataSet: ds})
  }

}
