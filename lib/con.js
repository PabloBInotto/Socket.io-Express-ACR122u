var mysql = require('mysql');
var fs = require('fs');
var config = require('./../data.json');


var con = mysql.createConnection({
 host: config.host,
 user: config.user,
 password: config.password,
 port: config.port,
 _socket: "/var/run/mysqld/mysqld.sock"
}); 


con.connect(function(err){
 if(err){
	console.log("open your browser on localhost:3000/users");	
	}else{
 console.log("Connected at database!");

 con.query('CREATE DATABASE IF NOT EXISTS rfio', function(err, result){
  if(err)throw err;
  console.log("Database created");
 });

 con.query('USE rfio', function(err){
  if(err) throw err;
 
  var sql = "CREATE TABLE IF NOT EXISTS workers (nome varchar(100) DEFAULT NULL, foto varchar(100) DEFAULT NULL, rfid text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL, dept varchar(20) NOT NULL, turno varchar(10) NOT NULL, status varchar(1) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL, divi varchar(1) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL, Qty int(1) NOT NULL DEFAULT '1', fone varchar(30) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL, email varchar(50) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL)";
   con.query(sql, function (err, result){
    if(err) throw err;
     console.log("Table workers created!");
    });
    
  var sql = "CREATE TABLE IF NOT EXISTS ck (evento text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL, Qty int(1) NOT NULL DEFAULT '1', ts timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP)";
   con.query(sql, function (err, result){
    if(err) throw err;
     console.log("Table ck created!");
    });
    
    var sql = "CREATE OR REPLACE VIEW countbyid AS (select evento, count('Qty') as 'qty' from ck group by evento)";
    con.query(sql, function (err, result){
    if(err) throw err;
     console.log("view countbyid created!");
		var sql = "CREATE OR REPLACE VIEW grupo AS (select `workers`.`rfid`, `workers`.`foto`, `workers`.`nome`, `workers`.`turno`, `workers`.`divi`, `workers`.`dept`, `countbyid`.`qty` FROM `rfio`.`workers` join `rfio`.`countbyid` ON `workers`.`rfid` = `countbyid`.`evento` order by `workers`.`nome`)";
		con.query(sql, function (err, result){
		if(err) throw err;
		 console.log("view grupo created!");
		 console.log("open your browser and access the http://localhost:3000/");
		});
		
    });
    
  });
  console.log("open your browser on localhost:3000");
 }
});

module.exports = con;
