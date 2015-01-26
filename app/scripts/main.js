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

		var i = 0;
		//$('#resultBox').val(data.Search[0].Title);
		//$('#table1-1').html(data.Search[0].Title);
		//$('#table1-2').html(data.Search[0].Year);

		for(var key in data.Search) {
			$('.table').append('<tr> <td>'+data.Search[i].Title+'</td> <td>'+data.Search[i].Year+'</td> </tr>');
			i++;
			console.log(data.Search[i]);
		}

		
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
		//$('#resultBox').val(searchMovie($('#searchBox').val()));
		searchMovie($('#searchBox').val());
	});
}	

