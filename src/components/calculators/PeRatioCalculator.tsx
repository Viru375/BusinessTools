"use client";

import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function PeRatioCalculator() {
    const [sharePrice, setSharePrice] = useState(1000);
    const [eps, setEps] = useState(50); // Earning Per Share
    const [industryPe, setIndustryPe] = useState(25);

    const peRatio = eps > 0 ? sharePrice / eps : 0;

    // Interpretation
    let valuation = "Standard";
    let color = "text-muted-foreground";

    if (peRatio > industryPe * 1.5) {
        valuation = "Overvalued";
        color = "text-red-500";
    } else if (peRatio < industryPe * 0.7) {
        valuation = "Undervalued";
        color = "text-green-500";
    } else {
        valuation = "Fairly Valued";
        color = "text-yellow-600";
    }

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Stock Details</CardTitle>
                    <CardDescription>Evaluate valuation.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Current Share Price (₹)</Label>
                        <Input type="number" value={sharePrice} onChange={(e) => setSharePrice(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>EPS (Earnings Per Share) TTM</Label>
                        <Input type="number" value={eps} onChange={(e) => setEps(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>Industry / Peer Average PE</Label>
                        <Input type="number" value={industryPe} onChange={(e) => setIndustryPe(Number(e.target.value))} />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Valuation Check</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">P/E Ratio</div>
                            <div className="text-4xl font-bold text-primary">
                                {peRatio.toFixed(2)}
                            </div>
                        </div>

                        <div className={`p-4 bg-background rounded-lg border font-bold text-xl ${color}`}>
                            {valuation}
                        </div>

                        <div className="text-xs text-muted-foreground mt-2 px-4">
                            Stocks with PE lower than Industry PE ({industryPe}) are generally considered cheaper/undervalued.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
