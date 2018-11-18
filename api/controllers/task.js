 'use strict';
	// Include our "db"
	var db = require('../../config/db')();
    // Exports all the functions to perform on the db
	module.exports = {getAll, save, getOne, update, delTask};
    
	//GET /task operationId
	function getAll(req, res, next) {
      res.json({ tasks: db.find()});
    }
	//POST /task operationId
	function save(req, res, next) {
		res.json({success: db.save(req.body), description: "Task added to the list!"});
	}
	//GET /task/{id} operationId
	function getOne(req, res, next) {
		var id = req.swagger.params.id.value; //req.swagger contains the path parameters
		var task = db.find(id);
		if(task) {
			res.json(task);
		}else {
			res.status(204).send();
		}		
	}
	//PUT /task/{id} operationId
	function update(req, res, next) {
		var id = req.swagger.params.id.value; //req.swagger contains the path parameters
		var task = req.body;
		if(db.update(id, task)){
			res.json({success: 1, description: "Task updated!"});
		}else{
			res.status(204).send();
		}
		
	}
	//DELETE /task/{id} operationId
	function delTask(req, res, next) {
		var id = req.swagger.params.id.value; //req.swagger contains the path parameters
		if(db.remove(id)){
			res.json({success: 1, description: "Task deleted!"});
		}else{
			res.status(204).send();
		}
		
	}