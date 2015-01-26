/* jshint devel:true */
$(document).ready(onReady);

function onReady() {

	$.get(
		'http://www.omdbapi.com/?s=postman',
		onResultsReceived,
		'json'
		);

	function onResultsReceived(data) {
		console.log(data);
	}

	function onResults(data) {
		//$('#resultBox').val(data.Search[0].Title)
		//$('#resultBox').val(data)
		console.log(data)
	}

	function searchMovie(query) {
		$.get(
		'http://www.omdbapi.com/',
		{s: query},
		onResults,
		'json'
		);
	}

	$('.myButton').click(function(event) {
		//$('#resultBox').val($('#searchBox').val())
		searchMovie($('#searchBox').val());
		//searchMovie($('#searchBox').val());
	});
}	

