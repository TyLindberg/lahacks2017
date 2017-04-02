(function($) {
	var index = 0;
	nameset = [];
	var wordset = [];
	var fontsizeset = [];

	var fill = d3.scale.category20();

	var layout = d3.layout.cloud()
	    .size([500, 500])
	    .words([])
	    .padding(5)
	    .rotate(function() { return ~~(Math.random() * 2) * 90; })
	    .font("Impact")
	    .fontSize([])
	    .on("end", draw);

	layout.start();

	function draw(words) {
	  d3.select("#wordcloud").append("svg")
	      .attr("width", layout.size()[0])
	      .attr("height", layout.size()[1])
	    .append("g")
	      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
	    .selectAll("text")
	      .data(words)
	    .enter().append("text")
	      .style("font-size", function(d) { return d.size + "px"; })
	      .style("font-family", "Impact")
	      .style("fill", function(d, i) { return fill(i); })
	      .attr("text-anchor", "middle")
	      .attr("transform", function(d) {
	        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
	      })
	      .text(function(d) { return d.text; });
	}

	for(var person in peoplejson) {
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
		nameset.append(person.name);
		wordset.append(person.words);
		wordset.append(scalefonts(person.weights));

		index += 1;
	}

	var numpeople = index;
	index = 0;

	function updatewords() {
		layout.words(wordset[index]);
		layout.fontSize(fontsizeset[index]);
		$("#wordcloud-name").val(nameset[index]);
		index = (index + 1) % numpeople;

		layout.start();
	}

	setInterval(updatewords(), 3000);

})(jQuery);

function scalefonts(weights) {
	var result = [];
	for(var weight in weights) {
		result.append(10 + weight * 90);
	}
	return result;
}