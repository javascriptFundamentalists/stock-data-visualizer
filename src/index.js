// Including other files with ES6 modules
import "core-js/stable";
import "regenerator-runtime/runtime";

import "./scss/style.scss";
import { AppComponent } from "./components/App";
import { D3Component } from "./components/D3Component";
import { SideBarComponent } from "./components/Sidebar";
import { CarouselComponent } from "./components/Image";
import { FundamentalsComponent } from "./components/FundamentalsComponent";

import { getRandomFinanceImages } from "./unsplash/unsplash";
import { readBATSmetadata } from "./d3/csv";
import { readCHRISmetadata } from "./d3/csv";
import { getFundamentalsData } from "./usfundamentals/usfundamentals";

// available data sources
const sources = [
  {key: 'bats', name: 'BATS Exchange Equities'},
  {key: 'chris', name: 'Continuous Futures'}
];

(async () => {
  const codes = [];

  const imageUrlPromise = await getRandomFinanceImages(5);
  const imageData = await imageUrlPromise.json();
  const carouselUrls = imageData.results.map(x => { return x.urls.thumb });

  const seedData = { 
    tickers: codes,
    sources: sources,
    carouselUrls: carouselUrls
  }

  const app = new AppComponent(seedData, "root", [
    [new D3Component({}, null, []), "content"],
    [new SideBarComponent({}, null, [
      [new CarouselComponent({}, null, []), "carousel"],
    ]), "sidebar"],
    [new FundamentalsComponent({}, null, []), "fundamentalsPanel"],
  ]);
})();
