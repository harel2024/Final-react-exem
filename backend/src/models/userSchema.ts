import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";
import { IMission } from "./MissileSchema";

export interface IUser {
    username: string;
    password: string;
    organization: string;
    location?: string;
    resources?: {
        missile?: Types.ObjectId;
        amount: number;
    }[];
    budget?: number;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            minlength: [3, "Username must be at least 3 characters"],
            maxlength: [30, "Username must be less than 30 characters"],

        },
        password: {
            type: String,
            required: true,
        },
        organization: {
            type: String,
            required: true,
        },
        location: {
            type: String,
        },
        resources: [{
            missile: {
                type: Schema.Types.ObjectId,
                ref: "Missiles",
            },
            amount: {
                type: Number,
            }
        }],
        budget: {
            type: Number,
        }
    },

);




export const Users = mongoose.model<IUser>('User', UserSchema);