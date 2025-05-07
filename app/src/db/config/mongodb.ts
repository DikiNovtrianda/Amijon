import { Db, MongoClient } from "mongodb"

const uri : string = process.env.MONGODB_URI || ""
if (!uri) {
  throw new Error("Cannot connect to mongoDB");
}

const client : MongoClient = new MongoClient(uri)
let db : Db

function connect() {
  db = client.db(process.env.DB_NAME)
  return db
}

export function getDB() {
  if (!db) return connect()
  return db
}