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

  /**
   * Load the exchanges dropdown in the sidebar by updating the app state and
   * causing the child Sidebar app to rerender.
   */
  loadExchanges(e) {
    // TODO: Since there are only two options, live with a little dupage here
    // factor out common lines when adding more data sources.
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

  /**
   * Populate the Symbol dropdown
   */
  loadTickers(e) {
    // TODO: when adding more data sources, refactor some of the common code
    // here and in loadExchanges into e.g. a strategy pattern or map-dispatch
    // pattern
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

    // reduce branching by using a map
    const source = this.store.data.dataSource
    const dispatchDataSource = {
      bats: [getBATSData, 'batsData'],
      chris: [getCHRISData, 'chrisData'],
    }
    const [getData, dataKey] = dispatchDataSource[source];

    const dataPromise = getData(tickerSymbol, startDate);
    dataPromise.then(data => {
      newData[dataKey] = data.data;
      this.update(newData);
    });
  }
}
