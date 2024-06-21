import mongoose from 'mongoose';

const DATABASE_URL = process.env.DATABASE_URL as string;

export const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL).then(item => {
      return item;
    });
    console.log('asdad');
  } catch (err) {
    console.log(err);
  }
};
