"use strict";

d3.csv("/data/minimal.50d.3f.csv", callback);

var vecs = {};

function callback(data) { 
	
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
	/*console.log(getWithAxes(vecs, 
		["good", "bad", "fast", "slow", "up", "down"], 
		subtract(vecs["up"], vecs["down"]), 
		subtract(vecs["good"], vecs["bad"])));
*/
	d3.json("exampleData.json",callback1);
}

function callback1(exampleData) {
	console.log(exampleData);
	var initialPoints = getWithAxesJson(vecs, exampleData[1]);
	console.log(initialPoints);
	var plot = new Plot("body", initialPoints, exampleData[1]);

	var wybor = d3.select("body").append('select')
		.attr('id', 'dataSelect')
		.on('change', function (x, y) {
			var newPlotData = exampleData.filter(function(obj) { 
				return obj.id == d3.select("#dataSelect").node().value; 
			})[0];
			var newPlotPoints = getWithAxes(vecs, newPlotData);	
			plot.makePlot(newPlotPoints, newPlotData);
		});

	for (var i = 0; i < exampleData.length; i++) {
		wybor.append('option')
			.attr('value', exampleData[i].id)
			.text(exampleData[i].name);
	}
}