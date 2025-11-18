import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Navbar from "./_components/navbar";
import { Toaster } from "sonner";
import { getAdminUser } from "./_data/get-admin-user";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "FinanceAI",
  description: "Developed by Gabriel Ambrogi",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAdmin = await getAdminUser();
  return (
    <html lang="en" className="h-screen">
      <body className={`${mulish.className} dark h-full antialiased`}>
        <ClerkProvider appearance={{ baseTheme: dark }}>
          <div className="flex h-full flex-col">
            <Navbar isAdmin={isAdmin} />
            <main className="flex-1 overflow-hidden">{children}</main>
          </div>
          <Toaster theme="dark" />
        </ClerkProvider>
      </body>
    </html>
  );
}
