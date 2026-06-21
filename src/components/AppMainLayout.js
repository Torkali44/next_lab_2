import AppNavbar from "@/components/AppNavbar";

export default function AppMainLayout({ title, subtitle, children }) {
  return (
    <>
      <AppNavbar />
      <main className="container app-page">
        {(title || subtitle) && (
          <header className="page-header">
            {title && <h1>{title}</h1>}
            {subtitle && <p className="text-muted">{subtitle}</p>}
          </header>
        )}
        {children}
      </main>
    </>
  );
}
