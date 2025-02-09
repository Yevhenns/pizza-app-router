import mongoose from 'mongoose';

export interface UserOrder extends mongoose.Document, SummaryOrder {}

const customerInfoSchema = new mongoose.Schema<CustomerInfo>(
  {
    address: { type: String, maxlength: 200, required: false },
    comment: { type: String, maxlength: 200, required: false },
    name: { type: String, maxlength: 200, required: true },
    number: { type: String, maxlength: 200, required: true },
    userId: { type: String, maxlength: 200, required: false },
  },
  {
    versionKey: false,
  }
);

const orderedSchema = new mongoose.Schema<Ordered>(
  {
    title: { type: String, maxlength: 200, required: true },
    quantity: { type: Number, min: 1, max: 200, required: true },
    optionsTitles: { type: [String], default: [], required: false },
  },
  {
    versionKey: false,
  }
);

const userOrderSchema = new mongoose.Schema<UserOrder>(
  {
    customerInfo: { type: customerInfoSchema, required: true },
    order: { type: [orderedSchema], required: true },
    orderSum: { type: Number, min: 1, max: 10000, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.models.UserOrder ||
  mongoose.model<UserOrder>('UserOrder', userOrderSchema);
