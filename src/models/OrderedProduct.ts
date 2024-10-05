import mongoose from 'mongoose';

import productSchema from './Product';

export interface OrderedProduct extends mongoose.Document {
  userId: string;
  order: Product[];
}

const orderedProductSchema = new mongoose.Schema<OrderedProduct>(
  {
    userId: { type: String, required: [true, 'Введіть назву продукту'] },
    order: { type: [productSchema], required: [true, 'Введіть опис продукту'] },
  },
  {
    versionKey: false,
  }
);

export default mongoose.models.OrderedProduct ||
  mongoose.model<OrderedProduct>('OrderedProduct', orderedProductSchema);
