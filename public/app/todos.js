
$(document).on('ready', function(){
  // render the form
	$('<div></div>').text('Add a new todo item!').appendTo('.container');
	$('<div></div>').append('<form method ="POST"><input type="input" name="todo"></input></form>').appendTo('.container');
  
  //request existing todos
  var getTodos = function(){
  	$.ajax('http://127.0.0.1:8080/all/todos', {
      success: function(data){
        renderTodos(data);
        startApp(data);
      },
      error: function(){
        console.log('error!');
      }
  	})
  };
  
  var renderTodos = function(data){
    $('.listContainer').html('');
    for (var i = 0; i < data.itemList.length; i++){
    	$('<li></li>').text(data.itemList[i].todoItem)
    	              .appendTo('.listContainer');
    }
  };

  var startApp = function(data){
    var myTodos = new List(data.itemList);
    var myApp = new App({myTodos: myTodos});
    console.log(myApp);
  }

  getTodos();
});