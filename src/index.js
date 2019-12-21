// Including other files with ES6 modules
//
import "core-js/stable";
import "regenerator-runtime/runtime";

import "./scss/style.scss";
import { AppComponent } from "./components/App";
import { D3Component } from "./components/D3Component";
import { SideBarComponent } from "./components/Sidebar";

import { readBATSmetadata } from "./d3/csv";

// limit the number of tickers for now
const limit = 15;
let counter = 0;

(async () => {
  const data = await readBATSmetadata();
  const codes = [];
  while (counter < limit) {
    codes.push({ key: data[counter].code, name: data[counter].code });
    counter++;
  }

  const app = new AppComponent({ tickers: codes }, "root", [
    [new SideBarComponent({}, null, []), "sidebar"],
    [new D3Component({}, null, []), "content"]
  ]);
})();
