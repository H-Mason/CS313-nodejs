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

function getAllAnimals(req, res) {
    getAllAnimalsFromDb(function(err, result) {
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
   const sql = "SELECT animal_name FROM animals WHERE animal_id = $id::int";

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
function getAllAnimalsFromDb(callback) {
	console.log("Getting all animals from DB");

	// Set up the SQL that we will use for our query. Note that we can make
   // use of parameter placeholders just like with PHP's PDO.
   const sql = "SELECT animal_name FROM animals";

	// This runs the query, and then calls the provided anonymous callback function
	// with the results.
	pool.query(sql, function(err, result) {
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