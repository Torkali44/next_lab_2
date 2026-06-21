import Link from "next/link";
import PagesLayout from "@/components/PagesLayout";
import ProductImage from "@/components/ProductImage";
import { getApiBaseUrl } from "@/lib/api-base";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { serializeProps, serializeSession } from "@/lib/serialize-props";

export default function ProductsPage({ products, session }) {
  async function deleteProduct(id) {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("Delete failed. Sign in to manage products.");
      return;
    }

    window.location.reload();
  }

  return (
    <PagesLayout
      title="Products"
      subtitle={
        session
          ? "Authenticated: showing all products with full CRUD access."
          : "Guest mode: showing 3 products only. Sign in for full access."
      }
    >
      {!session && (
        <div className="alert alert-info" style={{ marginBottom: "1rem" }}>
          No session detected — GET and GET by id only. Add, edit, and delete require sign in.
        </div>
      )}

      {session && (
        <div className="actions-row" style={{ marginBottom: "1rem" }}>
          <Link href="/products/form" className="btn btn-primary">
            Add Product
          </Link>
          <span className="badge">{products.length} products</span>
        </div>
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

              <div className="card-actions">
                <Link href={`/products/${product.id}`} className="btn btn-outline">
                  View Details
                </Link>

                {session && (
                  <>
                    <Link href={`/products/form?id=${product.id}`} className="btn btn-ghost">
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </PagesLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const baseUrl = getApiBaseUrl(context.req);

  const response = await fetch(`${baseUrl}/api/products`, {
    headers: {
      cookie: context.req.headers.cookie || "",
    },
  });

  const products = response.ok ? await response.json() : [];

  return {
    props: serializeProps({
      products: Array.isArray(products) ? products : [],
      session: serializeSession(session),
    }),
  };
}
