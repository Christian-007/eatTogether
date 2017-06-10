// Set up
/* var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false})); // Parses urlencoded bodies
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());

// Routes
app.post('/api/test', function(req, res) {

	console.log(req.body);

	var response = "Loud and clear";
	res.json(response);
})

// Listen
app.listen(8080);
console.log("App listening on port 8080"); */

// Initialise sqlite3 database
// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('test');

// db.serialize(function() {
// 	db.run("CREATE TABLE if not exists user (id INT, dt TEXT)");

// 	var stmt = db.prepare("INSERT INTO user VALUES(?,?)");
// 	for(var i=0; i<10; i++){
// 		var d = new Date();
// 		var n = d.toLocaleTimeString();
// 		stmt.run(i, n);
// 	}

// 	stmt.finalize();

	// db.each("SELECT id,dt from user", function(err,row){
	// 	console.log("User id: " + row.id, row.dt);
	// });
// });
// db.close();  

var express = require('express');
var app = express();
var fs = require("fs");

app.get('/listUsers', function (req, res) {
   fs.readFile("users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
