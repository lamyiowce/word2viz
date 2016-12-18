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
	var menuDiv = d3.select("body")
		.append("div")
		.style("float", "right")
		.style("width", "40%")
		.style("padding", "10px");


	var selectDiv = menuDiv.append("div");

	selectDiv.append("div").append("h3")
		.text("What do you want to see?");

	var wybor = selectDiv
		.append("div")
		.append('select')
		.attr('id', 'dataSelect')
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

	console.log(currentExample);

	// var menuDiv =  d3.select("body")
	// 	.append("div")
	// 	.style("float", "right");

 // Adding single words

	var addWordDiv = menuDiv.append("div");

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
			if (!checkForErrors([newWord])) {
					d3.select("#addWordInput").node().value = "";
					currentExample.flat[newWord] = currentExample.groupsNumber++;
					console.log(currentExample);
					updateExample(currentExample);
			}
		});

// Adding a pair

var addPairDiv = menuDiv.append("div");

	addPairDiv.append("input")
		.attr("type", "text")
		.attr("name", "addPairInput")
		.attr("id", "addPairInput1")
		.attr("class", "addPairInput");

	addPairDiv.append("input")
		.attr("type", "text")
		.attr("name", "addPairInput")
		.attr("id", "addPairInput2")
		.attr("class", "addPairInput");

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

	addPairDiv.append("input")
		.attr("name", "addPairButton")
		.attr("type", "button")
		.attr("value", "Add pair")
		.attr("id", "addPairButton")
		.on("click", function() {
			var newWord1 = d3.select("#addPairInput1").node().value;
			var newWord2 = d3.select("#addPairInput2").node().value;
			if (!checkForErrors([newWord1, newWord2])) {
				d3.select("#addPairInput1").node().value = "";
				d3.select("#addPairInput2").node().value = "";
				addWordError.style("visibility", "hidden");
				currentExample.flat[newWord2] = currentExample.groupsNumber;
				currentExample.flat[newWord1] = currentExample.groupsNumber++;
				console.log(currentExample);
				updateExample(currentExample);
			}
		});

// axis changing
	var changeAxesDiv = menuDiv.append("div");

	var changeXDiv = changeAxesDiv.append("div");

	changeXDiv.append("text")
		.text("X axis: ");

	changeXDiv.append("input")
		.attr("type", "text")
		.attr("name", "Xaxis1")
		.attr("id", "Xaxis1")
		.attr("value", currentExample.xAxis[1]);

	changeXDiv.append("input")
	.attr("type", "text")
	.attr("name", "Xaxis0")
	.attr("id", "Xaxis0")
	.attr("value", currentExample.xAxis[0]);

	var changeYDiv = changeAxesDiv.append("div");


	changeYDiv.append("text")
		.text("Y axis: ");

	changeYDiv.append("input")
	.attr("type", "text")
	.attr("name", "Yaxis1")
	.attr("id", "Yaxis1")
	.attr("value", currentExample.yAxis[1]);

	changeYDiv.append("input")
	.attr("type", "text")
	.attr("name", "Yaxis0")
	.attr("id", "Yaxis0")
	.attr("value", currentExample.yAxis[0]);

	changeAxesDiv.append("input")
		.attr("name", "changeAxesButton")
		.attr("type", "button")
		.attr("value", "Change axes labels")
		.attr("id", "changeAxesButton")
		.style("float", "right")
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
				console.log(currentExample);
				updateExample(currentExample);
			}
		});

	// word adding error display
	var addWordError = menuDiv.append("text")
		.style("visibility", "hidden");

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
		addWordError.text(errorMsg);
		if (errorMsg.length == 0) {
			addWordError.style("visibility", "hidden");
			return false;
		}
		else {
			addWordError.style("visibility", "");
			return true;
		}
}

	var plot = new Plot("body", currentPoints, currentExample);
	updateExample(currentExample);

	// plot updating
	function updateExample() {
		plot.updatePlot(getWithAxesJson(vecs, currentExample), currentExample);

		// point deletion
		d3.selectAll(".pointlabel")
			.on("dblclick", function (d) {
				console.log(d);
				for(var word in currentExample.flat) {
	    		if(currentExample.flat.hasOwnProperty(word) && currentExample.flat[word] == d.group) {
	        	delete currentExample.flat[word];
					}
				}
				updateExample(currentExample);
			});
	}

}
