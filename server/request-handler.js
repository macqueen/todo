var express = require('express');
var fs = require('fs');
var mongoHandlers = require('./mongo-requests')

var exp = module.exports.handleRequest = express();
var filePath = '/Users/Jess/Documents/hack_reactor/todo'
var todos = [];

exp.use(express.bodyParser());

exp.get('/', function(req, res){
  fs.readFile(filePath + '/public/index.html', function(error, content){
  	if(!error){
  		res.set('Content-Type', 'text/html');
  		res.send(200, content);
  	} else {
  		res.send(500, error);
  	}
  });
});

exp.get('/app/todos.js', function(req, res){
  fs.readFile(filePath + '/public/app/todos.js', function(error, content){
  	if(!error){
  		res.set('Content-Type', 'application/javascript');
  		res.send(200, content);
  	} else {
  		res.send(500, error);
  	}
  });
});

// exp.post('/', function(req, res){
// 	todos.push(req.body.todo);
// 	res.redirect('/');
//   res.send(200);
// })

exp.post('/', mongoHandlers.insertTodo);