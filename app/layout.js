import "./globals.css";

export const metadata = {
  title: "Security Testing Demo",
  description: "A simple non-sensitive message submission demo."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
