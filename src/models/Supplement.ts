import mongoose from 'mongoose';

export interface Option extends mongoose.Document {
  id: string;
  price: number;
  title: string;
  vegan: boolean;
}

const supplementSchema = new mongoose.Schema<Option>(
  {
    title: { type: String, required: [true, 'Введіть назву'] },
    price: { type: Number, required: [true, 'Введіть ціну'] },
    vegan: { type: Boolean, required: false },
  },
  {
    versionKey: false,
  }
);

export default mongoose.models.Option ||
  mongoose.model<Option>('Option', supplementSchema);
