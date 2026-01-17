"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { toolsData } from "@/lib/toolsData"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"

export function SidebarContent({ className }: { className?: string }) {
    return (
        <div className={cn("pb-12", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <Link href="/" className="mb-6 px-3 flex items-center gap-3 hover-lift">
                        <div className="icon-wrapper">
                            <Calculator className="h-5 w-5" />
                        </div>
                        <span className="navbar-brand text-xl">Business Tools</span>
                    </Link>
                    <div className="space-y-1">
                        <Accordion type="single" collapsible className="w-full space-y-3">
                            {toolsData.map((cluster) => (
                                <AccordionItem value={cluster.slug} key={cluster.slug} className="border-none rounded-xl category-card overflow-hidden">
                                    <AccordionTrigger className="px-4 py-4 text-sm font-medium hover:no-underline sidebar-item">
                                        <div className="flex items-center justify-between w-full">
                                            <span className="text-gray-800 font-semibold">{cluster.name}</span>
                                            <div className="flex items-center gap-2">
                                                <div className="stats-badge">
                                                    <span className="text-xs">{cluster.tools.length}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-0">
                                        <div className="flex flex-col space-y-1 px-3 pb-4">
                                            {cluster.tools.map((tool) => (
                                                <Link
                                                    key={tool.slug}
                                                    href={tool.path}
                                                    className="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 sidebar-item"
                                                >
                                                    <span className="flex items-center gap-2">
                                                        <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                                                        {tool.name}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    )
}
