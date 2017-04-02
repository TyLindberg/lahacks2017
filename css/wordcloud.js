(function($) {
	var testcloudcontainer = document.createElement('div');
	document.getElementById('wordcloud-carousel').appendChild(testcloudcontainer);

	var testcloud = new d3.layout.cloud();

	testcloud.words(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n']);
	testcloudcontainer.appendChild(testcloud);

	testcloud.start();
})(jQuery);