import mongoose from 'mongoose';

export interface IProduct {
  title: string;
  description: string;
  dimension: string;
  price: number;
  photo: string;
  category: string;
  promotion: boolean;
  promPrice: number;
}

const productSchema = new mongoose.Schema<IProduct>(
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
  },
  {
    versionKey: false,
  }
);

const ProductModel = () => mongoose.model<IProduct>('Product1', productSchema);

export default (mongoose.models?.Product1 || ProductModel()) as ReturnType<
  typeof ProductModel
>;
