require('dotenv').config();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const connectionString = process.env.DATABASE_URL;
const { Pool } = require('pg');
const pool = new Pool({connectionString: connectionString});
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
// All Animal related functions
function getAllAnimals(req, res) {
    getAllAnimalsFromDb(function(err, result) {
       if (err || result == null) {
          res.status(500).json({success: false, data: err});
       } else {
          res.render('viewAllAnimals',{list : result} );
       }
    });
 }
function getAllAnimalsFromDb(callback) {
	console.log("Getting all animals from DB");
   const sql = "SELECT animal_name FROM animals";
	pool.query(sql, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}
		console.log("Found result: " + JSON.stringify(result.rows));
		callback(null, result.rows);
	});
}
// Name related functions
function getAnimalByName(req, res) {
	const name = req.query.input;
	console.log("The animal requested is: " + name);
	getAnimalFromName(name, function(err, result) {
		if (err || result == null) {
		    res.status(500).json({success: false, data: err});
		} else {
			const animal = result[0];
          //res.status(200).json(animal);
		    res.render('viewAnimalFromName', animal);
		}
	 });
}
function getAnimalFromName(name, callback) {
	console.log("Getting named animal from DB");
   	const sql = "SELECT animals.animal_name," +
						"animals.picture," +
						"animals.description," +
						"animals.scientific_name," +
						"genus.genus AS genus," +
						"family.family AS family," +
						"a_order.order_name AS a_order," +
						"size.size AS size," +
						"animals.size_description," +
						"animals.region," +
						"diet.diet AS diet " +
					"FROM   animals " +
					"JOIN   genus ON genus.genus_id = animals.genus_id " +
					"JOIN   family ON family.family_id = animals.family_id " +
					"JOIN   a_order ON a_order.order_id = animals.order_id " +
					"JOIN   size ON size.size_id = animals.size_id " +
					"JOIN   diet ON diet.diet_id = animals.diet_id " +
					"WHERE  animals.animal_name = '" + name + "'";
	pool.query(sql, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}
		console.log("Found result: " + JSON.stringify(result.rows));
		callback(null, result.rows);
	});
}
// Size related functions
// for select list
function bySize(req, res) {
	getSizes(function(err, result) {
		if (err || result == null) {
		   res.status(500).json({success: false, data: err});
		} else {
		   res.render('chooseSize',{list : result} );
		}
	 });
}
function getSizes(callback) {
	console.log("Getting all size from DB");
   const sql = "SELECT size FROM size";
	pool.query(sql, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}
		console.log("Found result: " + JSON.stringify(result.rows));
		callback(null, result.rows);
	});
}
// to display the animal(s)
function getAnimalsBySize(req, res) {
	const size = req.query.input;
	console.log("The size requested is: " + size);
	getAnimalsFromSize(size, function(err, result) {
		if (err || result == null) {
		    res.status(500).json({success: false, data: err});
		} else {
		  	//res.status(200).json(result);
		    res.render('viewAnimalsFromSize', {list : result});
		}
	 });
}
function getAnimalsFromSize(size, callback) {
	console.log("Getting animals from DB using size");
	const sql = "SELECT animals.animal_name, " +
						"animals.size_description, " +
						"size.size AS size " +
				"FROM   animals " +
				"JOIN   size on size.size_id = animals.size_id " +
				"WHERE  size.size = '" + size + "'";
	pool.query(sql, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}
		console.log("Found result: " + JSON.stringify(result.rows));
		callback(null, result.rows);
	});
}
// Genus related functions
// for select list
function byGenus(req, res) {
	getGenus(function(err, result) {
		if (err || result == null) {
		   res.status(500).json({success: false, data: err});
		} else {
		   res.render('chooseGenus',{list : result} );
		}
	 });
}
function getGenus(callback) {
	console.log("Getting all genus from DB");
   	const sql = "SELECT genus FROM genus";
	pool.query(sql, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}
		console.log("Found result: " + JSON.stringify(result.rows));
		callback(null, result.rows);
	});
}
// to display the animal(s)
function getAnimalsByGenus(req, res) {
	const genus = req.query.input;
	console.log("The genus requested is: " + genus);
	getAnimalsFromGenus(genus, function(err, result) {
		if (err || result == null) {
		    res.status(500).json({success: false, data: err});
		} else {
		  	//res.status(200).json(result);
		    res.render('viewAnimalsFromGenus', {list : result});
		}
	 });
}
function getAnimalsFromGenus(genus, callback) {
	console.log("Getting animals from DB using genus");
	const sql = "SELECT animals.animal_name, " +
						"animals.description, " +
						"genus.genus AS genus, " +
						"family.family AS family, " +
						"a_order.order_name AS a_order " +
				"FROM   animals " +
				"JOIN   genus ON genus.genus_id = animals.genus_id " +
				"JOIN   family ON family.family_id = animals.family_id " +
				"JOIN   a_order ON a_order. order_id = animals.order_id " +
				"WHERE  genus.genus = '" + genus + "'";
	pool.query(sql, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}
		console.log("Found result: " + JSON.stringify(result.rows));
		callback(null, result.rows);
	});
}
// Family related functions
// for select list
function byFamily(req, res) {
	getFamilies(function(err, result) {
		if (err || result == null) {
		   res.status(500).json({success: false, data: err});
		} else {
		   res.render('chooseFamily',{list : result} );
		}
	 });
}
function getFamilies(callback) {
	console.log("Getting all families from DB");
   	const sql = "SELECT family FROM family";
	pool.query(sql, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}
		console.log("Found result: " + JSON.stringify(result.rows));
		callback(null, result.rows);
	});
}
// to display the animal(s)
function getAnimalsByFamily(req, res) {
	const family = req.query.input;
	console.log("The family requested is: " + family);
	getAnimalsFromFamily(family, function(err, result) {
		if (err || result == null) {
		    res.status(500).json({success: false, data: err});
		} else {
		  	//res.status(200).json(result);
		    res.render('viewAnimalsFromFamily', {list : result});
		}
	 });
}
function getAnimalsFromFamily(family, callback) {
	console.log("Getting animals from DB using family");
	const sql = "SELECT animals.animal_name, " +
						"animals.description, " +
						"family.family AS family, " +
						"a_order.order_name AS a_order " +
				"FROM   animals " +
				"JOIN   family ON family.family_id = animals.family_id " +
				"JOIN   a_order ON a_order. order_id = animals.order_id " +
				"WHERE  family.family = '" + family + "'";
	pool.query(sql, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}
		console.log("Found result: " + JSON.stringify(result.rows));
		callback(null, result.rows);
	});

}
// Order related functions
// for select list
function byOrder(req, res) {
	getOrders(function(err, result) {
		if (err || result == null) {
		   res.status(500).json({success: false, data: err});
		} else {
		   res.render('chooseOrder',{list : result} );
		}
	 });
}
function getOrders(callback) {
	console.log("Getting all orders from DB");
   	const sql = "SELECT order_name FROM a_order";
	pool.query(sql, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}
		console.log("Found result: " + JSON.stringify(result.rows));
		callback(null, result.rows);
	});
}
// to display the animal(s)
function getAnimalsByOrder(req, res) {
	const order = req.query.input;
	console.log("The order requested is: " + order);
	getAnimalsFromOrder(order, function(err, result) {
		if (err || result == null) {
		    res.status(500).json({success: false, data: err});
		} else {
		  	//res.status(200).json(result);
		    res.render('viewAnimalsFromOrder', {list : result});
		}
	 });
}
function getAnimalsFromOrder(order, callback) {
	console.log("Getting animals from DB using order");
	const sql = "SELECT animals.animal_name, " +
						"animals.description, " +
						"a_order.order_name AS a_order " +
				"FROM   animals " +
				"JOIN   a_order ON a_order.order_id = animals.order_id " +
				"WHERE  a_order.order_name = '" + order + "'";
	pool.query(sql, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}
		console.log("Found result: " + JSON.stringify(result.rows));
		callback(null, result.rows);
	});

}
// Diet related functions
// for select list
function byDiet(req, res) {
	getDiets(function(err, result) {
		if (err || result == null) {
		   res.status(500).json({success: false, data: err});
		} else {
		   res.render('chooseDiet',{list : result} );
		}
	 });
}
function getDiets(callback) {
	console.log("Getting all diets from DB");
   	const sql = "SELECT diet FROM diet";
	pool.query(sql, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}
		console.log("Found result: " + JSON.stringify(result.rows));
		callback(null, result.rows);
	});
}
// to display the animal(s)
function getAnimalsByDiet(req, res) {
	const diet = req.query.input;
	console.log("The diet requested is: " + diet);
	getAnimalsFromDiet(diet, function(err, result) {
		if (err || result == null) {
		    res.status(500).json({success: false, data: err});
		} else {
		  	//res.status(200).json(result);
		    res.render('viewAnimalsFromDiet', {list : result});
		}
	 });
}
function getAnimalsFromDiet(diet, callback) {
	console.log("Getting animals from DB using diet");
	const sql = "SELECT animals.animal_name, " +
						"animals.description, " +
						"diet.diet AS diet " +
				"FROM   animals " +
				"JOIN   diet ON diet.diet_id = animals.diet_id " +
				"WHERE  diet.diet = '" + diet + "'";
	pool.query(sql, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}
		console.log("Found result: " + JSON.stringify(result.rows));
		callback(null, result.rows);
	});
}

module.exports = {getAnimals: getAnimals, getAllAnimals: getAllAnimals,
				bySize: bySize, byGenus: byGenus, byFamily: byFamily, 
				byOrder: byOrder, byDiet: byDiet, getAnimalsBySize: getAnimalsBySize, 
				getAnimalsByGenus: getAnimalsByGenus, getAnimalsByFamily: getAnimalsByFamily, 
				getAnimalsByOrder: getAnimalsByOrder, getAnimalsByDiet: getAnimalsByDiet,
				getAnimalByName: getAnimalByName};