const { MongoClient } = require ('mongodb');

async function start () {
    const connectionString = 'mongodb://localhost:27017';
    const client = new MongoClient(connectionString,  {
        //useUnifiedTopology: true 
     });
        
     await client.connect();

     const db = client.db('test');
     const collection = db.collection('students');
     const cursor = collection.find();
     const results = await cursor.toArray();
     console.log(results);

    }

start();