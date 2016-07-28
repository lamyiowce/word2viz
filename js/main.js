"use strict";

d3.csv("/data/minimal.50d.3f.csv", callback);

function callback(data) { 
	console.log(data[0]);
	var vecs = {};
	for (var i = 0; i < data.length; i++) {
		var vec = [];
		for (var key in data[i]) {
			if (key !== "0") {
				vec.push(+data[i][key]);
			}
		}
		vecs[data[i][0]] = vec;
	}
	var wordlist = Object.keys(vecs);
	console.log(getWithAxes(vecs, 
		["good", "bad", "fast", "slow", "up", "down"], 
		substract(vecs["up"], vecs["down"]), 
		substract(vecs["good"], vecs["bad"])));

	var width = 400, height = 300;
	var margin = {top: 40, bottom: 60, left: 80, right: 40};
	var svg = d3.select("body")
		.append("svg")
		.attr("width", width+margin.left + margin.right)
		.attr("height", height+margin.top+ margin.bottom);	

	var testpoints = getWithAxes(vecs, 
		["good", "bad", "fast", "slow", "up", "down"], 
		substract(vecs["up"], vecs["down"]), 
		substract(vecs["good"], vecs["bad"]));
	

	var aMin = d3.min(testpoints, function(d) { return d.a_axis; });
	var aMax = d3.max(testpoints, function(d) { return d.a_axis; });
	var bMin = d3.min(testpoints, function(d) { return d.b_axis; });
	var bMax = d3.max(testpoints, function(d) { return d.b_axis; });

	var xDataMargin = (aMax-aMin)*0.1;
	var yDataMargin = (bMax-bMin)*0.1;
	var x = d3.scale.linear()
		.domain([aMin-xDataMargin, aMax+xDataMargin])
		.range([0, width]);
	var y = d3.scale.linear()
		.domain([bMin-yDataMargin, bMax+yDataMargin])
		.range([height, 0]);

	var xAxis = d3.svg.axis()
		.scale(x);
	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

	var plot = svg.append("g")
		.attr("class", "plot")
		.attr("transform", "translate("+margin.left+", "+margin.top+")");

	console.log(plot);

	plot.append("g")
		.attr("class", "axis x")
		.attr("transform", "translate(0, "+ height +")")
		.call(xAxis);
		
	plot.select(".axis.x")
		.append("text")
			.attr("class", "axislabel")
			.attr("dx", width/20)
			.attr("dy", 35)
			.text("down");

	plot.select(".axis.x")
		.append("text")
			.attr("class", "axislabel")
			.attr("dx", width*19/20)
			.attr("dy", 38)
			.text("up");

	plot.select(".axis.y")
		.append("text")
			.attr("transform", "rotate(-90)")
			.attr("class", "axislabel")
			.attr("dy", height*19/20)
			.attr("dx", 20)
			.text("good");

	console.log(plot);

	plot.append("g")
		.attr("class", "axis y")
		.attr("transform", "translate(0, 0)")
		.call(yAxis);
		
	var elem = plot.selectAll("plot")
		.data(testpoints);

	var elemEnter = elem.enter()
		.append("g")
		.attr("transform", function(d) { 
			return "translate("+x(d.a_axis)+","+y(d.b_axis)+")"; 
		});

	elemEnter.append("circle")
		.attr("class", "point")
		.attr("r", 1.75);

	elemEnter.append("text")
		.attr("class", "pointlabel")
        .text(function(d){return d.word})
        .attr("dx", 4);
}
