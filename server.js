import express from 'express';
import { MongoClient } from 'mongodb';
import schema from './data/schema';
import GraphQLHTTP from 'express-graphql';

let app = express();

// app.get('/', (req, res) => { 
//     res.send('hello express!!!');
// });

app.use(express.static('public'));

app.use('/graphql', GraphQLHTTP({
schema : schema,
graphiql: true
}));

let db;
let connectionString = process.env.MONGO_URL || "mongodb://meads:usfbulls23@ds031741.mlab.com:31741/rgrjs";

MongoClient.connect(connectionString, (err, database) => {
    if(err) throw err;

    db = database;
    app.listen(3000, () => {
        console.log("listening on port 3000");
    });
});

app.get("/data/links", (req, res) => { 
        db.collection("links").find({}).toArray((err, links) => {
         if(err) throw err;
         res.json(links);
    });
});