(function($) {
	// var peoplejson;

	// $.getJSON('js/data22.json', function(data) {
	// 	peoplejson = data;
	// });

	var index = 0;
	var nameset = [];
	var wordset = [];
	var fontsizeset = [];
	var wordsizeset = [];

	// var fill = d3.scale.category20();

	for(index = 0; index < peoplejson.length; index++) {
		// var newcloud = document.createElement('div');
		// document.getElementsByClassName('carousel-inner')[0].appendChild(newcloud);
		// newcloud.id = "cloud-container" + str(index);
		// newcloud.className = "carousel-item";
		// if(index = 0) {
		// 	newcloud.className += "active";
		// }
		// var nametitle = document.createElement('h2');
		// newcloud.appenchild(nametitle);

		// var newindicator = document.createElement('li');
		// newindicator.setAttribute("data-target", "#cloud-carousel");
		// newindicator.setAttribute("data-slide-to", str(index));
		// if(index = 0) {
		// 	newindicator.className += "active";
		// }
		// document.getElementsByClassName('carousel-indicators')[0].appenchild(newindicator);
		nameset.push(peoplejson[index].name);
		wordset.push(peoplejson[index].words);
		fontsizeset.push(scalefonts(peoplejson[index].weights));
		var wordsize = [];
		var k;
		for(k = 0; k < wordset[index].length; k++) {
			wordsize.push({text: wordset[index][k],
				size: fontsizeset[index][k]});
		}
		wordsizeset.push(wordsize);
	}

	var numpeople = index;
	index = 0;

		// Encapsulate the word cloud functionality
	function wordCloud(selector) {

	    var fill = d3.scale.category20();

	    //Construct the word cloud's SVG element
	    var svg = d3.select(selector).append("svg")
	        .attr("width", Math.min(window.innerWidth - 20, 500))
	        .attr("height", 500)
	        .append("g")
	        .attr("transform", "translate(" + parseInt(Math.min(window.innerWidth - 40, 500)) / 2 + ",250)");


	    //Draw the word cloud
	    function draw(words) {
	        var cloud = svg.selectAll("g text")
	                        .data(words, function(d) { return d.text; })

	        //Entering words
	        cloud.enter()
	            .append("text")
	            .style("font-family", "Impact")
	            .style("fill", function(d, i) { return fill(i); })
	            .attr("text-anchor", "middle")
	            .attr('font-size', 1)
	            .text(function(d) { return d.text; });

	        //Entering and existing words
	        cloud
	            .transition()
	                .duration(600)
	                .style("font-size", function(d) { return d.size + "px"; })
	                .attr("transform", function(d) {
	                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
	                })
	                .style("fill-opacity", 1);

	        //Exiting words
	        cloud.exit()
	            .transition()
	                .duration(200)
	                .style('fill-opacity', 1e-6)
	                .attr('font-size', 1)
	                .remove();
	    }


	    //Use the module pattern to encapsulate the visualisation code. We'll
	    // expose only the parts that need to be public.
	    return {

	        //Recompute the word cloud for a new set of words. This method will
	        // asycnhronously call draw when the layout has been computed.
	        //The outside world will need to call this function, so make it part
	        // of the wordCloud return value.
	        update: function(words) {
	            d3.layout.cloud().size([Math.min(window.innerWidth - 20, 500), 500])
	                .words(words)
	                .padding(5)
	                .rotate(function() { return (Math.random() * 3.0) * 45.0; })
	                .font("Impact")
	                .fontSize(function(d) { return d.size; })
	                .timeInterval(0.06)
	                .on("end", draw)
	                .start();
	        }
	    }

	}

	//Some sample data - http://en.wikiquote.org/wiki/Opening_lines
	// var words = [
	//     "You don't know about me without you have read a book called The Adventures of Tom Sawyer but that ain't no matter.",
	//     "The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.",
	//     "When Mr. Bilbo Baggins of Bag End announced that he would shortly be celebrating his eleventy-first birthday with a party of special magnificence, there was much talk and excitement in Hobbiton.",
	//     "It was inevitable: the scent of bitter almonds always reminded him of the fate of unrequited love."
	// ]

	//Prepare one of the sample sentences by removing punctuation,
	// creating an array of words and computing a random size attribute.
	function getWords(i) {
		return wordsizeset[i];
	    // return words[i]
	    //         .replace(/[!\.,:;\?]/g, '')
	    //         .split(' ')
	    //         .map(function(d) {
	    //             return {text: d, size: 10 + Math.random() * 60};
	    //         })
	}

	//This method tells the word cloud to redraw with a new set of words.
	//In reality the new words would probably come from a server request,
	// user input or some other source.
	function showNewWords(vis, i) {
	    i = i || 0;

	    vis.update(getWords(i ++ % wordsizeset.length));
	    $("#wordcloud-name").text(nameset[i%wordsizeset.length]);
	    setTimeout(function() { showNewWords(vis, i + 1)}, 5000);
	}

	//Create a new instance of the word cloud visualisation.
	var myWordCloud = wordCloud('#wordcloud');

	//Start cycling through the demo data
	showNewWords(myWordCloud);

	// var layout = d3.layout.cloud()
	//     .size([500, 500])
	//     .words(wordset[0])
	//     .padding(5)
	//     .rotate(function() { return ~~(Math.random() * 2) * 90; })
	//     .font("Impact")
	//     .fontSize(fontsizeset[0])
	//     .on("end", draw);

	// layout.start();

	// function draw(words) {
	//   d3.select("#wordcloud-svg")
	//       .attr("width", layout.size()[0])
	//       .attr("height", layout.size()[1])
	//     .select("g")
	//       .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
	//     .selectAll("text")
	//       .data(words)
	//     .enter().append("text")
	//       .style("font-size", function(d) { return d.size + "px"; })
	//       .style("font-family", "Impact")
	//       .style("fill", function(d, i) { return fill(i); })
	//       .attr("text-anchor", "middle")
	//       .attr("transform", function(d) {
	//         return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
	//       })
	//       .text(function(d) { return d.text; });
	// }

	// function updatewords() {
	// 	layout.words(wordset[index]);
	// 	layout.fontSize(fontsizeset[index]);
	// 	$("#wordcloud-name").val(nameset[index]);
	// 	index = (index + 1) % numpeople;

	// 	layout.start();
	// }

	// setInterval(updatewords(), 3000);

})(jQuery);

function scalefonts(weights) {
	var result = [];
	var k = 0;
	for(k = 0; k < weights.length; k++) {
		result.push(Math.round(10 + weights[k] * 90));
	}
	return result;
}