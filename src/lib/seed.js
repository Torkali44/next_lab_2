import connect from "@/lib/mongodb";
import Product from "@/models/Product";
import { getProductImage, productImagesByTitle } from "@/lib/product-images";

const seedProducts = [
  {
    title: "iPhone 14",
    price: 1000,
    brand: "Apple",
    image: productImagesByTitle["iPhone 14"],
  },
  {
    title: "Galaxy S24",
    price: 900,
    brand: "Samsung",
    image: productImagesByTitle["Galaxy S24"],
  },
  {
    title: "Redmi Note",
    price: 400,
    brand: "Xiaomi",
    image: productImagesByTitle["Redmi Note"],
  },
  {
    title: "Pixel 8",
    price: 700,
    brand: "Google",
    image: productImagesByTitle["Pixel 8"],
  },
  {
    title: "OnePlus 12",
    price: 800,
    brand: "OnePlus",
    image: productImagesByTitle["OnePlus 12"],
  },
];

export async function ensureSeedProducts() {
  await connect();
  const count = await Product.countDocuments();

  if (count === 0) {
    await Product.insertMany(seedProducts);
    return;
  }

  const products = await Product.find({
    $or: [{ image: { $exists: false } }, { image: "" }, { image: null }],
  });

  await Promise.all(
    products.map((product) =>
      Product.updateOne(
        { _id: product._id },
        { image: getProductImage(product.title, product.image) }
      )
    )
  );
}
