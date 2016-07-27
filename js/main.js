d3.csv("/data/minimal.50d.3f.csv", callback);

function callback(data) { 
	console.log(data[0]);
	vecs = {};
	for (var i = 0; i < data.length; i++) {
		var vec = [];
		for (var key in data[i]) {
			if (key !== "0") {
				vec.push(+data[i][key]);
			}
		}
		vecs[data[i][0]] = vec;
	}
	wordlist = Object.keys(vecs);
	console.log(getWithAxes(vecs, 
		["good", "bad", "fast", "slow", "up", "down"], 
		substract(vecs["up"], vecs["down"]), 
		substract(vecs["good"], vecs["bad"])));

	

	var width = 800, height = 600;
	var margin = {top: 20, bottom: 20, left: 20, right: 20};
	var svg = d3.select("body")
		.append("svg")
		.attr("width", width)
		.attr("height", height);

	var ploth = 400, plotw = 400;

	

	testpoints = getWithAxes(vecs, 
		["good", "bad", "fast", "slow", "up", "down"], 
		substract(vecs["up"], vecs["down"]), 
		substract(vecs["good"], vecs["bad"]));
	
	var aMin = d3.min(testpoints, function(d) { return d.a_axis; })
	var aMax = d3.max(testpoints, function(d) { return d.a_axis; })
	var bMin = d3.min(testpoints, function(d) { return d.b_axis; })
	var bMax = d3.max(testpoints, function(d) { return d.b_axis; })
	
	var x = d3.scale.linear()
		.domain([aMin, aMax])
		.range([0, plotw]);
	var y = d3.scale.linear()
		.domain([bMin, bMax])
		.range([ploth, 0]);

	var xAxis = d3.svg.axis()
		.scale(x);

	var plot = svg.append("g")
		.attr("class", "plot")
		.attr("transform", "translate(20, 20)");

	plot.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0, 300)")
		.call(xAxis);
		
	var elem = plot.selectAll("plot")
		.data(testpoints);

	var elemEnter = elem.enter()
		.append("g")
		.attr("transform", function(d) { 
			return "translate("+x(d.a_axis)+","+y(d.b_axis)+")"; 
		});

	elemEnter.append("circle")
		.attr("class", "point")
		.attr("r", 1);

	elemEnter.append("text")
		.attr("class", "pointlabel")
        .text(function(d){return d.word})
        .attr("dx", 4);
}
