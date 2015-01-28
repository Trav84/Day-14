/* jshint devel:true */
$(document).ready(onReady);

function onReady() {

	var rowTemplate = _.template("<tr class=entry data-id=' <%= ref %>' > <td> <%= Title %> </td> <td> <%= Year %> </td> </tr>");
	var toWatchArray = [];
	var watchedMovieArray = [];
	getSavedLists();

		function postSavedLists(movieArray) {

			if(movieArray == 'toWatchArray') {
				$.post(
					'http://tiny-pizza-server.herokuapp.com/collections/travisMovieDB',
					{
						storedMovie: toWatchArray,
			 		},
			 		'json'
					);
				} else {

					$.post(
					'http://tiny-pizza-server.herokuapp.com/collections/travisMovieDB',
					{
						storedMovie: watchedMovieArray,
			 		},
			 		'json'
					);
				}
				}		

		 function getSavedLists() {

		 	$.get(
		 		'http://tiny-pizza-server.herokuapp.com/collections/travisMovieDB',
		 		function(movies) {
		 			for(var key in movies) {
						$('.watch-list').append('<tr> '+movies[key].storedMovie+' </tr>');
					}
		 		},
		 		'json'
		 		);
		}

		function deleteSavedLists() {

			var idArray = [];

			$.get(
		 		'http://tiny-pizza-server.herokuapp.com/collections/travisMovieDB',
		 		function(movies) {
		 			for(var key in movies) {
						idArray.push(movies[key]._id);
						console.log(movies[key]._id);
					}

					for(var key in idArray) {
						console.log('http://tiny-pizza-server.herokuapp.com/collections/travisMovieDB/'+idArray[key]);
						$.ajax({
				    		url: 'http://tiny-pizza-server.herokuapp.com/collections/travisMovieDB/'+idArray[key],
				    		type: 'DELETE',
						});
					}
		 		},
		 		'json'
		 	);
		}

	// local storage code, sitched to Tiny Pizza Server
	// var storedToWatch = [];
	// var storedWatched = [];
	// var restoredResults = JSON.parse(localStorage.getItem('storedToWatch'));

	$('.myButton').click(function() {
		$('.entry').html('');
		searchMovie($('#searchBox').val());
	});

	$('.clearSaved').click(function() {
		deleteSavedLists();
	});

	function searchMovie(query) {
		$.get(
			'http://www.omdbapi.com/',	
			{
				s: query,
			},
			onResults,
			'json'
		);
	};

	// local storage code, sitched to Tiny Pizza Server
	// for(var key in restoredResults) {
	// 	$('.watch-list').append('<tr class="added"> <td>'+restoredResults[key].Title+' </td> <td> '+restoredResults[key].Year+' </td> </tr>');	
	// }

	function onResults(data) {

		var x = 0;
		var idArray = [];

		for(var key in data.Search) {
			idArray.push(data.Search[key].imdbID);
		}

		// $.get(
		// 	'http://www.omdbapi.com/',
		// 	{
		// 		i: idArray,
		// 	},
		// 	onResults, 
		// 	'json'
		// );

		for(var key in data.Search) {
			data.Search[key].ref = key;
			$('.table').append(rowTemplate(data.Search[key]));
		}

		$('.entry').click(function() {
			
			toWatchArray[0] = $(this).html();
			watchedMovieArray[0] = $('watched-list').html();
			postSavedLists(toWatchArray);
			postSavedLists(watchedMovieArray);

			// local storage code, sitched to Tiny Pizza Server
			
			// var id = $(this).data('id');
			// id = parseInt(id);

			// storedToWatch.push(data.Search[id]);

			x++;
			//localStorage.setItem('storedToWatch', JSON.stringify(storedToWatch));

			$('.watch-list').append('<tr class="added">'+toWatchArray[0]+'</tr>');
			$(this).html('');		
			
				$('.added').click(function() {
					var movieArray = [];
					movieArray[0] = $(this).html();
					$('.watched-list').append('<tr>'+movieArray[0]+'</tr>');
					$(this).html('');
				});	
		});	
	}

	
	





	// In Class Assignments

	var people = [
    {firstName: 'Aaron', lastName: 'Larner', type: 'Instructor'},
    {firstName: 'Alex', lastName: 'Hidalgo', type: 'Student'},
    {firstName: 'Charlie', lastName: 'Lueker', type: 'Student'},
    {firstName: 'Daniel', lastName: 'St. Clair', type: 'Student'},
    {firstName: 'Erika', lastName: 'Moller', type: 'Student'},
    {firstName: 'Gabe', lastName: 'Rubio', type: 'Student'},
    {firstName: 'Hughie', lastName: 'Devore', type: 'Student'},
    {firstName: 'Jacob', lastName: 'Burkhart', type: 'Student'},
    {firstName: 'Justin', lastName: 'Herrick', type: 'Instructor'},
    {firstName: 'Katlyn', lastName: 'Whittenburg', type: 'Campus Director'},
    {firstName: 'Nathan', lastName: 'Hall', type: 'Teaching Assistant'},
    {firstName: 'Paul', lastName: 'Kokoszyna', type: 'Student'},
    {firstName: 'Ryan', lastName: 'Luedecke', type: 'Student'},
    {firstName: 'Sam', lastName: 'Kapila', type: 'Instructor'},
    {firstName: 'Travis', lastName: 'Czerw', type: 'Student'}
	];
	
	var names = _.map(people, function(n)  {
		// return n.firstName+' '+n.lastName+' '+n.type 
		return {
			name: n.firstName+' '+n.lastName,
			type: n.type
		};
	});
	

	function character(name, charClass, weapon) {

		this.charName = name;
		this.charClass = charClass;
		this.charWeapon = weapon;
		this.attack = function(attackWhat) {
			var random = Math.random();
			if(random > 0.5) {
				return this.charName+" the mighty "+this.charClass+" swings wildly at the "+attackWhat+" with a "+this.charWeapon+" defeating it. Hurrah!";
			} else {
				return "You try and attack but the "+attackWhat+" gets the jump on you, horrifically mauling you. You are dead. Hurrah!";
			}
		};
		this.runAway = function() {
			return this.charName+" the mighty "+this.charClass+" runs away, dropping their "+this.charWeapon+" in flight";

		};
		this.walkOff = function () {
			return this.charName+" the mighty "+this.charClass+" walks off into the sunset heroically with their "+this.charWeapon+" strapped to their back";

		};
	}

	// travis = new character('Travis', 'Robot Overlord', 'Phone Book');
	// console.log(travis);
	// console.log(travis.attack('kitten'));
	// console.log(travis.runAway());
	// console.log(travis.walkOff());

	

}	

