var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var res;
  dbo.collection("products").find().toArray(function(err, result) {
      res=result;
    db.close();
  });
  document.getElementById("demo").innerHTML = res;
});