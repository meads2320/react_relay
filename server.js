import express from 'express';
import { MongoClient } from 'mongodb';
import Schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import { graphql} from 'graphql';
import {introspectionQuery } from 'graphql/utilities';
import fs from 'fs';

let app = express();

app.use(express.static('public'));


(async () => {

    
    let connectionString = process.env.MONGO_URL || "mongodb://meads:usfbulls23@ds031741.mlab.com:31741/rgrjs";
    let db = await MongoClient.connect(connectionString);
    let _schema = Schema(db);

    app.use('/graphql', GraphQLHTTP({ 
        _schema,
        graphql:true
    }));

    app.listen(3000, () => {
        console.log("listening on port 3000");
    });
    let json = await graphql(_schema, introspectionQuery); 

    fs.writeFile('./data/schema.json', JSON.stringify(json, null, 2), err => {
        if(err) throw err;
        console.log("Scheme created");
    });

})();