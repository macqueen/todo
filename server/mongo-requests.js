var mongodb = require('mongodb');
var server = new mongodb.Server('127.0.0.1', 27017);

var client = new mongodb.Db('todos', server, {w: 1});
var todo_items;

client.open(function(error, p_client){
	client.createCollection('todo_items', function(error, collection){
    todo_items = collection;
	});
	console.log('client open');
});

module.exports.insertTodo = function(req, res){
	var item = {
    todoItem: req.body.todo,
    status: 'open'
	};
	todo_items.insert(item, {safe: true}, function(error, docs){
		console.log('inserted document: ', docs);
		if(error){
			//console.log(error);
		}
	});
	res.redirect('/');
	res.send(200);
};