(function($) {
	var data = [
	  {
	    x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
	    y: [1, 3, 6],
	    type: 'scatter'
	  }
	];

	Plotly.newPlot('search-histogram', data);

    $('#search-button').on('click', function(e) {
        
        $.ajax({
            method: "POST",
            url: "filler",
            data: { searchterm: $('#submit-message').val() }
        })
            .done(function(msg) {
                console.log("Search Sent");
                // Fill in here
            });
    });
})(jQuery);