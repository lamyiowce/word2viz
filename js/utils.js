
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
	for (var i = 0; i < a.length; i++)
	{
		a[i] = a[i] - b[i];
	}
	return a;
}

function dotAllNorm(vecs, a)
{
	var wordlist = Object.keys(vecs);

	var ret = [];
	for (var i = 0; i < wordlist.length; i++) {
		ret.push([wordlist[i], dotNorm(a, vecs[wordlist[i]])]);
	}
	ret.sort(function(a, b) { return b[1] - a[1]})
	return ret.splice(0, 10);
}

function getWithAxes(vecs, words, a, b)
{
	plotData = [];
	for (var i = 0; i < words.length; i++)
	{
		plotData.push({ 
			word: words[i], 
			a_axis: dotNorm(vecs[words[i]], a), 
			b_axis: dotNorm(vecs[words[i]], b) 
		});
	}
	return plotData;
}

function getWithAxesJson(vecs, jsonData)
{
	return getWithAxes(vecs, jsonData.words, 
		subtract(vecs[jsonData.xAxis[0]], vecs[jsonData.xAxis[1]]), 
		subtract(vecs[jsonData.yAxis[0]], vecs[jsonData.yAxis[1]]));
}