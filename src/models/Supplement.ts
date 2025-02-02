import mongoose from 'mongoose';

export interface Supplement extends mongoose.Document {
  price: number;
  title: string;
  vegan: boolean;
  for_category: SupplementCategory;
}

const supplementSchema = new mongoose.Schema<Supplement>(
  {
    title: { type: String, required: [true, 'Введіть назву'] },
    price: { type: Number, required: [true, 'Введіть ціну'] },
    vegan: { type: Boolean, required: [true, 'Оберіть тип'] },
    for_category: {
      type: String,
      enum: ['Піца', 'Закуски'],
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.models.Supplement ||
  mongoose.model<Supplement>('Supplement', supplementSchema);
