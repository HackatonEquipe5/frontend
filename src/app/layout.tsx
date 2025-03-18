import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./header";
import "../lib/fontawesome";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "VirtuCafé - Accueil",
    description: "VirtuCafé, et votre café coule de source !",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <Header />
        <div className="min-h-screen p-8 bg-gradient-to-br from-[#2e1b0c] to-[#1c0f05] text-white">
            {children}
        </div>
        </body>
        </html>
    );
}