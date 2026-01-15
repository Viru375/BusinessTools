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
                <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                    <div className="hidden border-r bg-muted/40 md:block max-h-screen sticky top-0 overflow-y-auto">
                        <div className="flex h-full max-h-screen flex-col gap-2">
                            <SidebarContent />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <Navbar />
                        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-slate-50/50">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}
