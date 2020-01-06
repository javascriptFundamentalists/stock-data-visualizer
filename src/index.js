// Including other files with ES6 modules
import "core-js/stable";
import "regenerator-runtime/runtime";

import "./scss/style.scss";
import { AppComponent } from "./components/App";
import { D3Component } from "./components/D3Component";
import { SideBarComponent } from "./components/Sidebar";

import { readBATSmetadata } from "./d3/csv";
import { readCHRISmetadata } from "./d3/csv";

// available data sources
const sources = [
  {key: 'bats', name: 'BATS Exchange Equities'},
  {key: 'chris', name: 'Continuous Futures'}
];

(async () => {
  const data = await readCHRISmetadata();
  const codes = [];

  const app = new AppComponent({ tickers: codes, sources: sources }, "root", [
    [new SideBarComponent({}, null, []), "sidebar"],
    [new D3Component({}, null, []), "content"]
  ]);
})();
