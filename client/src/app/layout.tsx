import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/store/StoreProvieder";
import NextTopLoader from "nextjs-toploader";
import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/layout/header/NavBar";
import NavBarMobile from "@/components/layout/header/NavBarMobile";
import Footer from "@/components/layout/Footer";
import DisplayNotification from "@/components/DisplayNotification";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trang chủ",
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
            <DisplayNotification>
              <NavBar />
              {children}
              <NavBarMobile />
              <Footer />
            </DisplayNotification>
          </SessionProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
