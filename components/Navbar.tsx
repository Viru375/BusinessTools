"use client"

import { Menu, Calculator } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { SidebarContent } from "@/components/Sidebar"

export function Navbar() {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-emerald-100/60 glass px-4 md:px-6 shadow-lg backdrop-blur-xl">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0 md:hidden border-emerald-200 hover:bg-emerald-50 hover-lift">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col w-[300px] sm:w-[350px] p-0">
                    <div className="p-0 overflow-y-auto h-full custom-scrollbar">
                        <SidebarContent />
                    </div>
                </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2 md:hidden">
                <div className="icon-wrapper">
                    <Calculator className="h-4 w-4" />
                </div>
                <span className="text-lg font-bold navbar-brand">Business Tools</span>
            </div>

            <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <div className="hidden md:flex items-center gap-2">
                    <div className="icon-wrapper">
                        <Calculator className="h-4 w-4" />
                    </div>
                    <span className="text-lg font-bold navbar-brand">Business Tools</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="stats-badge">
                        <span className="text-xs">77 Tools</span>
                    </div>
                    <div className="stats-badge">
                        <span className="text-xs">Free</span>
                    </div>
                </div>
            </div>
        </header>
    )
}
