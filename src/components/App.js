import { html } from "lit-html";
import axios from "axios";
import { getBATSData, getCHRISData } from "../quandl/quandl";
import { readBATSmetadata, readCHRISmetadata } from "../d3/csv";
import { Component } from "./Component";

/**
 * The app component is the global source of data. It handles all of the i/o
 * operations and passes data down to it's children to be rendered.
 */
export class AppComponent extends Component {
  template(data) {
    return html`
      <nav class="appbar appbar-primary">
        <div class="logo">
          <span>
            <img class="logo-img" src="chart-line-solid.svg" alt="logo" />
            Stock Visuals
          </span>
        </div>
      </nav>
      <div id="sidebar" class="sidebar sidebar-primary"></div>
      <div id="content" class="content content-primary"></div>
      <div id="fundamentalsPanel" class="fundamentals fundamentals-primary"></div>
    `;
  }

  events() {
    return [
      { type: "data-change", selector: "#root", handler: this.updateData },
      { type: "data-source-change", selector: "#root", handler: this.loadTickers }
    ];
  }

  loadTickers(e) {
    // load ticker data, then show
    let codes = [];
    if ( e.detail.dataSource === 'bats' ) {
      readBATSmetadata().then(data => {
        codes = data.map(datum => {
          return {key: datum.code, name: datum.code}
        });
        // limit to first 100 results for now due to slow dropdown
        codes = codes.filter((x, ndx) => { return ndx < 100});
        const newData = {tickers: codes, dataSource: 'bats', batsData: false, chrisData: false};
        this.update(newData);
      });
    } else {
      readCHRISmetadata().then(data => {
        codes = data.map(datum => {
          const symbol = `${datum.Exchange}_${datum.Ticker}1`;
          return {key: symbol, name: symbol}
        });
        // limit to first 100 results for now due to slow dropdown
        codes = codes.filter((x, ndx) => { return ndx < 100});
        const newData = {tickers: codes, dataSource: 'chris', batsData: false, chrisData: false};
        this.update(newData);
      });
    }
  }

  updateData(e) {
    const tickerSymbol = e.detail.tickerSymbol;

    const newData = { dataSet: tickerSymbol, batsData: false, chrisData: false };
    if ( this.store.data.dataSource === 'bats' ) {
      const dataPromise = getBATSData(tickerSymbol);
      dataPromise.then(data => {
        newData.batsData = data.data;
        this.update(newData);
      });
    } else {
      const dataPromise = getCHRISData(tickerSymbol);
      dataPromise.then(data => {
        newData.chrisData = data.data;
        this.update(newData);
      });
    }
  }
}
