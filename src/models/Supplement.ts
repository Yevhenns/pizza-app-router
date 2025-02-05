import mongoose, { Document, Schema } from 'mongoose';

interface SupplementDocument extends SupplementCreateDto, Document {}

const supplementSchema = new Schema<SupplementDocument>(
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
  mongoose.model<SupplementDocument>('Supplement', supplementSchema);
