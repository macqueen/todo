var mongodb = require('mongodb');
var server = new mongodb.Server('127.0.0.1', 27017);

var client = new mongodb.Db('todos', server, {w: 1});
var todo_items;

client.open(function(error, p_client){
	client.createCollection('todo_items', function(error, collection){
    todo_items = collection;
	});
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

module.exports.retrieveTodos = function(req, res){
	todo_items.find({status: "open"}, {_id: 0, todoItem: 1, status: 1}).toArray(function(error, results){
		if(!error){
			res.set('Content-Type', 'application/json');
			var resultsJSON = JSON.stringify({itemList: results});
			console.log(resultsJSON);
			res.send(200, resultsJSON);
		} else {
			res.send(500, error);
		}
	});
};