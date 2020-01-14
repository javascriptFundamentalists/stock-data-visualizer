import { html } from "lit-html";
import { Component } from "./Component";
import * as d3 from "d3";

/**
 * Utility function to stringify a Date object for presentation
 *
 * @param d (Date) A Date object to reformat
 * @returns A string formatted as %Y-%m-%d
 */
const dateFormatted = (d) => {
    let yearFmt = d.date.getFullYear();

    let _monthFmt = d.date.getMonth() + 1;
    let monthFmt = _monthFmt.toString().length < 2 ? '0' + _monthFmt : _monthFmt;

    let _dayFmt = d.date.getDate();
    let dayFmt = _dayFmt.toString().length < 2 ? '0' + _dayFmt : _dayFmt;

    return `${yearFmt}-${monthFmt}-${dayFmt}`;
}

export class D3Component extends Component {
  template(data) {
    return html`
      <div id="plot" class="plot">
       <img src="bullbear.png" alt="stock default image" />
      </div>
    `;
  }


  /**
   * Extend render() to inject D3.js plot
   */
  render(data, parentId) {
    super.render(data, parentId);

    if ( data.dataSet ) {
      // TODO: refactor data structure to be named data.data instead of named
      // just like dataset e.g. batsData; this will trim many lines of code and
      // avoid constantly having to test which we're working with
      const dataSourceDispatch = {
        bats:  [data.batsData, row => { return {date: row[0], close: row[1]} }],
        chris: [data.chrisData, row => { return {date: row[0], close: row[5]} }]
      }
      const source = data.dataSource;
      const [rawData, mapper] = dataSourceDispatch[source];
      data.plotData = rawData.dataset.data.map(mapper);
      this.clearPlot('#plot');
      this.renderPlot(data.plotData, '#plot', data.title);
    }

  }

  renderPlot(data, plotElementId, title) {
    let csvdata = data;

    // Set the dimensions of the canvas / graph
    let margin = { top: 30, right: 30, bottom: 30, left: 60 },
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // Set the ranges
    let x = d3.scaleTime().range([0, width]);
    let y = d3.scaleLinear().range([height, 0]);

    // Define the axes
    let xAxis = d3.axisBottom(x);

    //let yAxis = d3.svg.axis().scale(y)
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

    // Define the div for the tooltip
    let div = d3.select("body").append("div")    
        .attr("class", "tooltip")                
        .style("opacity", 0);

    // Adds the svg canvas
    let svg = d3
      .select(plotElementId)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("text")
            .attr("x", (width / 2))             
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")  
            .style("font-size", "16px") 
            .style("text-decoration", "underline")  
            .text(title);

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

    // Add the scatterplot
    svg.selectAll("dot")    
      .data(data)            
      .enter().append("circle")                                
      .attr("r", 2)        
      .attr("cx", function(d) { return x(d.date); })         
      .attr("cy", function(d) { return y(d.close); })        
      .on("mouseover", function(d) {        
        div.transition()        
          .duration(200)        
          .style("opacity", .9);        

        // convert date for tooltip
        let dateFmt = dateFormatted(d);

        // add the tooltips
        div.html("date: " + dateFmt + "<br/>" + "price: " + d.close)    
          .style("text-align", "left")
          .style("padding-left", "3px")
          .style("left", (d3.event.pageX) + "px")        
          .style("top", (d3.event.pageY - 28) + "px");    
      })                    
      .on("mouseout", function(d) {        
        div.transition()        
          .duration(500)        
          .style("opacity", 0);    
      });
  }

  /**
   * Empty out the plot container
   */
  clearPlot(selector) {
    const el = document.querySelector(selector);
    if (el) {
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
    }
  }

}
