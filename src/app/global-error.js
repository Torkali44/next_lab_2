"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body style={{ padding: "20px" }}>
        <h1>Something went wrong</h1>
        <p>{error.message}</p>
        <button type="button" onClick={() => reset()}>
          Try again
        </button>
      </body>
    </html>
  );
}
