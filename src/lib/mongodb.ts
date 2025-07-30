import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) throw new Error("Missing MONGODB_URI");

// Fix 1: Use const instead of let
const globalWithMongoose = globalThis as typeof globalThis & {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

// Fix 2: Add types instead of using `any`
const cached = globalWithMongoose.mongoose || {
  conn: null,
  promise: null,
};

async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "magiclink_auth",
      bufferCommands: false,
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  globalWithMongoose.mongoose = cached; // Cache it
  return cached.conn;
}

export default connectToDatabase;

