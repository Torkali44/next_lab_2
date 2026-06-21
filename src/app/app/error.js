"use client";

export default function AppSectionError({ error, reset }) {
  return (
    <div className="error-page">
      <span className="badge">Error boundary</span>
      <h1>App Router Error</h1>
      <p className="text-muted">Navbar is hidden here — this is the dedicated error UI.</p>
      <p>{error.message}</p>
      <button type="button" className="btn btn-primary" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
