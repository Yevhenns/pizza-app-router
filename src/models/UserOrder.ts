import mongoose from 'mongoose';

export interface UserOrder extends mongoose.Document, SummaryOrder {}

const customerInfoSchema = new mongoose.Schema<Info>(
  {
    address: { type: String, required: false },
    comment: { type: String, required: false },
    delivery: { type: Boolean, required: false },
    name: { type: String, required: true },
    number: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const orderedSchema = new mongoose.Schema<Ordered>(
  {
    title: { type: String, required: true },
    quantity: { type: Number, required: true },
    optionsTitles: { type: [String], required: false },
  },
  {
    versionKey: false,
  }
);

const userOrderSchema = new mongoose.Schema<UserOrder>(
  {
    customerInfo: { type: customerInfoSchema, required: true },
    order: { type: [orderedSchema], required: true },
    orderSum: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

export default mongoose.models.UserOrder ||
  mongoose.model<UserOrder>('UserOrder', userOrderSchema);
