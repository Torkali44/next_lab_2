import connect from "@/lib/mongodb";
import Product from "@/models/Product";
import { serializeProduct, serializeProducts } from "@/lib/serialize";
import { ensureSeedProducts } from "@/lib/seed";

export async function getAllProducts() {
  await connect();
  await ensureSeedProducts();
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  return serializeProducts(products);
}

export async function getProductById(id) {
  await connect();
  const product = await Product.findById(id).lean();
  return serializeProduct(product);
}
