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
                    <Link href="/" className="mb-2 px-4 text-2xl font-bold text-primary flex items-center gap-2">
                        <Calculator className="h-6 w-6" />
                        Business Tools
                    </Link>
                    <div className="space-y-1">
                        <Accordion type="single" collapsible className="w-full">
                            {toolsData.map((cluster) => (
                                <AccordionItem value={cluster.slug} key={cluster.slug} className="border-none">
                                    <AccordionTrigger className="px-4 text-sm hover:no-underline hover:bg-slate-100 rounded-md">
                                        {cluster.name}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="flex flex-col space-y-1 pl-4">
                                            {cluster.tools.map((tool) => (
                                                <Link
                                                    key={tool.slug}
                                                    href={tool.path}
                                                    className="block rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-slate-100 hover:text-foreground"
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
