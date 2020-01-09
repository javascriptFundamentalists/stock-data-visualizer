import { html } from "lit-html";
import { Component } from "./Component";

export class SideBarComponent extends Component {
  template(data) {
    return html`
      <div class="sidebar-section">
        <ul id="sidebar-list-1">
          <li class="p-3">
            <label for="dataSourceInput">Data Source</label>
            <select id="dataSourceInput" name="dataSourceInput" class="form-control">
              <option value="">-- Select a Data Source --</option>
              ${data.sources.map(
                s => html`
                  <option value="${s.key}">${s.name}</option>
                `
              )};
            </select>
          </li>
          <li id="tickerInputItem" class="p-3 hidden">
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
      {type: "click", selector: "a", handler: this.triggerDataChange},
      {type: "change", selector: "#tickerInput", handler: this.triggerDataChange},
      {type: "change", selector: "#dataSourceInput", handler: this.triggerDataSourceChange},
    ];
  }

  showTickerInput() {
    const tickerInput = document.getElementById('tickerInputItem');
    tickerInput.classList.remove('hidden');
  }

  triggerDataSourceChange(e) {
    const source = e.target.value;
    this.triggerCustomEvent("data-source-change", {dataSource: source});
    this.showTickerInput()
  }

  triggerDataChange(e) {
    // need to preventDefault here or clicking <a> will navigate
    e.preventDefault();
    const ticker = e.target.value;
    this.triggerCustomEvent("data-change", { tickerSymbol: ticker });
  }
}
