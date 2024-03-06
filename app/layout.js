import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./context/Provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Headnest",
  description: "Your comprehensive solution for monitoring and fostering mental health and wellness among team members.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
      <body className={inter.className}>
        {children}
      </body>
      </Provider>
    </html>
  );
}
