import { html } from 'lit-html'
import { Component } from './Component';
import * as d3 from 'd3';


export class D3Component extends Component {
  template (data) {
    return html`
      <div id="plot"></div>
    `;
  }

  render (data, parentId) {
    super.render(data, parentId);

    // TODO: fix this stub
    switch(data.dataSet) {
      case "AAPL":
        data.plotData = d3.csvParse(`date,close\n1-May-12,58.13\n30-Apr-12,53.98\n27-Apr-12,67.00`);
        break;
      case "BATS_AAC":
        data.plotData = d3.csvParse(`date,close\n26-Apr-12,89.70\n5-Apr-12,99.00\n24-Apr-12,130.28\n23-Apr-12,166.70\n20-Apr-12,234.98`);
        break;
      default:
        data.plotData = d3.csvParse(`date,close\n1-May-12,58.13\n30-Apr-12,53.98\n27-Apr-12,67.00`);
    }

    this.clearPlot('#plot');
    this.renderPlot(data.plotData, '#plot');
  }

  // TODO: should this consider the component or
  // just the plot element?
  clearPlot (selector) {
    const el = document.querySelector(selector);
    if ( el ) {
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
    }
  }

  // TODO: Big time refactoring
  renderPlot(data, plotElementId) {
    let csvdata = data;
    // Set the dimensions of the canvas / graph
    let margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

    // Parse the date / time
    let parseDate = d3.timeFormat("%d-%b-%y").parse;

    // Set the ranges
    let x = d3.scaleTime().range([0, width]);
    let y = d3.scaleLinear().range([height, 0]);

    // Define the axes
    //let xAxis = d3.svg.axis().scale(x)
    //    .orient("bottom").ticks(5);
    let xAxis = d3.axisBottom(x);

    //let yAxis = d3.svg.axis().scale(y)
    //    .orient("left").ticks(5);
    let yAxis = d3.axisLeft(y);

    // Define the line
    let valueline = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); });
        
    // Adds the svg canvas
    let svg = d3.select(plotElementId)
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", 
                  "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
//19-Apr-12,345.44
//18-Apr-12,443.34
//17-Apr-12,543.70
//16-Apr-12,580.13
//13-Apr-12,605.23
//12-Apr-12,622.77
//11-Apr-12,626.20
//10-Apr-12,628.44
//9-Apr-12,636.23
//5-Apr-12,633.68
//4-Apr-12,624.31
//3-Apr-12,629.32
//2-Apr-12,618.63
//30-Mar-12,599.55
//29-Mar-12,609.86
//28-Mar-12,617.62
//27-Mar-12,614.48
//26-Mar-12,606.98
//    `);
    // in place update data
    csvdata.forEach(function(d) {
        let parseDate = d3.timeParse("%d-%b-%y");
        d.date = parseDate(d.date);
        d.close = +d.close;
    });

    // Scale the range of the data
    x.domain(d3.extent(csvdata, function(d) { return d.date; }));
    y.domain([0, d3.max(csvdata, function(d) { return d.close; })]);

    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(csvdata));

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

  }
}
