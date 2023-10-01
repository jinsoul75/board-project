import { MongoClient } from 'mongodb';

const url = process.env.DB_CONN_STRING as string;

let connectDB: Promise<MongoClient>;
declare global {
  // eslint-disable-next-line no-unused-vars
  namespace globalThis {
    // eslint-disable-next-line no-var, no-unused-vars
    var _mongo: Promise<MongoClient>;
  }
}

if (process.env.NODE_ENV === 'development') {
  if (!globalThis._mongo) {
    globalThis._mongo = new MongoClient(url).connect();
  }
  connectDB = globalThis._mongo;
} else {
  connectDB = new MongoClient(url).connect();
}
export { connectDB };
