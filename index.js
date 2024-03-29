const express = require('express');
var calculate = require('./calculate.js');
var animalLookup = require('./animalLookup.js');
var test = require('./testHandler.js');
var path = require('path');
var session = require('express-session');
require('dotenv').config();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const connectionString = process.env.DATABASE_URL;
const { Pool } = require('pg');
const pool = new Pool({connectionString: connectionString});
var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
   secret: 'theSecret',
   resave: false,
   saveUninitialized: true
 }));
app.use(test.logRequest);
app.set('port', process.env.PORT || 5000)
   .use(express.static(__dirname + '/public'))
   .set('views', __dirname + '/views')
   .set('view engine', 'ejs')
   .get('/', function(req, res){
      res.sendFile('animalLookup.html', { root: __dirname + "/public"});
   })
   .get('/getAnimals', animalLookup.getAnimals)
   .get('/allAnimals', animalLookup.getAllAnimals)
   .get('/byName', function(req, res){
      res.sendFile('enterName.html', { root: __dirname + "/public"});
   })
   .get('/bySize', animalLookup.bySize)
   .get('/byGenus', animalLookup.byGenus)
   .get('/byOrder', animalLookup.byOrder)
   .get('/byFamily', animalLookup.byFamily)
   .get('/byDiet', animalLookup.byDiet)
   .get('/getAnimalByName', animalLookup.getAnimalByName)
   .get('/getAnimalsBySize', animalLookup.getAnimalsBySize)
   .get('/getAnimalsByGenus', animalLookup.getAnimalsByGenus)
   .get('/getAnimalsByOrder', animalLookup.getAnimalsByOrder)
   .get('/getAnimalsByFamily', animalLookup.getAnimalsByFamily)
   .get('/getAnimalsByDiet', animalLookup.getAnimalsByDiet)
   app.get('/postal', function(req, res){
      res.sendFile('form.html', { root: __dirname + "/public"});
   })
   .get('/calculate', calculate.calculateRate)
   .get('/movies', function(req, res){
      res.sendFile('movies.html', { root: __dirname + "/public"});
   })
   .get('/test', function(req, res){
      res.sendFile('test.html', { root: __dirname + "/public"});
   })
   .post('/login', test.login)
   .post('/logout', test.logout)
   .get('/getServerTime', test.verifyLogin, test.getServerTime)
   .listen(app.get('port'), function() {
    console.log('Listening on port: ' + app.get('port'));
 });

 //for team activities
 