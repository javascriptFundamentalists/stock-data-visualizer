import { html } from "lit-html";
import axios from "axios";
import { getBATSData, getCHRISData } from "../quandl/quandl";
import { Component } from "./Component";

/**
 * The app component is the global source of data. It handles all of the i/o
 * operations and passes data down to it's children to be rendered.
 */
export class AppComponent extends Component {
  template(data) {
    return html`
      <nav class="appbar appbar-primary">
        <div class="padded">
          <a class="appbar-link" href="#">Stock Visuals</a>
        </div>
      </nav>
      <div id="sidebar" class="sidebar sidebar-primary"></div>
      <div id="content"></div>
    `;
  }

  events() {
    return [
      { type: "data-change", selector: "#root", handler: this.updateData },
      { type: "data-source-change", selector: "#root", handler: this.loadTickers }
    ];
  }

  loadTickers(e) {
    console.log(e.detail);
    // load ticker data, then show
  }

  updateData(e) {
    const tickerSymbol = e.detail.tickerSymbol;

    // const anotherDataPromise = getBATSData(tickerSymbol);
    const dataPromise = getCHRISData(tickerSymbol);
    const newData = { dataSet: tickerSymbol, batsData: false, chrisData: false };
    dataPromise.then(data => {
      newData.chrisData = data.data;
      this.update(newData);
    });
    /*anotherDataPromise.then(data => {
      newData.batsData = data.data;
    });*/
  }
}
