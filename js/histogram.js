(function($) {
	var datavals = [
	  {
	    x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
	    y: [0, 0, 0],
	    type: 'scatter'
	  }
	];

	var data2 = [
	  {
	    x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
	    y: [4, 2, 4],
	    type: 'scatter'
	  }
	];

	Plotly.newPlot('search-histogram', datavals);

    $('#search-button').on('click', function(e) {

    	var friendname = $("#friend-entry").val();

    	var i = 0;
    	for (i = 0; i < sentimentjson.length; i++) {
    		if(sentimentjson[i].name.includes(friendname)) {
    			break;
    		}
    	}

    	if(i === sentimentjson.length) return;

    	datavals[0].x = sentimentjson[i].dates;
    	datavals[0].y = sentimentjson[i]["sentiment values"];
        
    	Plotly.animate('search-histogram', {
    		data: datavals,
    		traces: [0],
    		layout: {}
    	}, {
    		transition: {
    			duration: 500,
    			easing: 'cubic-in-out'
    		}
    	});

    	Plotly.relayout('search-histogram', {
            'xaxis.autorange': true,
            'yaxis.autorange': true
        });

        $('#friend-entry').focus();
        $('#friend-entry').select();
    });
})(jQuery);