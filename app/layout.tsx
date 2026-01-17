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
                <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr] lg:grid-cols-[300px_1fr] bg-gradient-to-br from-slate-50 via-emerald-50/20 to-teal-50/20" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}>
                    <div className="hidden border-r border-emerald-100/60 bg-gradient-to-b from-emerald-50/30 to-white md:block max-h-screen sticky top-0 overflow-y-auto custom-scrollbar">
                        <div className="flex h-full max-h-screen flex-col gap-3 p-4">
                            <SidebarContent />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <Navbar />
                        <main className="flex flex-1 flex-col gap-8 p-6 lg:gap-10 lg:p-8 animate-[fadeIn_0.8s_ease-out]">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/80 backdrop-blur-sm -z-10" style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2314b8a6' fill-opacity='0.02'%3E%3Cpath d='M30 30 L40 40 L30 50 L20 40 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                            }}></div>
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}
