// Including other files with ES6 modules
//
import "core-js/stable";
import "regenerator-runtime/runtime";

import "./scss/style.scss";
import { AppComponent } from "./components/App";
import { D3Component } from "./components/D3Component";
import { SideBarComponent } from "./components/Sidebar";

import { readBATSmetadata } from "./d3/csv";
import { readCHRISmetadata } from "./d3/csv";

// limit the number of tickers for now
const limit = 15;
let counter = 0;

// available data sources
const sources = [
  {key: 'bats', name: 'BATS Exchange Equities'},
  {key: 'chris', name: 'Continuous Futures'}
];

(async () => {
  // const moredata = await readBATSmetadata();
  const data = await readCHRISmetadata();
  const codes = [];
  while (counter < limit) {
    // For BATS data
    // codes.push({ key: moredata[counter].code, name: moredata[counter].code });
    // For CHRIS data
    const symbol = `${data[counter].Exchange}_${data[counter].Ticker}1`;
    codes.push({ key: symbol, name: symbol });
    counter++;
  }

  const app = new AppComponent({ tickers: codes, sources: sources }, "root", [
    [new SideBarComponent({}, null, []), "sidebar"],
    [new D3Component({}, null, []), "content"]
  ]);
})();
