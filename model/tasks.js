

	var db = require('./../lib/con.js');
	
	var task = {
		getAllTasks:function(callback){
			return db.query("select * from workers", callback);
		},
		deletTasks: function(id, callback){
			return db.query("DELETE FROM workers WHERE rfid=?", [id], callback);
		}
	}
	
module.exports=task;
