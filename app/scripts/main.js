/* jshint devel:true */
$(document).ready(onReady);

	var rowTemplate = _.template("<tr class=entry data-id=' <%= ref %>' > <td> <%= Title %> </td> <td> <%= Year %> </td> </tr>");

function onReady() {

	var storedToWatch = [];
	var storedWatched = [];
	var restoredResults = JSON.parse(localStorage.getItem('storedToWatch'));

	console.log(restoredResults);
	$('.myButton').click(function() {
		$('.entry').html('');
		searchMovie($('#searchBox').val());
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
	}

	for(var key in restoredResults) {
		$('.watch-list').append('<tr class="added"> <td>'+restoredResults[key].Title+' </td> <td> '+restoredResults[key].Year+' </td> </tr>');	
	}

	// // $.get(
	// // 		'http://www.omdbapi.com/',
	// // 		{
	// // 			i: 'tt1104001',
	// // 		},
	// // 		onResultsReceived, 
	// // 		'json'
	// // 		);


	// function onResultsReceived(data) {
	// 	console.log(data);
	// }

	function onResults(data) {

		var x = 0;


		for(var key in data.Search) {
			data.Search[key].ref = key;
			$('.table').append(rowTemplate(data.Search[key]));
		}

		$('.entry').click(function() {
			var movieArray = [];
			movieArray[0] = $(this).html();

			// local storage code
			
			var id = $(this).data('id');
			id = parseInt(id);

			storedToWatch.push(data.Search[id]);

			x++;
			localStorage.setItem('storedToWatch', JSON.stringify(storedToWatch));

			$('.watch-list').append('<tr class="added">'+movieArray[0]+'</tr>');
			$(this).html('');		
			
				$('.added').click(function() {
					var movieArray = [];
					movieArray[0] = $(this).html();
					$('.watched-list').append('<tr>'+movieArray[0]+'</tr>');
					$(this).html('');
					//$(this).css('text-decoration', 'line-through');
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

