import Link from "next/link";
import AuthButtons from "@/components/AuthButtons";

export default function PagesLayout({
  title,
  subtitle,
  children,
  showAuth = true,
}) {
  return (
    <div className="container">
      <nav className="nav-bar">
        <Link href="/" className="nav-brand">
          Pages Router Lab
        </Link>
        <div className="nav-links">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/products" className="nav-link">
            Products
          </Link>
          <Link href="/app" className="nav-link">
            App Router
          </Link>
        </div>
      </nav>

      <header className="page-header">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </header>

      {showAuth && <AuthButtons />}

      <div style={{ marginTop: "1.5rem" }}>{children}</div>
    </div>
  );
}
