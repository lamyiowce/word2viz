"use strict";

d3.csv("/data/minimal.50d.3f.csv", callback);

var vecs = {};

function callback(data) {
	console.log("Loaded vector data.");
	for (var i = 0; i < data.length; i++) {
		var vec = [];
		for (var key in data[i]) {
			if (key !== "0") {
				vec.push(+data[i][key]);
			}
		}
		vecs[data[i][0]] = vec;
	}
	d3.json("exampleData.json",callback1);
}

function callback1(errors, rawData) {
	console.log(errors);
	console.log(rawData);

	var chooseDiv = d3.select("body")
		.append("div");

	chooseDiv.append("div").append("text")
		.text("What do you want to see?");

	var wybor = chooseDiv
		.append("div")
		.append('select')
		.attr('id', 'dataSelect')
		.on('change', function (x, y) {
			var newPlotData = getParsedExample(vecs,
				rawData.filter(function(obj) {
					return obj.id == d3.select("#dataSelect").node().value;
			})[0]);

			var newPlotPoints = getWithAxesJson(vecs, newPlotData);
				plot.updatePlot(newPlotPoints, newPlotData);
		});

	for (var i = 0; i < rawData.length; i++) {
		wybor.append('option')
			.attr('value', rawData[i].id)
			.text(rawData[i].name);
	}

	var initialExample = getParsedExample(vecs,
		rawData.filter(function(obj) {
			return obj.id == d3.select("#dataSelect").node().value;
	})[0]);

	var initialPoints = getWithAxesJson(vecs, initialExample);
	var plot = new Plot("body", initialPoints, initialExample);
}
