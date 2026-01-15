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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {toolsData.map((cluster) => (
                <Link href={`/tools/${cluster.slug}`} key={cluster.slug} className="block h-full">
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer hover:border-primary/50">
                        <CardHeader>
                            <CardTitle className="text-xl text-primary">{cluster.name}</CardTitle>
                            <CardDescription>
                                {cluster.tools.length} Tools
                                <div className="mt-2 text-xs text-muted-foreground line-clamp-3">
                                    Includes: {cluster.tools.slice(0, 3).map(t => t.name).join(", ")}...
                                </div>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
