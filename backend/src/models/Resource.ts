import mongoose, { Schema, Document } from 'mongoose';

// מודל עבור משאב
export interface Resource extends Document {
  name: string;
  amount: number;
  price: number;
}

const resourceSchema: Schema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true }
});

const ResourceModel = mongoose.model<Resource>('Resource', resourceSchema);

export default ResourceModel;
