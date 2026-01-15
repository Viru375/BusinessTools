import Link from "next/link";
import { notFound } from "next/navigation";
import { toolsData } from "@/lib/toolsData";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const cluster = toolsData.find((c) => c.slug === category);

    if (!cluster) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Button variant="ghost" size="sm" className="gap-2">
                        <ArrowLeft className="h-4 w-4" /> Back to Clusters
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight text-primary">{cluster.name}</h1>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cluster.tools.map((tool) => (
                    <Link href={tool.path} key={tool.slug} className="block h-full">
                        <Card className="h-full hover:shadow-md transition-shadow hover:border-primary/40">
                            <CardHeader>
                                <CardTitle className="text-lg">{tool.name}</CardTitle>
                                <CardDescription>{tool.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
