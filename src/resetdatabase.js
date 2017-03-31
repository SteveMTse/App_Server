var ObjectID = require('mongodb').ObjectID;

var databaseName = "CS";
// Put the initial mock objects here.
var initialData = {
  "jewelry":{
    "1":{
      "_id":new ObjectID("000000000000000000000001"),
      "name":"genetic jewelry",
      "description":"best jewelry",
      "picture":"",
      "type":"gold",
      "popularity":123

    }

  },
  //users
  "users":{
    "1":{
      "_id":new ObjectID("000000000000000000000001"),
      "firstname": "Vincent",
      "lastname": "Lou",
      "avatar": "123",
      "email": "upao@umass.edu",
      "phoneNumber":"138-8888-8888"

    }


  },
  "studio":{
    "1":{
      "description":"abcd",
      "pictureSet":[
        "name"
      ],
      "designer":[
        "abc"
      ]

    }

  }






};
/**
 * Resets a collection.
 */
function resetCollection(db, name, cb) {
  // Drop / delete the entire object collection.
  db.collection(name).drop(function() {
    // Get all of the mock objects for this object collection.
    var collection = initialData[name];
    var objects = Object.keys(collection).map(function(key) {
      return collection[key];
    });
    // Insert objects into the object collection.
    db.collection(name).insertMany(objects, cb);
  });
}

/**
 * Adds any desired indexes to the database.
 */
function addIndexes(db, cb) {
  db.collection('users').createIndex({ lastname: "text",
  firstname: "text"},null,cb);
}



function resetDatabase(db, cb) {
  // The code below is a bit complex, but it basically emulates a
  // "for" loop over asynchronous operations.
  var collections = Object.keys(initialData);
  var i = 0;

  // Processes the next collection in the collections array.
  // If we have finished processing all of the collections,
  // it triggers the callback.
  function processNextCollection() {
    if (i < collections.length) {
      var collection = collections[i];
      i++;
      // Use myself as a callback.
      resetCollection(db, collection, processNextCollection);
    } else {
      addIndexes(db, cb);
    }
  }

  // Start processing the first collection!
  processNextCollection();
}


if(require.main === module) {
  var MongoClient = require('mongodb').MongoClient;
  var url ='mongodb://abcde:abcde@ds147520.mlab.com:47520/cs'
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw new Error("Could not connect to database: " + err);
    } else {
      console.log("Resetting database...");
      resetDatabase(db, function() {
        console.log("Database reset!");
        // Close the database connection so NodeJS closes.
        db.close();
      });
    }
  });

}
else{
  module.exports = resetDatabase;
}
