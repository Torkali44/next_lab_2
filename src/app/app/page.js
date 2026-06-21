import Link from "next/link";
import AppMainLayout from "@/components/AppMainLayout";
import ProductImage from "@/components/ProductImage";
import { getAllProducts } from "@/lib/app-products";

export default async function AppHomePage() {
  const products = await getAllProducts();
  const featuredProducts = products.slice(0, 3);

  return (
    <AppMainLayout
      title="App Router Home"
      subtitle="Server Components + Mongoose + navbar hidden on error pages."
    >
      <section className="app-hero">
        <div className="app-hero-content">
          <span className="badge">Next.js App Router</span>
          <h2>Explore products with server-side data fetching</h2>
          <p className="text-muted">
            This section uses the App Router with MongoDB/Mongoose. Browse the catalog or
            test the dedicated error boundary demo.
          </p>
          <div className="actions-row">
            <Link href="/app/products" className="btn btn-primary">
              Browse all products
            </Link>
            <Link href="/app/products/boom" className="btn btn-outline">
              Error demo
            </Link>
          </div>
        </div>

        <div className="app-stats">
          <div className="app-stat-card">
            <strong>{products.length}</strong>
            <span>Products in DB</span>
          </div>
          <div className="app-stat-card">
            <strong>GET</strong>
            <span>List + details</span>
          </div>
          <div className="app-stat-card">
            <strong>SSR</strong>
            <span>Server components</span>
          </div>
        </div>
      </section>

      <section className="app-section">
        <div className="section-heading">
          <h2>Lab features</h2>
          <p className="text-muted">What this App Router section demonstrates.</p>
        </div>

        <div className="card-grid">
          <article className="card app-feature-card">
            <span className="feature-icon">📦</span>
            <h3>Products listing</h3>
            <p className="text-muted">Fetch all products directly from MongoDB on the server.</p>
            <Link href="/app/products" className="btn btn-primary">
              Open products
            </Link>
          </article>

          <article className="card app-feature-card">
            <span className="feature-icon">🔍</span>
            <h3>Product details</h3>
            <p className="text-muted">Dynamic route `/app/products/[id]` with GET by id.</p>
            {featuredProducts[0] ? (
              <Link href={`/app/products/${featuredProducts[0].id}`} className="btn btn-outline">
                View sample product
              </Link>
            ) : (
              <span className="badge">No products yet</span>
            )}
          </article>

          <article className="card app-feature-card">
            <span className="feature-icon">⚠️</span>
            <h3>Error boundary</h3>
            <p className="text-muted">Navbar is hidden on the error page only.</p>
            <Link href="/app/products/boom" className="btn btn-outline">
              Trigger error
            </Link>
          </article>
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="app-section">
          <div className="section-heading">
            <h2>Featured products</h2>
            <Link href="/app/products" className="btn btn-ghost">
              View all
            </Link>
          </div>

          <div className="card-grid">
            {featuredProducts.map((product) => (
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
        </section>
      )}
    </AppMainLayout>
  );
}
