import Link from "next/link";
import PagesLayout from "@/components/PagesLayout";

export default function Home() {
  return (
    <PagesLayout
      title="Home Page"
      subtitle="Pages Router lab with auth, CRUD, and SSR toasts."
    >
      <div className="card-grid">
        <div className="card">
          <h3>Products CRUD</h3>
          <p className="text-muted">
            Without session: GET all (3 only) and GET by id. With session: full CRUD.
          </p>
          <Link href="/products" className="btn btn-primary">
            Open Products
          </Link>
        </div>

        <div className="card">
          <h3>App Router</h3>
          <p className="text-muted">
            Navbar on normal pages, hidden on the dedicated error page.
          </p>
          <Link href="/app" className="btn btn-outline">
            Open App Router
          </Link>
        </div>
      </div>
    </PagesLayout>
  );
}
