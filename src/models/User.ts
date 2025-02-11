import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends UserCreateDto, Document {}

const userSchema = new Schema<UserDocument>(
  {
    picture: { type: String, maxlength: 200, required: false },
    name: { type: String, maxlength: 200, required: true },
    role: {
      type: String,
      enum: ['Visitor', 'Admin', 'Viewer'],
      default: 'Visitor',
      required: true,
    },
    phoneNumber: { type: String, maxlength: 200, required: false },
    email: { type: String, maxlength: 200, required: false },
    password: { type: String, maxlength: 200, required: false },
    verify: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.models.User ||
  mongoose.model<UserDocument>('User', userSchema);
