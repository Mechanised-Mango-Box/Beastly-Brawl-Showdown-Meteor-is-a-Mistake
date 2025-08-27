import { Schema, model } from "mongoose";

interface RoomLocation {
  roomCode: string;
  serverUrl: string;
}

const schema = new Schema<RoomLocation>({
  roomCode: { type: String, required: true, unique: true },
  serverUrl: { type: String, required: true },
});

export const RoomLocationModel = model<RoomLocation>("RoomLocation", schema);
