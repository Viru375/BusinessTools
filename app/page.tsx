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
        <div className="space-y-8 animate-[fadeIn_0.6s_ease-out]">
            <div className="text-center space-y-4">
                <h1 className="page-title">Business Tools</h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                    77 powerful financial calculators and utilities for investment, banking, tax, and everyday business decisions.
                </p>
                <div className="flex justify-center gap-4 mt-6">
                    <div className="stats-badge">
                        <span className="gradient-text">77 Tools</span>
                    </div>
                    <div className="stats-badge">
                        <span className="gradient-text">12 Categories</span>
                    </div>
                    <div className="stats-badge">
                        <span className="gradient-text">Free Forever</span>
                    </div>
                </div>
            </div>
            <div className="tools-grid">
                {toolsData.map((cluster, index) => (
                    <Link href={`/tools/${cluster.slug}`} key={cluster.slug} className="group block h-full animate-[fadeIn_0.6s_ease-out_0.1s] hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                        <Card className="h-full category-card card-hover cursor-pointer">
                            <CardHeader className="space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="icon-wrapper">
                                        {cluster.tools.length}
                                    </div>
                                    <div className="stats-badge">
                                        <span className="text-gray-600">{cluster.tools.length}</span>
                                    </div>
                                </div>
                                <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                    {cluster.name}
                                </CardTitle>
                                <CardDescription className="text-sm text-muted-foreground">
                                    <div className="font-medium text-gray-700 mb-2">{cluster.tools.length} Professional Tools</div>
                                    <div className="text-xs text-gray-500 line-clamp-3 bg-gray-50 rounded-lg p-2">
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
