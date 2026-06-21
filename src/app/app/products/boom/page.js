"use client";

import { useState } from "react";
import AppNavbar from "@/components/AppNavbar";

function BoomTrigger() {
  throw new Error("Demo error — navbar is hidden on this error page.");
}

export default function BoomPage() {
  const [triggerError, setTriggerError] = useState(false);

  if (triggerError) {
    return <BoomTrigger />;
  }

  return (
    <>
      <AppNavbar />
      <main className="container app-page">
        <header className="page-header">
          <h1>Error demo</h1>
          <p className="text-muted">Navbar shows here. Click below to open the error page.</p>
        </header>

        <div className="card app-feature-card" style={{ maxWidth: "520px" }}>
          <span className="feature-icon">⚠️</span>
          <h3>Test error boundary</h3>
          <p className="text-muted">
            The next screen uses `app/error.js` and does not include the navbar.
          </p>
          <button type="button" className="btn btn-danger" onClick={() => setTriggerError(true)}>
            Trigger error
          </button>
        </div>
      </main>
    </>
  );
}
