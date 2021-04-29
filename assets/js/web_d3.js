/*
* @Author: Yue Wu
* @Date:   2015-09-28 16:25:42
* @Last Modified by:   Yue Wu
* @Last Modified time: 2015-09-30 20:42:32
*/

var width = 1440,
    height = 810,
    centered;

var svg = d3.select("#map").append("svg")
  .attr("width", width)
  .attr("height", height);

svg.append("g").attr("id", "provinces")
svg.append("g").attr("id", "states")
svg.append("g").attr("id", "nodes")
svg.append("g").attr("id", "origin")

var projection = d3.geo.albers()
  .center([0, 42]).scale(1200)
  .translate([width / 2, height / 2]);

var path = d3.geo.path().projection(projection);

d3.json("/assets/data/geo_can.json", function(error, geoData) {
  if (error) return console.error(error);

  var provinces = topojson.feature(geoData, geoData.objects.provinces);

  svg.select("#provinces").selectAll(".province")
    .data(provinces.features)
    .enter().append("path")
    .attr("class", function(d) {return "province province-" + d.properties.postal;})
    .attr("d", path)
    .on("click", clicked);
});

d3.json("/assets/data/geo_usa.json", function(error, geoData) {
  if (error) return console.error(error);

  var states = topojson.feature(geoData, geoData.objects.states);

  svg.select("#states").selectAll(".state")
    .data(states.features)
    .enter().append("path")
    .attr("class", function(d) {return "state state-" + d.properties.postal;})
    .attr("d", path)
    .on("click", clicked);
});

d3.csv("data.csv", function(error, data) {
  if (error) return console.error(error);

  // [Plotting points on a map in D3](http://bl.ocks.org/phil-pedruco/7745589)
  svg.select("#nodes").selectAll("circle")
    .data(data)
    .enter().append("circle")
    .attr("cx", function (d) {return projection([d.Lon, d.Lat])[0];})
    .attr("cy", function (d) {return projection([d.Lon, d.Lat])[1];})
    .attr("r", "2px");

  setBrush(data, svg);
});

svg.select("#origin")
  .append("svg:polygon")
  .attr("points", CalculateStarPoints(878.807, 524.742, 5, 10, 5));


// third party functions
function setBrush(data, layer) {
  // [Timeline with scaled markers - Mapbox]
  // (https://www.mapbox.com/mapbox.js/example/v1.0.0/timeline-scaled-markers/)
  var width = 1200,
    height = 100,
    margin = {top: 0, right: 0, bottom: 0, left: 0};

  var timeExtent = d3.extent(data, function(d) {
    return new Date(d.ShipDate);
  });

  var svg = d3.select("#brush").append('svg')
    .attr("width", width)
    .attr("height", height);

  var context = svg.append('g')
    .attr('class', 'context')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  var x = d3.time.scale()
    .range([0, width])
    .domain(timeExtent);

  var brush = d3.svg.brush()
    .x(x)
    .on('brushend', brushend);

  context.selectAll('circle.quake')
    .data(data)
    .enter().append('circle')
    .attr('transform', function(d) {
        return 'translate(' + [x(new Date(d.ShipDate)), height / 2] + ')';
    })
    .attr('r', '1px')
    .attr('opacity', 0.5)
    .attr('stroke', '#fff')
    .attr('stroke-width', 0.5)
    .attr('fill', 'black');

  context.append('g')
    .attr('class', 'x brush')
    .call(brush)
    .selectAll('rect')
    .attr('y', -6)
    .attr('height', height);

  function brushend() {
    var filter;
    // If the user has selected no brush area, share everything.
    if (brush.empty()) {
      filter = function() { return true; }
    } else {
      // Otherwise, restrict features to only things in the brush extent.
      filter = function(feature) {
        return (new Date(feature.ShipDate)) >= +brush.extent()[0] &&
          (new Date(feature.ShipDate)) <= (+brush.extent()[1]);
      };
    }
    var filtered = data.filter(filter);

    console.log(brush.extent());

    layer.select("#nodes").selectAll("circle").remove()
    layer.select("#nodes").selectAll("circle")
      .data(filtered)
      .enter().append("circle")
      .attr("cx", function (d) {return projection([d.Lon, d.Lat])[0];})
      .attr("cy", function (d) {return projection([d.Lon, d.Lat])[1];})
      .attr("r", "2px");

  }
}

function clicked(d) {
  // [click-to-zoom via transform](http://bl.ocks.org/mbostock/2206590)
  var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  svg.select("#states").selectAll("path")
    .classed("active", centered && function(d) { return d === centered; });

  svg.selectAll("g").transition()
    .duration(750)
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
    .style("stroke-width", 1.5 / k + "px");

  svg.select("#nodes").selectAll("circle")
    .attr("r", 2 / k + "px");
}

function CalculateStarPoints(centerX, centerY, arms, outerRadius, innerRadius) {
  // [How to draw a star with SVG and Javascript]
  // (https://dillieodigital.wordpress.com/2013/01/16/quick-tip-how-to-draw-a-star-with-svg-and-javascript/)
  var results = "";
  var angle = Math.PI / arms;

  for (var i=0; i<2*arms; i++) {
    // Use outer or inner radius depending on what iteration we are in.
    var r = (i & 1) == 0 ? outerRadius : innerRadius;
    var currX = centerX + Math.cos(i * angle) * r;
    var currY = centerY + Math.sin(i * angle) * r;

    // Our first time we simply append the coordinates, subsequet times
    // we append a ", " to distinguish each coordinate pair.
    if (i==0) {
      results = currX + "," + currY;
    }
    else {
      results += ", " + currX + "," + currY;
    }
  }

  return results;
}
