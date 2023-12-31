import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clerkie Challenge!",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <div className="sticky">
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col">
            <div className="sticky top-0 z-50">
              <Header />
            </div>
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
