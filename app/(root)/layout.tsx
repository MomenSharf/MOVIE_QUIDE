import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "@/app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import Navbar from "@/components/Navbar";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Guide",
  description: "injoy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${outfit.className} bg-semi-dark text-white w-full min-h-screen`}
        >
          <Navbar/>
          <main className="pt-20">
          {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
