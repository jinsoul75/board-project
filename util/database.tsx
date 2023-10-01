import { MongoClient } from 'mongodb';

let connectDB: Promise<MongoClient>;

const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace globalThis {
    // eslint-disable-next-line no-var, no-unused-vars
    var _mongo: Promise<MongoClient>;
  }
}

if (process.env.NODE_ENV === 'development') {
  if (!globalThis._mongo) {
    globalThis._mongo = new MongoClient(`mongodb+srv://${mongo_username}:${mongo_password}@cluster0.vwcqeen.mongodb.net/?retryWrites=true&w=majority`).connect();
  }
  connectDB = globalThis._mongo;
} else {
  connectDB = new MongoClient(`mongodb+srv://${mongo_username}:${mongo_password}@cluster0.vwcqeen.mongodb.net/?retryWrites=true&w=majority`).connect();
}
export { connectDB };
