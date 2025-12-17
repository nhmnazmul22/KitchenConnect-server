import { MongoClient, ServerApiVersion } from "mongodb";

let cachedClient = null;
let cachedDb = null;

export const connectDB = async () => {
  if (cachedClient && cachedDb) return cachedDb;

  const client = new MongoClient(process.env.DATABASE_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  const db = client.db(process.env.DB_NAME);

  console.log("MongoDB Connected");

  cachedClient = client;
  cachedDb = db;
  return db;
};

export const getDB = () => {
  if (!cachedDb) {
    throw new Error("Database not initialized");
  }
  return cachedDb;
};

export const collections = {
  users: async () => await cachedDb.collection("users"),
  meals: async () => await cachedDb.collection("meals"),
  reviews: async () => await cachedDb.collection("reviews"),
  favorites: async () => await cachedDb.collection("favorites"),
  orders: async () => await cachedDb.collection("orders"),
  payments: async () => await cachedDb.collection("payments"),
  roleRequests: async () => await cachedDb.collection("role_requests"),
};
