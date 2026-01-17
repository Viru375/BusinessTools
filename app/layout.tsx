import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarContent } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Business Tools - Financial Calculators & Utilities",
    description: "A comprehensive suite of financial tools for investment, banking, tax, and more.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr] lg:grid-cols-[300px_1fr] bg-white">
                    <div className="hidden border-r border-emerald-100/60 bg-gradient-to-b from-emerald-50/30 to-white md:block max-h-screen sticky top-0 overflow-y-auto">
                        <div className="flex h-full max-h-screen flex-col gap-3 p-4">
                            <SidebarContent />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <Navbar />
                        <main className="flex flex-1 flex-col gap-8 p-6 lg:gap-10 lg:p-8 bg-gradient-to-br from-slate-50 via-emerald-50/20 to-teal-50/20">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}
