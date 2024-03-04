import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HeadNest",
  description: "Your comprehensive solution for monitoring and fostering mental health and wellness among team members.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <h1>Welcome to HeadNest</h1>
        </nav>
        {children}
      </body>
    </html>
  );
}
