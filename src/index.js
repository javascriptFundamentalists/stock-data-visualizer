// Including other files with ES6 modules
import "core-js/stable";
import "regenerator-runtime/runtime";

import "./scss/style.scss";
import { AppComponent } from "./components/App";
import { D3Component } from "./components/D3Component";
import { SideBarComponent } from "./components/Sidebar";
import { ImageComponent, CarouselComponent } from "./components/Image";

import { getRandomImage } from "./unsplash/unsplash";
import { readBATSmetadata } from "./d3/csv";
import { readCHRISmetadata } from "./d3/csv";

// available data sources
const sources = [
  {key: 'bats', name: 'BATS Exchange Equities'},
  {key: 'chris', name: 'Continuous Futures'}
];

(async () => {
  const codes = [];

  const imageUrlPromise = await getRandomImage({ username: "naoufal" });
  const imageData = await imageUrlPromise.json();
  const imageUrl = imageData.urls.thumb;
  const carouselUrls = [imageUrl, imageUrl, imageUrl];

  const seedData = { 
    tickers: codes,
    sources: sources,
    imageUrl: imageUrl,
    carouselUrls: carouselUrls
  }

  const app = new AppComponent(seedData, "root", [
    [new ImageComponent({}, null, []), "logo"],
    [new SideBarComponent({}, null, []), "sidebar"],
    [new D3Component({}, null, []), "content"],
    [new CarouselComponent({}, null, []), "carousel"],
  ]);
})();
