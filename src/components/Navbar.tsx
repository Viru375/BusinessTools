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
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 shadow-sm">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col w-[300px] sm:w-[350px] p-0">
                    <div className="p-0 overflow-y-auto h-full">
                        <SidebarContent />
                    </div>
                </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2 md:hidden">
                <Calculator className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Business Tools</span>
            </div>

            <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
                {/* Add Search in future */}
            </div>
        </header>
    )
}
