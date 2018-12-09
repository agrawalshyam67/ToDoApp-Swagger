 'use strict';
	// Include our "db"
	var db = require('../../config/db')();
    // Exports all the functions to perform on the db
	module.exports = {getAllTasks, save, getOneTask, update, delTask};
    
	//GET /tasks operationId
	function getAllTasks(req, res, next) {
      res.json({ tasks: db.find()});
    }
	//POST /tasks operationId
	function save(req, res, next) {
		res.json({success: db.save(req.body), description: "Task added to the list!"});
	}
	//GET /tasks/{id} operationId
	function getOneTask(req, res, next) {
		var id = req.swagger.params.id.value; //req.swagger contains the path parameters
		var task = db.find(id);
		if(task) {
			res.json(task);
		}else {
			res.status(204).send();
		}		
	}
	//PUT /tasks/{id} operationId
	function update(req, res, next) {
		var id = req.swagger.params.id.value; //req.swagger contains the path parameters
		var task = req.body;
		if(db.update(id, task)){
			res.json({success: 1, description: "Task updated!"});
		}else{
			res.status(204).send();
		}
		
	}
	//DELETE /tasks/{id} operationId
	function delTask(req, res, next) {
		var id = req.swagger.params.id.value; //req.swagger contains the path parameters
		if(db.remove(id)){
			res.json({success: 1, description: "Task deleted!"});
		}else{
			res.status(204).send();
		}
		
	}