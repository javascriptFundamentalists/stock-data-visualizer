import { html } from "lit-html";
import axios from "axios";
import { getBATSData, getCHRISData } from "../quandl/quandl";
import { readBATSmetadata, readCHRISmetadata, batsTransformer } from "../d3/csv";
import { Component } from "./Component";

/**
 * The app component is the global source of data. It handles all of the i/o
 * operations and passes data down to it's children to be rendered.
 */
export class AppComponent extends Component {
  template(data) {
    return html`
      <nav class="appbar" data-theme="theme-primary">
        <div class="logo">
          <span>
            <img class="logo-img" src="chart-line-solid.svg" alt="logo" />
            Stock Visuals
          </span>
        </div>
        <div class="menu">
          <div id="themePicker" class="themePicker" />
        </div>
      </nav>
      <div id="sidebar" class="sidebar" data-theme="theme-primary"></div>
      <div id="content" class="content" data-theme="theme-primary"></div>
      <div id="fundamentalsPanel" class="fundamentals" data-theme="theme-primary"></div>
    `;
  }

  events() {
    return [
      { type: "data-change", selector: "#root", handler: this.updateData },
      { type: "data-source-change", selector: "#root", handler: this.loadExchanges },
      { type: "data-exchange-change", selector: "#root", handler: this.loadTickers }
    ];
  }

  loadExchanges(e) {
    const exchanges = new Set([]);
    if ( e.detail.dataSource === 'bats' ) {
      readBATSmetadata().then(data => {
        batsTransformer(data);
        data.forEach(record => {
          exchanges.add(record.exchange);
        });
        const newData = {exchanges: [...exchanges], dataSource: 'bats', batsData: false, chrisData: false};
        this.update(newData);
      });
    } else {
      readCHRISmetadata().then(data => {
        data.forEach(record => {
          exchanges.add(record.Exchange);
        });
        const newData = {exchanges: [...exchanges], dataSource: 'bats', batsData: false, chrisData: false};
        this.update(newData);
      });
    }
  }

  loadTickers(e) {

    // load ticker data, then show
    let codes = [];
    if ( e.detail.dataSource === 'bats' ) {
      readBATSmetadata().then(data => {
        batsTransformer(data);
        codes = data.map(datum => {
          return {key: datum.code, name: datum.name, exchange: datum.exchange}
        });
        codes = codes.filter(c => { return c.exchange === e.detail.exchange });
        const newData = {tickers: codes, dataSource: 'bats', batsData: false, chrisData: false};
        this.update(newData);
      });
    } else {
      readCHRISmetadata().then(data => {
        codes = data.map(datum => {
          const symbol = `${datum.Exchange}_${datum.Ticker}1`;
          return {key: symbol, name: datum.Name, exchange: datum.Exchange}
        });
        codes = codes.filter(c => { return c.exchange === e.detail.exchange });
        const newData = {tickers: codes, dataSource: 'chris', batsData: false, chrisData: false};
        this.update(newData);
      });
    }
  }

  updateData(e) {
    const tickerSymbol = e.detail.tickerSymbol;
    const startDate = e.detail.startDate;
    const title = e.detail.title

    const newData = {
      dataSet: tickerSymbol,
      startDate: startDate,
      exchange: e.detail.exchange,
      batsData: false,
      chrisData: false,
      title: title,
    };

    if ( this.store.data.dataSource === 'bats' ) {
      const dataPromise = getBATSData(tickerSymbol, startDate);
      dataPromise.then(data => {
        newData.batsData = data.data;
        this.update(newData);
      });
    } else {
      const dataPromise = getCHRISData(tickerSymbol, startDate);
      dataPromise.then(data => {
        newData.chrisData = data.data;
        this.update(newData);
      });
    }
  }
}
