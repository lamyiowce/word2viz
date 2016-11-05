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

	// Data plot selection
	var chooseDiv = d3.select("body")
		.append("div");

	chooseDiv.append("div").append("text")
		.text("What do you want to see?");

	var wybor = chooseDiv
		.append("div")
		.append('select')
		.attr('id', 'dataSelect')
		.on('change', function (x, y) {
			currentExample = getParsedExample(vecs,
				rawData.filter(function(obj) {
					return obj.id == d3.select("#dataSelect").node().value;
			})[0]);
			currentPoints = getWithAxesJson(vecs, currentExample);
			plot.updatePlot(currentPoints, currentExample);
		});

	for (var i = 0; i < rawData.length; i++) {
		wybor.append('option')
			.attr('value', rawData[i].id)
			.text(rawData[i].name);
	}

	var currentExample = getParsedExample(vecs,
		rawData.filter(function(obj) {
			return obj.id == d3.select("#dataSelect").node().value;
	})[0]);

	var currentPoints = getWithAxesJson(vecs, currentExample);

	console.log(currentExample);

 // Add words
	var addWordDiv = d3.select("body")
		.append("div")
		.style("float", "right");

	addWordDiv.append("input")
		.attr("type", "text")
		.attr("name", "addWordInput")
		.attr("id", "addWordInput")

	document.getElementById("addWordInput")
		.addEventListener("keyup", function(event) {
	    event.preventDefault();
	    if (event.keyCode == 13) {
	        document.getElementById("addButton").click();
	    }
		});

	addWordDiv.append("input")
		.attr("name", "addButton")
		.attr("type", "button")
		.attr("value", "Add word")
		.attr("id", "addButton")
		.on("click", function() {
			var newWord = d3.select("#addWordInput").node().value;
			console.log(newWord);
			if (!(newWord in vecs)) {
				addWordError.text("Word " + newWord + " not in dictionary.")
					.style("display", "");
			}
			else {
				d3.select("#addWordInput").node().value = "";
				addWordError.style("display", "hidden");
				currentExample.words.push([newWord]);
				currentExample.flat[newWord] = currentExample.groupsNumber++;
				console.log(currentExample);
				plot.updatePlot(getWithAxesJson(vecs, currentExample), currentExample);
			}
		});

	var addWordError = addWordDiv.append("text")
		.style("display", "hidden");

	var plot = new Plot("body", currentPoints, currentExample);
}
