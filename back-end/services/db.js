const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const config = require('config');

let dbConnection;

module.exports = {
  connectToServer: function () {
    MongoClient.connect(`mongodb://${config.get('mongo.host')}:${config.get('mongo.port')}`, { useNewUrlParser: true }, async function (err, client) {
      if (err || !client) {
          console.log(err);
        return;
      }

      dbConnection = client.db("StickyNotesAmberMacias");
      console.log("Successfully connected to MongoDB.");

    });
  },

  getDb: function () {
    return dbConnection;
  },
};