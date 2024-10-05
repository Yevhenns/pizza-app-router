import mongoose from 'mongoose';

export interface UserProduct extends mongoose.Document {
  userId: string;
  order: Ordered[];
}

const orderedSchema = new mongoose.Schema<Ordered>(
  {
    title: { type: String, required: true },
    quantity: { type: Number, required: true },
    optionsTitles: { type: [String], required: true },
  },
  {
    versionKey: false,
  }
);

const userProductSchema = new mongoose.Schema<UserProduct>(
  {
    userId: { type: String, required: [true, 'Введіть назву продукту'] },
    order: { type: [orderedSchema], required: [true, 'Введіть опис продукту'] },
  },
  {
    versionKey: false,
  }
);

export default mongoose.models.UserProduct ||
  mongoose.model<UserProduct>('UserProduct', userProductSchema);
