import mongoose from 'mongoose';

declare global {
  var mongoose: any;
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = (async () => {
      const mongooseInstance = await mongoose.connect(MONGODB_URI, opts);

      const db = mongooseInstance.connection.db;
      if (!db) {
        throw new Error('Database connection is not available.');
      }

      await db.collection('products').createIndex({ category: 1 });
      await db.collection('products').createIndex({ promotion: 1 });
      await db.collection('users').createIndex({ email: 1 });

      return mongooseInstance;
    })();
  }
  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

export default dbConnect;
