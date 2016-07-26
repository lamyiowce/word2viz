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
/*	var data = data.map(function(row) {
		var vec = [];
		for (var key in row) {
			if (key !== "0") {
				vec.push(+row[key]);
			}
		}
		return {word: row[0], v: vec};

	});*/
	console.log(vecs);
	console.log(vecs["chair"]);
	console.log("initianrere");
	var wordlist = Object.keys(vecs);
	console.log(dotAll(vecs["chair"], vecs));
	for (var i = 0; i < 10; i++) {
		console.log(dotAll(vecs[wordlist[i]], vecs));
	}
	console.log("do idzenia")

}

function dot(a, b)
{
	var ret = 0;
	for (var i = 0; i < a.length; i++) {
		ret += a[i]*b[i];
	}
	return ret;
}

function vlen(a)
{
	var ret = 0;
	for (var i = 0; i < a.length; i++){}
}

function dotAll(a, vecs)
{
	var ret = [];
	var wordlist = Object.keys(vecs);
	for (var i = 0; i < wordlist.length; i++) {
		ret.push([wordlist[i], dot(a, vecs[wordlist[i]])]);
	}
	ret.sort(function(a, b) { return a[1] > b[1]})
	return ret.splice(0, 10);
}