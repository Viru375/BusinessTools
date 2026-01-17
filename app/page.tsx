import Link from "next/link";
import { toolsData } from "@/lib/toolsData";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function Home() {
    return (
        <div className="space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Business Tools
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                    77 powerful financial calculators and utilities for investment, banking, tax, and everyday business decisions.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {toolsData.map((cluster) => (
                    <Link href={`/tools/${cluster.slug}`} key={cluster.slug} className="group block h-full">
                        <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-white to-emerald-50/30 hover:scale-105 hover:border-emerald-200">
                            <CardHeader className="space-y-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                    {cluster.tools.length}
                                </div>
                                <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                    {cluster.name}
                                </CardTitle>
                                <CardDescription className="text-sm text-muted-foreground">
                                    <div className="font-medium text-gray-700">{cluster.tools.length} Tools</div>
                                    <div className="mt-2 text-xs text-gray-500 line-clamp-3">
                                        {cluster.tools.slice(0, 3).map(t => t.name).join(", ")}...
                                    </div>
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
        </div>
        </div>
    );
}
