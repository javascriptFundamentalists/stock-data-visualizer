// Including other files with ES6 modules
//
import "core-js/stable";
import "regenerator-runtime/runtime";

import "./style.scss";
import { AppComponent } from "./App";
import { ContentComponent } from "./Content";

const app = new AppComponent({name: 'World'}, 'root', [
  [new ContentComponent({}, null), 'content']
]);
