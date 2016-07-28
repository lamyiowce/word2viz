function Plot(selector, data, info) {
	var width = 400, height = 300;
	var margin = {top: 60, bottom: 60, left: 60, right: 40};
	var svg = d3.select(selector)
		.append("svg")
		.attr("width", width+margin.left + margin.right)
		.attr("height", height+margin.top+ margin.bottom);	

    this.remove = function() {
    	svg.remove();
    }

    this.makePlot = function (data, info) {
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

		var plot = svg.append("g")
			.attr("class", "plot")
			.attr("transform", "translate("+margin.left+", "+margin.top+")");

		plot.append("g")
			.attr("class", "axis x")
			.attr("transform", "translate(0, "+ height +")")
			.call(xAxis);
			
		plot.select(".axis.x")
			.append("text")
				.attr("class", "axislabel")
				.attr("dx", width/40)
				.attr("dy", 38)
				.text(info.xAxis[1]);

		plot.select(".axis.x")
			.append("text")
				.attr("class", "axislabel")
				.attr("dx", width*39/40)
				.attr("dy", 38)
				.text(info.xAxis[0]);

		plot.append("g")
			.attr("class", "axis y")
			.call(yAxis);

		plot.select(".axis.y")
			.append("text")
				.attr("transform", "rotate(-90)")
				.attr("class", "axislabel")
				.attr("dy", -38)
				.attr("dx", 0)
				.text(info.yAxis[0]);
		
		plot.select(".axis.y")
			.append("text")
				.attr("transform", "rotate(-90)")
				.attr("class", "axislabel")
				.attr("dy", -38)
				.attr("dx", -height*0.975)
				.text(info.yAxis[1]);

	/*	var elem = plot.selectAll("plot")
			.data(data);
*/
		console.log("plot: ", plot);

		console.log("elem: ", elem);

		var elemEnter = elem.selectAll("g")
			.enter()
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

	this.makePlot(data, info);
}