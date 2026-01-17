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
                    <Link href="/" className="mb-4 px-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg">
                            <Calculator className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Business Tools</span>
                    </Link>
                    <div className="space-y-1">
                        <Accordion type="single" collapsible className="w-full space-y-2">
                            {toolsData.map((cluster) => (
                                <AccordionItem value={cluster.slug} key={cluster.slug} className="border-none rounded-lg bg-white/60 backdrop-blur-sm border border-emerald-100/50 shadow-sm">
                                    <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline hover:bg-emerald-50/50 rounded-lg transition-colors">
                                        <span className="text-gray-700">{cluster.name}</span>
                                        <span className="text-xs text-emerald-600 font-semibold ml-auto mr-2">{cluster.tools.length}</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-0">
                                        <div className="flex flex-col space-y-1 px-2 pb-3">
                                            {cluster.tools.map((tool) => (
                                                <Link
                                                    key={tool.slug}
                                                    href={tool.path}
                                                    className="block rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                                                >
                                                    {tool.name}
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
