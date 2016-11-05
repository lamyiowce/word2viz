/*
function getParsedData(vecs, exampleData) {
	var wordlist = Object.keys(vecs);
	for (var i =0;i < exampleData.length; i++) {
		if (exampleData[i].words.length > 0) {
			exampleData[i]["flat"] = {};
			for (var j = 0; j < exampleData[i].words.length; j++) {
				for (var u = 0; u < exampleData[i].words[j].length; u++ ){
					if (!(exampleData[i].words[j][u] in vecs)){
						alert("No vector values for word " + exampleData[i].words[j][u]+"." );
					}
					else {
						exampleData[i].flat[exampleData[i].words[j][u]]= j;
					}
				}
			}
		}
		else {

			exampleData[i]["flat"] = {};
			var similarList = dotAllNorm(vecs,
				vecs[exampleData[i].findClosest.word],
				exampleData[i].findClosest.n);
			console.log("similar to god:" + similarList);
			var it = 0;
			for (word in similarList) {
				exampleData[i].flat[similarList[it][0]] = it;
				it++;
			}
		}
	}
	return exampleData;
}
*/

function getParsedExample(vecs, exampleData) {
	var wordlist = Object.keys(vecs);
	if (exampleData.words.length > 0) {
		exampleData["flat"] = {};
		for (var j = 0; j < exampleData.words.length; j++) {
			for (var u = 0; u < exampleData.words[j].length; u++) {
				if (!(exampleData.words[j][u] in vecs)) {
					alert("No vector values for word " + exampleData.words[j][u] + "." );
				}
				else {
					exampleData.flat[exampleData.words[j][u]] = j;
				}
			}
		}
	}
	else {
		exampleData["flat"] = {};
		var similarList = dotAllNorm(vecs,
			vecs[exampleData.findClosest.word],
			exampleData.findClosest.n);
		console.log("similar to " + exampleData.findClosest.word + ":" + similarList);
		var it = 0;
		for (word in similarList) {
			exampleData.flat[similarList[it][0]] = it;
			it++;
		}
	}
	return exampleData;
}
