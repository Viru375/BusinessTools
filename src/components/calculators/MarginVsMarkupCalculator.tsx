"use client";

import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function MarginVsMarkupCalculator() {
    const [cost, setCost] = useState(100);
    const [revenue, setRevenue] = useState(150);

    const [margin, setMargin] = useState(0);
    const [markup, setMarkup] = useState(0);
    const [profit, setProfit] = useState(0);

    useEffect(() => {
        // Profit = Revenue - Cost
        const p = revenue - cost;
        setProfit(p);

        // Margin = (Profit / Revenue) * 100
        if (revenue > 0) {
            setMargin((p / revenue) * 100);
        } else {
            setMargin(0);
        }

        // Markup = (Profit / Cost) * 100
        if (cost > 0) {
            setMarkup((p / cost) * 100);
        } else {
            setMarkup(0);
        }
    }, [cost, revenue]);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Price Inputs</CardTitle>
                    <CardDescription>Enter Cost and Selling Price.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Cost Price ($)</Label>
                        <Input type="number" value={cost} onChange={(e) => setCost(Number(e.target.value))} />
                    </div>
                    <div className="space-y-3">
                        <Label>Selling Price (Revenue) ($)</Label>
                        <Input type="number" value={revenue} onChange={(e) => setRevenue(Number(e.target.value))} />
                    </div>

                    <div className="p-4 bg-muted rounded text-sm text-muted-foreground">
                        <p><strong>Margin</strong> is % of Selling Price.</p>
                        <p><strong>Markup</strong> is % of Cost Price.</p>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Results</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <div className="text-sm text-muted-foreground">Gross Margin</div>
                                <div className="text-4xl font-bold text-primary">{margin.toFixed(2)}%</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Markup</div>
                                <div className="text-4xl font-bold text-blue-600">{markup.toFixed(2)}%</div>
                            </div>
                        </div>

                        <div className="text-center pt-4 border-t">
                            <div className="text-sm text-muted-foreground">Total Profit</div>
                            <div className="text-2xl font-bold text-green-600">$ {profit.toLocaleString()}</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
