import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { RoomLocationModel } from "./models/room_location";

// TODO: MOVE TO ENV
const MONGO_IP = "localhost";
const MONGO_PORT = "27017";
const MONGO_NAME = "RoomLocation";
const MONGO_URI = `mongodb://${MONGO_IP}:${MONGO_PORT}/${MONGO_NAME}`;

export async function connectToDatabase(): Promise<typeof mongoose> {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to MongoDB at ${MONGO_URI}`);
    return mongoose;
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  }
}

async function main() {
  //# DB
  const db = await connectToDatabase();
  db.connection.on("disconnect", () => {
    console.error("ERROR: Mongo disconnected...");
    process.exit(1);
  });

  //# HTTP server
  const app = express();
  app.use(express.json());

  app.get("/find_room_addr", async (req: Request, res: Response) => {
    try {
      const { roomCode: queriedRoomCode } = req.query;

      // TODO validation and sanitation

      const record = await RoomLocationModel.findOne({ roomCode: queriedRoomCode });
      if (!record) {
        return res.status(404).json({ error: "Room not found." });
      }

      return res.json({ url: record.serverUrl });
    } catch (err) {
      // Dont let the user know more than they need to - the server crashing is masked as a 404 rather than 500
      return res.status(404).json({ error: "Room not found." });
    }
  });

  //# Ready
  console.log("--< READY >--");
}

main();
