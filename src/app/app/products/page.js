import Link from "next/link";
import AppMainLayout from "@/components/AppMainLayout";
import ProductImage from "@/components/ProductImage";
import { getAllProducts } from "@/lib/app-products";

export default async function AppProductsPage() {
  const products = await getAllProducts();

  return (
    <AppMainLayout
      title="App Router Products"
      subtitle="GET all products using Mongoose on the server."
    >
      {products.length === 0 && (
        <div className="alert alert-info">No products yet. Add some from the Pages Router.</div>
      )}

      <div className="card-grid">
        {products.map((product) => (
          <article key={product.id} className="card card-product">
            <ProductImage product={product} />
            <div className="card-body">
              <h3>{product.title}</h3>
              <div className="card-meta">
                <p className="price-tag">${product.price}</p>
                <p>Brand: {product.brand || "N/A"}</p>
              </div>
              <Link href={`/app/products/${product.id}`} className="btn btn-outline">
                View details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </AppMainLayout>
  );
}
