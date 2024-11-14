import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface IMission {
    _id?: Types.ObjectId;
    name: string;
    description: string;
    speed: Number;
    intercepts: string[];
    price: Number;
}

const CandidateSchema: Schema<IMission> = new Schema<IMission>(
    {
        name: {
            type: String,
            required: [true, "name is required"],
            unique: true,
            minlength: [3, "name must be at least 3 characters"],
            maxlength: [30, "name must be less than 30 characters"],
            
        },
        description: {
            type: String,
            required: true,
        },
        speed: {
            type: Number,
        },
        intercepts:{
            type: [String],

        },
        price: {
            type: Number,

        }
        
    },
  
);




export const Missiles = mongoose.model<IMission>('Missiles', CandidateSchema);