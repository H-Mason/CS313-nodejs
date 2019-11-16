const express = require('express');
var calculate = require('./calculate.js');
//var validate = require('./public/validate');
var app = express();
app.set('port', process.env.PORT || 5000)
   .use(express.static(__dirname + '/public'))
   .set('views', __dirname + '/views')
   .set('view engine', 'ejs')
   .get('/', function(req, res){
      res.sendFile('form.html', { root: __dirname + "/public"});
   })
   .get('/calculate', calculate.calculateRate)
   .listen(app.get('port'), function() {
    console.log('Listening on port: ' + app.get('port'));
 });