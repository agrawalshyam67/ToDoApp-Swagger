'use strict;'
//Include crypto to generate the task id
var crypto = require('crypto');

module.exports = function() {
	return {
		taskList : [],
		/*
		 * Save the task inside the "db".
		 */
		save(task) {
			task.id = crypto.randomBytes(20).toString('hex'); // fast enough for our purpose
			this.taskList.push(task);
			return 1;			
		},
		/*
		 * Retrieve a task with a given id or return all the tasks if the id is undefined.
		 */
		find(id) {
			if(id) {
				return this.taskList.find(element => {
						return element.id === id;
					});	
			}else {
				return this.taskList;
			}
		},
		/*
		 * Delete a task with the given id.
		 */
		remove(id) {
			var found = 0;
			this.taskList = this.taskList.filter(element => {
					if(element.id === id) {
						found = 1;
					}else {
						return element.id !== id;
					}
				});
			return found;			
		},
		/*
		 * Update a task with the given id
		 */
		update(id, task) {
			var taskIndex = this.taskList.findIndex(element => {
				return element.id === id;
			});
			if(taskIndex !== -1) {
				this.taskList[taskIndex].taskDescription = task.taskDescription;
				return 1;
			}else {
				return 0;
			}
		}		
	}
};  