import Link from "next/link";
import AppMainLayout from "@/components/AppMainLayout";
import ProductImage from "@/components/ProductImage";
import { getProductById } from "@/lib/app-products";

export default async function AppProductDetailsPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return (
      <AppMainLayout title="Product not found">
        <Link href="/app/products" className="btn btn-outline">
          Back to products
        </Link>
      </AppMainLayout>
    );
  }

  return (
    <AppMainLayout title={product.title} subtitle="GET by id using Mongoose.">
      <div className="detail-card card card-product">
        <ProductImage product={product} large priority />
        <div className="card-body">
          <p className="price-tag">${product.price}</p>
          <p>Brand: {product.brand || "N/A"}</p>
          <Link href="/app/products" className="btn btn-outline">
            Back to products
          </Link>
        </div>
      </div>
    </AppMainLayout>
  );
}
