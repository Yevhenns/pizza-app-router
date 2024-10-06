import mongoose from 'mongoose';

export interface Product extends mongoose.Document {
  title: string;
  description: string;
  dimension: string;
  price: number;
  photo: string;
  category: string;
  promotion: boolean;
  promPrice: number;
  vegan: boolean;
}

const productSchema = new mongoose.Schema<Product>(
  {
    title: { type: String, required: [true, 'Введіть назву продукту'] },
    description: { type: String, required: [true, 'Введіть опис продукту'] },
    dimension: { type: String, required: [true, 'Введіть розміри продукту'] },
    price: { type: Number, required: [true, 'Введіть ціну продукту'] },
    photo: {
      type: String,
      required: [true, 'Введіть посилання на фото продукту'],
    },
    category: { type: String, required: [true, 'Введіть категорію продукту'] },
    promotion: { type: Boolean, default: false },
    promPrice: {
      type: Number,
      required: [true, 'Введіть акційну ціну продукту'],
    },
    vegan: { type: Boolean, required: false },
  },
  {
    versionKey: false,
  }
);

export default mongoose.models.Product ||
  mongoose.model<Product>('Product', productSchema);
