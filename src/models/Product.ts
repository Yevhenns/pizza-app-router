import mongoose, { Document, Schema } from 'mongoose';

interface ProductDocument extends ProductCreateDto, Document {
  category: Categories;
}

const productSchema = new Schema<ProductDocument>(
  {
    title: { type: String, required: [true, 'Введіть назву продукту'] },
    description: { type: String, required: [true, 'Введіть опис продукту'] },
    dimension: { type: String, required: [true, 'Введіть розміри продукту'] },
    price: { type: Number, required: [true, 'Введіть ціну продукту'] },
    photo: {
      type: String,
      required: [true, 'Введіть посилання на фото продукту'],
    },
    category: {
      type: String,
      enum: ['Піца', 'Закуски', 'Напої', 'Суші'],
      required: [true, 'Введіть категорію продукту'],
    },
    promotion: { type: Boolean, default: false },
    promPrice: {
      type: Number,
      required: [true, 'Введіть акційну ціну продукту'],
    },
    vegan: { type: Boolean, required: false },
    spicy: { type: Boolean, required: false },
  },
  {
    versionKey: false,
  }
);

export default mongoose.models.Product ||
  mongoose.model<ProductDocument>('Product', productSchema);
