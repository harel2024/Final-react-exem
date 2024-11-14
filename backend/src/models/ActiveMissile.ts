import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";
export interface IActiveMissile {
    name: string;
    id: string;
    status: string;
    location: string;
}
const ActiveMissileSchema: Schema<IActiveMissile> = new Schema<IActiveMissile>(
    {
        name: {
            type: String,
            required: [true, "name is required"],
        },
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
        },
        location:{
            type: String,
        }
    },
);
export const ActiveMissile = mongoose.model<IActiveMissile>('ActiveMissile', ActiveMissileSchema);