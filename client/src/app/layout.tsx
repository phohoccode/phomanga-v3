import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StoreProvider } from "@/store/StoreProvieder";
import NextTopLoader from "nextjs-toploader";
import { SessionProvider } from "next-auth/react";
import App from "@/components/App";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PHOMANGA-V3 - By phohoccode",
  description: "Website đọc truyện tranh online miễn phí",
  icons: {
    icon: "/logo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="vi" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <NextTopLoader color="#13c2c2" showSpinner={false} height={2} />
          <SessionProvider>
            <App>{children}</App>
          </SessionProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
