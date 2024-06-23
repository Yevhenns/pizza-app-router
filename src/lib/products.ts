import clientPromise from './dbConnect';

let client;
let db;
let products;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = await db.collection('products');
    console.log('hghghgh');
  } catch (error) {
    throw new Error('Failed to connect');
  }
}

async () => {
  await init();
};

export async function getProducts33() {
  console.log('dsadasdasda');

  try {
    if (!products) await init();
    const result = await products
      .find({})
      .map(product => ({ ...product }))
      .toArray();
    return { products: result };
  } catch (error) {
    return { error: 'failed' };
  }
}
