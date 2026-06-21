"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppNavbar() {
  const pathname = usePathname();

  const links = [
    { href: "/app", label: "Home", exact: true },
    { href: "/app/products", label: "Products" },
    { href: "/", label: "Pages Router" },
  ];

  return (
    <div className="app-shell-top">
      <nav className="nav-bar">
        <Link href="/app" className="nav-brand">
          App Router Lab
        </Link>
        <div className="nav-links">
          {links.map((link) => {
            const isActive = link.exact
              ? pathname === link.href
              : pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
