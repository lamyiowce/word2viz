function Plot(selector, data, info) {
	var width = 600, height = 400;
	var margin = {top: 60, bottom: 60, left: 60, right: 60};
	var svg;
	var plot;
	var parent = selector;
    this.remove = function() {
    	svg.remove();
    }

    this.makePlot = function (data, info) {
    	console.log("initial: ", d3.select(parent));
    	svg = d3.select(parent)
			.append("svg")
			.attr("width", width+margin.left + margin.right)
			.attr("height", height+margin.top+ margin.bottom);

		plot = svg.append("g")
			.attr("id", "plot")
			.attr("transform", "translate("+margin.left+", "+margin.top+")");

    	var aMin = d3.min(data, function(d) { return d.a_axis; });
		var aMax = d3.max(data, function(d) { return d.a_axis; });
		var bMin = d3.min(data, function(d) { return d.b_axis; });
		var bMax = d3.max(data, function(d) { return d.b_axis; });
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

		var xAxisPlot = plot.append("g")
			.attr("class", "axis x")
			.attr("transform", "translate(0, "+ height +")")
			.call(xAxis);

		xAxisPlot.append("text")
				.attr("class", "axislabel")
				.attr("dx", width/40)
				.attr("dy", 38)
				.text(info.xAxis[1]);

		xAxisPlot.append("text")
				.attr("class", "axislabel")
				.attr("dx", width*39/40)
				.attr("dy", 38)
				.text(info.xAxis[0]);

		var yAxisPlot = plot.append("g")
			.attr("class", "axis y")
			.call(yAxis);

		yAxisPlot.append("text")
				.attr("transform", "rotate(-90)")
				.attr("class", "axislabel")
				.attr("dy", -38)
				.attr("dx", 0)
				.text(info.yAxis[0]);

		yAxisPlot.append("text")
				.attr("transform", "rotate(-90)")
				.attr("class", "axislabel")
				.attr("dy", -38)
				.attr("dx", -height*0.975)
				.text(info.yAxis[1]);

	/*	var elem = plot.selectAll("plot")
			.data(data);
*/
		console.log("plot: ", plot);

		var it = 0;
		var dataFiltered;
		var linkContainer = plot.append("g")
			.attr("id", "linkContainer");

		for (var j = 0; j < info.groupsNumber; j++) {
			dataFiltered = data.filter(function(d) { return d.group === j; });
			for(var i = 0; i < dataFiltered.length-1; i++) {
				linkContainer.append("line")
					.attr("class", "link")
					.attr("id", "link"+j)
					.attr("x1", x(dataFiltered[i].a_axis))
					.attr("x2", x(dataFiltered[i+1].a_axis))
					.attr("y1", y(dataFiltered[i].b_axis))
					.attr("y2", y(dataFiltered[i+1].b_axis));
			}
		}

		var elemEnter = plot.selectAll(".pointcontainer")
			.data(data)
			.enter()
			.append("g")
			.attr("class", "pointcontainer")
			.attr("transform", function(d) {
				return "translate("+x(d.a_axis)+","+y(d.b_axis)+")";
			});


		var links = linkContainer.selectAll(".link");

		var points = elemEnter.append("circle")
			.attr("class", "point")
			.attr("r", 1.75);

		var labels = elemEnter.append("text")
			.attr("class", "pointlabel")
	        .text(function(d){return d.word})
	        .attr("dx", 4)
	        .on('mouseover', function(d, i) {
	        	labels.attr("class", function (t, j) {
	        		return t.group == d.group ? "pointlabel" : "pointlabel unselected";
	        	})
	        	points.attr("class", function (t, j) {
	        		return t.group == d.group ? "point" : "point unselected";
	        	})
	        	links.attr("class", "link unselected");
	        	linkContainer.selectAll("#link"+d.group)
	        		.attr("class", "link selected");
	        })
	        .on('mouseout', function(d) {
	        	labels.attr("class", "pointlabel");
	        	points.attr("class", "point");
	        	links.attr("class", "link");
	        });
    }

	this.makePlot(data, info);

	this.updatePlot = function (data, info) {
		console.log(svg);
		svg.remove();
		this.makePlot(data, info);
	}
}
