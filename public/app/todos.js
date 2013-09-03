
$(document).on('ready', function(){
	$('<div></div>').text('Add a new todo item!').appendTo('.container');
	$('<div></div>').append('<form method ="POST"><input type="input" name="todo"></input></form>').appendTo('.container');
});