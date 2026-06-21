import "@/styles/globals.css";

export const metadata = {
  title: "App Router Demo",
  description: "Next.js App Router lab",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
