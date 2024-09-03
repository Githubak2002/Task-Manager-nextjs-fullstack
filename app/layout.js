// import { Inter } from "next/font/google";
import NavBar from "@/app/components/NavBar";
import "./globals.css";
import Footer from "@/app/components/Footer";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo Full stack app",
  description: "TODO with next js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="max-w-5xl mx-auto">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
