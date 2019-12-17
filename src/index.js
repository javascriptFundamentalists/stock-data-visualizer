// Including other files with ES6 modules
//
import "core-js/stable";
import "regenerator-runtime/runtime";

import "./scss/style.scss";
import { AppComponent } from "./components/App";
import { D3Component } from "./components/D3Component";
import { SideBarComponent } from "./components/Sidebar";

const app = new AppComponent({tickers: [{key: 'AAPL', name: 'AAPL'}, {key: 'C', name: 'Citibank'}]}, 'root', [
  [new SideBarComponent({}, null, []), 'sidebar'],
  [new D3Component({}, null, []), 'content'],
]);
