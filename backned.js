var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "saurabh@123t",
	database:"lab_11"
});

// Created the Connection
/*con.connect(function(err) {
if (err) throw err;
console.log("Connected!");
});*/

// Created the Database named as "gfg"
con.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");
});
module.exports=con;
