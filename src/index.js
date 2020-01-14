// Including other files with ES6 modules
import "core-js/stable";
import "regenerator-runtime/runtime";

import "./scss/style.scss";
import { AppComponent } from "./components/App";
import { D3Component } from "./components/D3Component";
import { SideBarComponent } from "./components/Sidebar";
import { CarouselComponent } from "./components/Image";
import { FundamentalsComponent } from "./components/FundamentalsComponent";
import { ThemeComponent } from "./components/ThemePicker";

import { getRandomFinanceImages } from "./unsplash/unsplash";
import { readBATSmetadata } from "./d3/csv";
import { readCHRISmetadata } from "./d3/csv";
//import { start } from "repl";

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
    exchanges: [],
    sources: sources,
    carouselUrls: carouselUrls
  }

  const app = new AppComponent(seedData, "root", [
    [new ThemeComponent({}, null, []), "themePicker"],
    [new D3Component({}, null, []), "content"],
    [new SideBarComponent({}, null, [
      [new CarouselComponent({}, null, []), "carousel"],
    ]), "sidebar"],
    [new FundamentalsComponent({}, null, []), "fundamentalsPanel"],
  ]);
})();

const controls = document.queryselector(".controls");
const container = document.queryselector(".thumbnail-container");
const allbox = container.children;
const containerwidth = container.offsetwidth;
const margin = 30;
let items = 0;
let totalitems = 0;
let jumpslidewidth = 0;

// image set up per slide

responsive = [
  {breakpoint:{width:0,item:1}},
  {breakpoint:{width:600,item:2}},
  {breakpoint:{width:1000,item:4}}
]

function load (){
  for (let i = 0; i <responsive.length; i ++){
    if(window.innerWidth>responsive[i].breakpoint.width){
      items = responsive[i].breakpoint.item
    }
  }
  start ();
}

function  start(){
  let totalitemwidth = 0
  for(let i=0;i <allbox.length;i++){
    //width and margin setup of images
    allbox[i].style.width = (containerwidth/items)- margin + "px";
    allbox[i].style.margin = (margin/2)+ "px";
    totalitemwidth +=containerwidth/items;
    totalitems ++; 
  
  }
  container.style.width = totalitemwidth + "px";
 
  //sldes numbers controls set up
   const allslides = math.ceil(totalitems/items);
   const ul = document.createElement("ul");
    for(let i =1; i<= allslides;i++){
      const li = document.createElement("li");
      li.id =i;
      li.innerHtml = i;
      li.setAttribute("onclick","controlslides(this)");
      ul.appendChild(li);
      if(i ==1){
        li.className = "active";
      }

    }
    controls.appendChild(ul);
  }
  // when click  on numbers slide to next slide
function controlslides(ele){
  //select ul children 'ul' elements
const ul = controls.children;
  //select ul children 'li' elements

  const li = ul[0].children;

  let active;
  for(let i=0;i<li.length;i++){
    if(li[i].className == "active"){
      //find who is active
      active = i;
      // remove active class fro  all 'li' element
      li[i].className = "";
    }
  }
  // add active class to current slide
  ele.className = "active";

  let numb = (ele.id -1)-active;
  jumpslidewidth = jumpslidewidth+(containerwidth*numb);
  container.style.marginleft = -jumpslidewidth + "px";

}



window.onload = load();
