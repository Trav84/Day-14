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

		for(var key in data.Search) {
			$('.table').append('<tr class="entry"> <td>'+data.Search[i].Title+'</td> <td>'+data.Search[i].Year+'</td> </tr>');
			i++;
			console.log(data.Search[i]);
		}

		$('.entry').click(function() {
		var movieArray = [];
		movieArray[0] = $(this).html();
		$('.watch-list').append('<tr class="added">'+movieArray[0]+'</tr>');

		
		$('.added').click(function() {
		var movieArray = [];
		movieArray[0] = $(this).html();
		$('.watched-list').append('<tr>'+movieArray[0]+'</tr>');
		$(this).html('');
		});		
	});

		
	}

	function searchMovie(query) {
		$.get(
		'http://www.omdbapi.com/',
		{s: query},
		onResults,
		'json'
		);
	}

	$('.myButton').click(function() {
		$('.entry').html('');
		searchMovie($('#searchBox').val());
	});

	
	
}	

