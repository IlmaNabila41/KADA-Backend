import dotenv from 'dotenv/config';
import express from 'express';
import './config/connection.js';
// import mongo from './config/connection.js';
import productRouter from './controllers/controller.js';


// dotenv.config();

const app = express();

app.use(express.json());
app.use('/', productRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

export default app;

// import { MongoClient } from 'mongodb';

// const uri = "mongodb+srv://root:root@cluster0.nipajpl.mongodb.net/?appName=Cluster0";;
// const client = new MongoClient(uri);

// async function run() {
//   await client.connect();
//   console.log("Connected to MongoDB!");

//   const db = client.db("belajar");
//   const users = db.collection("users");

//   await users.insertOne({ nama: "Kirman", umur: 100 });

//   const data = await users.find().toArray();
//   console.log(data);
// }

// run();