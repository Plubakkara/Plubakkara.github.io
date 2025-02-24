/*
*    main.js
*    6.5 - Event listeners and handlers in D3
*/

const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

const svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

const g = svg
  .append("g")
  .attr("transform", `translate(${MARGIN.LEFT},${MARGIN.TOP})`);

let time = 0;

// Tooltip
const tip = d3.tip()
  .attr('class', 'd3-tip')
	.html(d => {
		let 
    text = `<strong>NAME :</strong> <span style='color:#05C4BC;text-transform:capitalize'>${d.name}</span><br>`
    text += `<strong>Height :</strong> <span style='color:#ff8e1e;text-transform:capitalize'>${d.Height}</span><br>`
		text += `<strong>Weight :</strong> <span style='color:#1eff2f;text-transform:capitalize'>${d.Weight}</span><br>`
    text += `<strong>Gender :</strong> <span style='color:#C0C0C0;text-transform:capitalize'>${d.Gender}</span><br>`
    text += `<strong>Eye color :</strong> <span style='color:#C0C0C0;text-transform:capitalize'>${d.Eyecolor}</span><br>`
    text += `<strong>Race :</strong> <span style='color:#C0C0C0;text-transform:capitalize'>${d.Race}</span><br>`
    text += `<strong>Haircolor :</strong> <span style='color:#C0C0C0;text-transform:capitalize'>${d.Haircolor}</span><br>`
    text += `<strong>Publisher :</strong> <span style='color:#C0C0C0;text-transform:capitalize'>${d.Publisher}</span><br>`
    text += `<strong>Alignment :</strong> <span style='color:#C0C0C0;text-transform:capitalize'>${d.Alignment}</span><br>`


    return text
	})
g.call(tip)

// Scales
const x = d3.scaleLog()
  .base(5)
  .range([0, WIDTH])
  .domain([10, 2000]);
const y = d3.scaleLinear()
  .range([HEIGHT, 0])
  .domain([-300, 1200]);
const area = d3
  .scaleLinear()
  .range([50 * Math.PI, 300 * Math.PI])
  .domain([100, 1000]);
const TimeColor = d3.scaleOrdinal(d3.schemeSet2);

// Labels
const xLabel = g.append("text")
	.attr("y", HEIGHT + 45)
	.attr("x", WIDTH / 2)
	.attr("font-size", "20px")
	.attr("text-anchor", "middle")
  .attr("fill","#000000")
	.text("Weight");
const yLabel = g
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", -40)
  .attr("x", -170)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr('fill', 'black')
  .text("Height");
const timeLabel = g
  .append("text")
  .attr("y", HEIGHT - 10)
  .attr("x", WIDTH - 15)
  .attr("font-size", "15px")
  .attr("opacity", "1")
  .attr("text-anchor", "middle")
  .text("RATE");
const timeLabel2 = g
  .append("text")
  .attr("y", HEIGHT - 378)
  .attr("x", WIDTH - 665)
  .attr("font-size", "15px")
  .attr("opacity", "1")
  .attr("text-anchor", "middle")
  .text("RATE");
// X Axis
const xAxisCall = d3
  .axisBottom(x)
  .tickValues([200,500,1000])
  .tickFormat((d) => d);
g.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${HEIGHT})`)
  .call(xAxisCall);

// Y Axis
const yAxisCall = d3.axisLeft(y);
g.append("g")
    .attr("class", "y axis")
    .call(yAxisCall);



d3.json("data/dataset.json").then(function(data) {
  // clean data
  const formattedData = data.map((year) => {
    return year["Hero"]
      .filter((ratingpoint) => {
        const dataExists = ratingpoint.Weight && ratingpoint.Height;
        return dataExists;
      })
      .map((ratingpoint) => {
        ratingpoint.Weight = Number(ratingpoint.Weight);
        ratingpoint.Height = Number(ratingpoint.Height);
        return ratingpoint;
      });
  });
  $("#continent-select").on("change", () => {
    update(formattedData[time]);
  });
  update(formattedData[0]);
});

function update(data) {
  // standard transition time for the visualization
  const t = d3.transition()
    .duration(100);

  const Gender = $("#continent-select").val();
  const filteredData = data.filter((d) => {
    if (Gender === "all") return true;
    else {
      return d.Gender == Gender;
    }
  });

  // JOIN new data with old elements.
  const circles = g.selectAll("circle")
    .data(filteredData, d => d.Gender);
  
  // EXIT old elements not present in new data.
  circles.exit().remove();

  // ENTER new elements present in new data.
  circles.enter().append("circle")
    .attr("fill", (d) => TimeColor(d.Gender))
    .on("mouseover", tip.show)
		.on("mouseout", tip.hide)
    .merge(circles)
    .transition(t)
      .attr("cy", (d) => y(d.Height))
      .attr("cx", (d) => x(d.Weight))
      .attr("r", (d) => Math.sqrt(area(d.Weight) / Math.PI));

}
