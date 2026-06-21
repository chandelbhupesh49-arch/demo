import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Signup File Demo",
  description: "A simple Next.js signup form that stores submissions in a server folder."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
