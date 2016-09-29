import * as d3 from "d3";
import topojson from "topojson";

export class Map {
	constructor (width, height, div, geo, data) {
		this.width = width;
		this.height = height;
		this.geo = geo;
		this.data = data;
		this.div = div;
	}

	column (col) {
		return col;
	}

	join (field) {
		return field;
	}

	init () {
		var svg = d3.select(this.div).select("svg");

		var join = d3.map();

		var quantize = d3.scaleQuantize()
		    .domain([0, 0.15])
		    .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));
	
		var projection = d3.geoAlbersUsa()
		    .scale(1280)
		    .translate([this.width / 2, this.height / 2]);
	
		var path = d3.geoPath()
		    .projection(projection);
	
		d3.queue()
		    .defer(d3.json, this.geo)
		    .defer(d3.csv, this.data, function(d) { join.set(d[this.join()], +d[this.column()]); })
		    .await(ready);

		console.log(this.join());
	
		function ready(error, us) {	


			  svg.append("g")
			      .attr("class", "counties")
			    .selectAll("path")
			      .data(topojson.feature(us, us.objects.counties).features)
			    .enter().append("path")
			      .attr("class", function(d) { return quantize(join.get(d[this.field])); })
			      .attr("d", path);
	
			  svg.append("path")
			      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
			      .attr("class", "states")
			      .attr("d", path);
		}
	}

	ready (){

	}

}