import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface IOrganization {
    name: string;
    resources: {
        name: string;
        amount: number;
    }[];
    budget: Number;
}

const OrganizationSchema: Schema<IOrganization> = new Schema<IOrganization>(
    {
        name: {
            type: String,
            required: [true, "name is required"],
            unique: true,
            minlength: [3, "name must be at least 3 characters"],
            maxlength: [30, "name must be less than 30 characters"],
            
        },
        resources: [{
            name: {
                type: String,
            },
            amount: {
                type: Number,
            }
        }],
        budget: {
            type: Number,
        },
        
    },
  
);




export const Organization = mongoose.model<IOrganization>('Organization', OrganizationSchema);