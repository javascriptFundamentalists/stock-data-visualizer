// Including other files with ES6 modules
//
import "core-js/stable";
import "regenerator-runtime/runtime";

import "./style.scss";
import { AppComponent } from "./App";
import { ContentComponent } from "./Content";
import { SideBarComponent } from "./Sidebar";

const app = new AppComponent({name: 'World'}, 'root', []);
const content = new ContentComponent({}, 'content', []);
//  [new ContentComponent({}, null), 'content'],
//  [new SideBarComponent({}, null), 'sidebar'],
//]);
