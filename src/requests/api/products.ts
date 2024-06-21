// import user from '../../Model/user';
// import connectDB from '../lib/connectDB';

// export default async function handler(req, res) {
//   await connectDB();

//   const { name, age } = req.body;
//   const person = new user({
//     name: name,
//     age: age,
//   });
//   await person.save();
//   console.log('inside api', name, age);
//   res.status(200).json({ done: true });
// }

import Product from '@/Model/Product';
import { connectDB } from '../lib/connectDB';
import { NextResponse } from 'next/server';

export const getAll = async () => {
  try {
    await connectDB();
    console.log('conne');

    const products = await Product.find();
    // await res
    //   .status(200)
    //   .json({ status: 'success', code: 200, data: { result: products } });
    console.log(products);
  } catch (err) {
    console.log(err);
  }
};
