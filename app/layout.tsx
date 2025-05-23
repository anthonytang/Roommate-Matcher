import type { Metadata } from "next";
import { Geist, Geist_Mono, Zilla_Slab } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";
import AutoLogoutProvider from "@/components/AutoLogoutProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const zillaSlab = Zilla_Slab({
  variable: "--font-zilla-slab",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Owl Match",
  description: "Find your perfect roommate match!",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} ${zillaSlab.variable} bg-neutral-50 text-neutral-900 antialiased`}>
          <ClientProviders>
            <AutoLogoutProvider />
            {children}
          </ClientProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
