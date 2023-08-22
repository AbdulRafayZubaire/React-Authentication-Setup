import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);

    console.log(`mongo connected`);

  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

export default connectDB;



// import { MongoClient } from 'mongodb';

// let client;

// export const initializeDbConnection = async () => {
//     client = await MongoClient.connect('mongodb://localhost:27017', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });
// }

// export const getDbConnection = dbName => {
//     const db = client.db(dbName);
//     return db;
// }