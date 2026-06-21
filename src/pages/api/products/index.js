import { getServerSession } from "next-auth/next";
import connect from "@/lib/mongodb";
import Product from "@/models/Product";
import { authOptions } from "@/lib/auth";
import { serializeProduct, serializeProducts } from "@/lib/serialize";
import { ensureSeedProducts } from "@/lib/seed";

export default async function handler(req, res) {
  await connect();
  await ensureSeedProducts();

  const session = await getServerSession(req, res, authOptions);

  if (req.method === "GET") {
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    const serialized = serializeProducts(products);

    if (!session) {
      return res.status(200).json(serialized.slice(0, 3));
    }

    return res.status(200).json(serialized);
  }

  if (req.method === "POST") {
    if (!session) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { title, price, brand, image } = req.body;

    if (!title || price == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const created = await Product.create({ title, price, brand, image });
    return res.status(201).json(serializeProduct(created.toObject()));
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
