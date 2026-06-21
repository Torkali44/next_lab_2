import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import connect from "@/lib/mongodb";
import Product from "@/models/Product";
import { authOptions } from "@/lib/auth";
import { serializeProduct } from "@/lib/serialize";

export default async function handler(req, res) {
  await connect();

  const { id } = req.query;
  const session = await getServerSession(req, res, authOptions);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product id" });
  }

  if (req.method === "GET") {
    const product = await Product.findById(id).lean();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(serializeProduct(product));
  }

  if (req.method === "PUT") {
    if (!session) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { title, price, brand, image } = req.body;

    const updated = await Product.findByIdAndUpdate(
      id,
      { title, price, brand, image },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(serializeProduct(updated));
  }

  if (req.method === "DELETE") {
    if (!session) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Deleted successfully" });
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
