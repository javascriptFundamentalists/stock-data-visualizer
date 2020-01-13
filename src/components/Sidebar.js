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
          <li id="useDatesInputItem" class="p-3">
            <input type="checkbox" id="useDateInput" name="useDateInput" class="" />
            <label for="useDateInput">Use Start Date?</label>
          </li>
          <li id="startDateInputItem" class="p-3 invisible">
            <label for="startDateInput">Start Date</label>
            <div class="inline-radio">
              <input type="radio" name="startDate" value="2017-01-01">2017</input>
              <input type="radio" name="startDate" value="2018-01-01">2018</input>
              <input type="radio" name="startDate" value="2019-01-01" checked="true">2019</input>
            </div>
          </li>
        </ul>
      </div>
      <div id="carousel" class="carousel" />
    `;
  }

  events() {
    return [
      {type: "change", selector: "[name='startDate']", handler: this.triggerDataChange},
      {type: "change", selector: "#useDateInput", handler: this.toggleDateInput},
      {type: "click", selector: "a", handler: this.triggerDataChange},
      {type: "change", selector: "#tickerInput", handler: this.triggerDataChange},
      {type: "change", selector: "#exchangeInput", handler: this.triggerDataExchangeChange},
      {type: "change", selector: "#dataSourceInput", handler: this.triggerDataSourceChange},
    ];
  }

  validateSidebar() {
    const selectValid = (selectElement) => { return selectElement.selectedIndex !== 0 };
    let valid = true;
    const elements = [
      document.getElementById('dataSourceInput'),
      document.getElementById('exchangeInput'),
      document.getElementById('tickerInput'),
    ]
    elements.forEach(el => {
      if ( !selectValid(el) ) {
        valid = false;
        el.classList.add('error');
      } else {
        el.classList.remove('error');
      }
    });
    return valid;
  }

  gatherQueryDetails() {
    const tickerSelect = document.getElementById('tickerInput');
    const details = {
      title: tickerSelect.options[tickerSelect.selectedIndex].textContent,
      tickerSymbol: document.getElementById('tickerInput').value,
      exchange: document.getElementById('exchangeInput').value,
      dataSource: document.getElementById('dataSourceInput').value,
      startDate: [...document.querySelectorAll("[name='startDate']")].find(
        el => { return el.checked }
      ).value
    }
    return details;
  }

  toggleDateInput(e) {
    const dateInput = document.getElementById('startDateInputItem');
    dateInput.classList.toggle('invisible');
  }

  triggerDataSourceChange(e) {
    const source = e.target.value;
    const tickerInput = document.getElementById('tickerInput');
    const exchangeInput = document.getElementById('exchangeInput');
    tickerInput.selectedIndex = "0";
    exchangeInput.selectedIndex = "0";
    this.triggerCustomEvent("data-source-change", {dataSource: source});
  }

  triggerDataChange(e) {
    // need to preventDefault here or clicking <a> will navigate
    e.preventDefault();
    const validSidebar = this.validateSidebar();
    if ( validSidebar ) {
      const details = this.gatherQueryDetails();
      this.triggerCustomEvent("data-change", details);
    }
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
