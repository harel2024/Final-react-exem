import mongoose, { Schema, Document } from 'mongoose';
import { Organization } from './Organizations';

// מודל עבור User
export interface User extends Document {
  username: string;
  password: string;
  organization: Organization;
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  }
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;

