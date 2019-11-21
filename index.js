const express = require('express');
var calculate = require('./calculate.js');
require('dotenv').config();

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const connectionString = process.env.DATABASE_URL;
const { Pool } = require('pg')
const pool = new Pool({connectionString: connectionString});
var app = express();
app.set('port', process.env.PORT || 5000)
   .use(express.static(__dirname + '/public'))
   .set('views', __dirname + '/views')
   .set('view engine', 'ejs')
   .get('/', function(req, res){
      res.sendFile('animalLookup.html', { root: __dirname + "/public"});
   })
   .get('/postal', function(req, res){
      res.sendFile('form.html', { root: __dirname + "/public"});
   })
   .get('/calculate', calculate.calculateRate)
   .get('/getAnimals', getAnimals)
   .listen(app.get('port'), function() {
    console.log('Listening on port: ' + app.get('port'));
 });
 
 function getAnimals(req, res) {
    const id = 1;
    getAnimalsFromDb(id, function(err, result) {
       if (err || result == null || result.length != 1) {
          res.status(500).json({success: false, data: err});
       } else {
          const animal = result[0];
          res.status(200).json(animal);
       }
    });
 }

 function getAnimalsFromDb(id, callback) {
	console.log("Getting animal from DB with id: " + id);

	// Set up the SQL that we will use for our query. Note that we can make
   // use of parameter placeholders just like with PHP's PDO.
   
   const sql = "SELECT animal_name FROM animals WHERE animal_id = $1::int";

	// We now set up an array of all the parameters we will pass to fill the
	// placeholder spots we left in the query.
	const params = [id];

	// This runs the query, and then calls the provided anonymous callback function
	// with the results.
	pool.query(sql, params, function(err, result) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		// Log this to the console for debugging purposes.
		console.log("Found result: " + JSON.stringify(result.rows));
		callback(null, result.rows);
	});

}
