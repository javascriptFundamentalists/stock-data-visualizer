import { html } from "lit-html";
import { Component } from "./Component";
import * as d3 from "d3";

export class D3Component extends Component {
  template(data) {
    return html`
      <div id="plot"></div>
    `;
  }

  render(data, parentId) {
    super.render(data, parentId);

    if ( data.dataSet ) {
        const rawDataArray = data.batsData.dataset.data;
        const parsedDataArray = rawDataArray.map(row => {
          return { date: row[0], close: row[1] };
        });
        data.plotData = parsedDataArray;
        this.clearPlot("#plot");
        this.renderPlot(data.plotData, "#plot");
    }

  }

  // TODO: should this consider the component or
  // just the plot element?
  clearPlot(selector) {
    const el = document.querySelector(selector);
    if (el) {
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
    }
  }

  // TODO: Big time refactoring
  renderPlot(data, plotElementId) {
    let csvdata = data;

    // Set the dimensions of the canvas / graph
    let margin = { top: 30, right: 20, bottom: 30, left: 50 },
      width = 600 - margin.left - margin.right,
      height = 270 - margin.top - margin.bottom;

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
    let valueline = d3
      .line()
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.close);
      });

    // Adds the svg canvas
    let svg = d3
      .select(plotElementId)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    csvdata.forEach(function(d) {
      let parseDate = d3.timeParse("%Y-%m-%d");
      d.date = parseDate(d.date);
      d.close = +d.close;
    });

    // Scale the range of the data
    x.domain(
      d3.extent(csvdata, function(d) {
        return d.date;
      })
    );
    y.domain([
      0,
      d3.max(csvdata, function(d) {
        return d.close;
      })
    ]);

    // Add the valueline path.
    svg
      .append("path")
      .attr("class", "line")
      .attr("d", valueline(csvdata));

    // Add the X Axis
    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    // Add the Y Axis
    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis);
  }
}
