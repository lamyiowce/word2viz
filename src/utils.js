
function dot(a, b)
{
	var ret = 0;
	for (var i = 0; i < a.length; i++) {
		ret += a[i]*b[i];
	}
	return ret;
}

function dotNorm(a, b)
{
//	console.log("dotnorm a ", a);
//	console.log("b: ", b);
	var ret = 0;
	for (var i = 0; i < a.length; i++) {
		ret += a[i]*b[i]/(vlen(a)*vlen(b));
	}
	return ret;
}

function vlen(a)
{
	var ret = 0;
	for (var i = 0; i < a.length; i++){
		ret += a[i]*a[i];
	}
	return Math.sqrt(ret);
}

function subtract(a, b)
{
	var c = [];
	for (var i = 0; i < a.length; i++)
	{
		c.push(a[i] - b[i]);
	}
	return c;
}

function dotAllNorm(vecs, a, n = 10)
{
	var wordlist = Object.keys(vecs);
	var ret = [];
	for (var i = 0; i < wordlist.length; i++) {
		ret.push([wordlist[i], dotNorm(a, vecs[wordlist[i]])]);
	}
	ret.sort(function(a, b) { return b[1] - a[1]})
	return ret.splice(0, n);
}

function getWithAxes(vecs, words, a, b)
{
	wordsKeys = Object.keys(words);
	var plotData = [];
	for (var i = 0; i < wordsKeys.length; i++)
	{
		plotData.push({
			word: wordsKeys[i],
			a_axis: dotNorm(vecs[wordsKeys[i]], a),
			b_axis: dotNorm(vecs[wordsKeys[i]], b),
			group: words[wordsKeys[i]]
		});
	}
	return plotData;
}

function getWithAxesJson(vecs, jsonData)
{
	var a_axis = subtract(vecs[jsonData.xAxis[0]], vecs[jsonData.xAxis[1]]);
	var b_axis = subtract(vecs[jsonData.yAxis[0]], vecs[jsonData.yAxis[1]]);

	return getWithAxes(vecs, jsonData.flat, a_axis, b_axis);
}

function getVec(word)
{
	if (word in vecs) return word;
	else {
		alert("Word " + word + " not in data.")
		return [-1000];
	}
}
