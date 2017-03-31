var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongo_express = require('mongo-express/lib/middleware');
var mongo_express_config = require('mongo-express/config.default.js');
var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var url ='mongodb://stevexie:jwyxxxwb!!11@10.66.138.109:27017/Test_iOS'

app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: true}));
MongoClient.connect(url, function(err, db) {
  app.use(bodyParser.json());
  app.use(bodyParser.text());
  if (err)
      console.log(err);
  else {
      console.log("connected to database")
  }








  var ResetDatabase = require('./resetdatabase');
  // Reset database.
  app.post('/resetdb', function(req, res) {
      console.log("Resetting database...");
      ResetDatabase()
  });


  app.listen(3000, function() {
    console.log('app listening on port 3000!');
  });

});
