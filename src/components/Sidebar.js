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
          <li id="exchangeInputItem" class="p-3">
            <label for="exchangeInput">Exchange</label>
            <select id="exchangeInput" name="exchangeInput" class="form-control mw-100">
              <option value="">-- Select an Exchange --</option>
              ${data.exchanges.map(
                exchange => html`
                  <option value="${exchange}">${exchange}</option>
                `
              )}
            </select>
          </li>
          <li id="tickerInputItem" class="p-3">
            <label for="tickerInput">Instrument</label>
            <select id="tickerInput" name="tickerInput" class="form-control mw-100">
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
      <div id="carousel" class="carousel" />
    `;
  }

  events() {
    return [
      {type: "click", selector: "a", handler: this.triggerDataChange},
      {type: "change", selector: "#tickerInput", handler: this.triggerDataChange},
      {type: "change", selector: "#exchangeInput", handler: this.triggerDataExchangeChange},
      {type: "change", selector: "#dataSourceInput", handler: this.triggerDataSourceChange},
    ];
  }

  showTickerInput() {
    const tickerInput = document.getElementById('tickerInputItem');
  }

  triggerDataSourceChange(e) {
    const source = e.target.value;
    const tickerInput = document.getElementById('tickerInput');
    const exchangeInput = document.getElementById('exchangeInput');
    tickerInput.selectedIndex = "0";
    exchangeInput.selectedIndex = "0";
    this.triggerCustomEvent("data-source-change", {dataSource: source});
    this.showTickerInput()
  }

  triggerDataChange(e) {
    // need to preventDefault here or clicking <a> will navigate
    e.preventDefault();
    const ticker = e.target.value;
    this.triggerCustomEvent("data-change", { tickerSymbol: ticker });
  }

  triggerDataExchangeChange(e) {
    e.preventDefault();
    const exchange = e.target.value;
    const source = document.getElementById('dataSourceInput');
    const tickerInput = document.getElementById('tickerInput');
    tickerInput.selectedIndex = "0";
    const ticker = e.target.value;
    this.triggerCustomEvent("data-exchange-change", { exchange: exchange, dataSource: source.value});
  }
}
