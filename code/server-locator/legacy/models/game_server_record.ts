import mongoose, { Schema, Document } from "mongoose";

export interface IGameServerRecord extends Document {
  serverName: string;
  ipAddress: string;
  status: string;
  // Add other fields as needed
}

const GameServerRecordSchema: Schema = new Schema(
  {
    serverName: { type: String, required: true },
    serverUrl: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

export const GameServerRecord = mongoose.model<IGameServerRecord>(
  "GameServerRecord",
  GameServerRecordSchema,
  "game_server_registers" // This explicitly sets the collection name
);
