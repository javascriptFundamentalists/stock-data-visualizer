import { html } from "lit-html";
import { Component } from "./Component";

export class SideBarComponent extends Component {
  template(data) {
    return html`
      <div class="sidebar-section">
        <ul id="sidebar-list-1">
          <li class="padded">
            <label for="tickerInput">Ticker Symbol</label>
            <select id="tickerInput" name="tickerInput" class="form-control">
              <option value="">-- Pick a Symbol --</option>
              ${data.tickers.map(
                t => html`
                  <option value="${t.key}">${t.name}</option>
                `
              )};
            </select>
          </li>
        </ul>
      </div>
    `;
  }

  events() {
    return [
      { type: "click", selector: "a", handler: this.triggerDataChange },
      {
        type: "change",
        selector: "#tickerInput",
        handler: this.triggerDataChange
      }
    ];
  }

  triggerDataChange(e) {
    e.preventDefault();
    const ticker = e.target.value;
    this.triggerCustomEvent("data-change", { tickerSymbol: ticker });
  }
}
