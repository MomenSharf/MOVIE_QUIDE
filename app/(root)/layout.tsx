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
          className={`${outfit.className} flex flex-col bg-semi-dark text-white w-full min-h-screen sm:flex-row`}
        >
          <Navbar />
          <main className="mt-20 p-5 flex-1 overflow-hidden">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
