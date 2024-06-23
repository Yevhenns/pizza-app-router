import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const options = {};

if (!MONGODB_URI) throw new Error('Please add your Mongo URI to .env.local');

let client = new MongoClient(MONGODB_URI, options);
let clientPromise: Promise<MongoClient>;

let globalWithMongoClientPromise = global as typeof globalThis & {
  _mongoClientPromise: Promise<MongoClient>;
};

if (process.env.NODE_ENV !== 'production') {
  if (!globalWithMongoClientPromise._mongoClientPromise) {
    globalWithMongoClientPromise._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongoClientPromise._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
