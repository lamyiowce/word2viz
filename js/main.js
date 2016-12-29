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
	// console.log(rawData);

	// Data set selection
	var menuDiv = d3.select("#menu");
	var selectDiv = menuDiv.select("#selectDiv");

	var wybor = selectDiv.select('#dataSelect')
		.on('change', function (x, y) {
			currentExample = getParsedExample(vecs,
				rawData.filter(function(obj) {
					return obj.id == d3.select("#dataSelect").node().value;
			})[0]);
			d3.select("#Xaxis0").node().value = currentExample.xAxis[0];
			d3.select("#Xaxis1").node().value = currentExample.xAxis[1];
			d3.select("#Yaxis0").node().value = currentExample.yAxis[0];
			d3.select("#Yaxis1").node().value = currentExample.yAxis[1];
			currentPoints = getWithAxesJson(vecs, currentExample);
			updateExample(currentExample);
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
	var modifyDiv = menuDiv.select("#modifyDiv");

 // Adding single words
	document.getElementById("addWordInput")
		.addEventListener("keyup", function(event) {
	    event.preventDefault();
	    if (event.keyCode == 13) {
	        document.getElementById("addButton").click();
	    }
		});

	modifyDiv.select("#addButton")
		.on("click", function() {
			var newWord = d3.select("#addWordInput").node().value;
			if (!checkForErrors([newWord])) {
					d3.select("#addWordInput").node().value = "";
					currentExample.flat[newWord] = currentExample.groupsNumber++;
					updateExample(currentExample);
			}
		});

	// Adding a pair
	document.getElementById("addPairInput1")
		.addEventListener("keyup", function(event) {
	    event.preventDefault();
	    if (event.keyCode == 13) {
	        document.getElementById("addPairButton").click();
	    }
		});

	document.getElementById("addPairInput2")
		.addEventListener("keyup", function(event) {
			event.preventDefault();
			if (event.keyCode == 13) {
					document.getElementById("addPairButton").click();
			}
		});

	modifyDiv.select("#addPairButton")
		.on("click", function() {
			var newWord1 = d3.select("#addPairInput1").node().value;
			var newWord2 = d3.select("#addPairInput2").node().value;
			if (!checkForErrors([newWord1, newWord2])) {
				d3.select("#addPairInput1").node().value = "";
				d3.select("#addPairInput2").node().value = "";
				currentExample.flat[newWord2] = currentExample.groupsNumber;
				currentExample.flat[newWord1] = currentExample.groupsNumber++;
				updateExample(currentExample);
			}
		});

	// axis changing
	var changeXDiv = modifyDiv.select("#changeAxesDiv");
	changeXDiv.select("#Xaxis1")
		.attr("value", currentExample.xAxis[1]);
		console.log("should have changed x axis 1 to " + currentExample.xAxis[1]);
	changeXDiv.select("#Xaxis0")
		.attr("value", currentExample.xAxis[0]);

	var changeYDiv = modifyDiv.select("#changeAxesDiv");
	changeYDiv.select("#Yaxis1")
		.attr("value", currentExample.yAxis[1]);
	changeYDiv.select("#Yaxis0")
		.attr("value", currentExample.yAxis[0]);

	["Xaxis1","Xaxis0","Yaxis1","Yaxis0"].forEach(function (id) {
		document.getElementById(id)
			.addEventListener("keyup", function(event) {
				event.preventDefault();
				if (event.keyCode == 13) {
						document.getElementById("changeAxesButton").click();
				}
			});
	});

	modifyDiv.select("#changeAxesButton")
		.on("click", function() {
			var x1 = d3.select("#Xaxis1").node().value;
			var x0 = d3.select("#Xaxis0").node().value;
			var y1 = d3.select("#Yaxis1").node().value;
			var y0 = d3.select("#Yaxis0").node().value;
			if (!checkForErrors([x0, x1, y0, y1])) {
				currentExample.xAxis[0] = x0;
				currentExample.xAxis[1] = x1;
				currentExample.yAxis[0] = y0;
				currentExample.yAxis[1] = y1;
				updateExample(currentExample);
			}
		});

// Word adding error display
	var addWordError = modifyDiv.select("#errorDiv");
	var errorText = addWordError.append("text");

// Chcecking words for errors

	function checkForErrors (newWordsList) {
		var errorMsg = "";
		newWordsList.forEach (function (newWord) {
			if (newWord.length == 0) {
				errorMsg = errorMsg + "\nEnter a non-empty word.";
			}
			else if (!(newWord in vecs)) {
				errorMsg = errorMsg + "\nWord \"" + newWord + "\" not in the dictionary.";
			}
		})
		errorText.text(errorMsg);
		if (errorMsg.length == 0) {
			addWordError.style("display", "none");
			return false;
		}
		else {
			addWordError.style("display", "");
			return true;
		}
}

	var plot = new Plot("plotDiv", currentPoints, currentExample);
	updateExample(currentExample);

	// plot updating
	function updateExample() {
		plot.updatePlot(getWithAxesJson(vecs, currentExample), currentExample);

		// point deletion
		d3.selectAll(".pointlabel")
			.on("dblclick", function (d) {
				for(var word in currentExample.flat) {
	    		if(currentExample.flat.hasOwnProperty(word) && currentExample.flat[word] == d.group) {
	        	delete currentExample.flat[word];
					}
				}
				updateExample(currentExample);
			});
	}

}
