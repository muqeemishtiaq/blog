
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO);
const clientPromise = client.connect();

export default clientPromise;
