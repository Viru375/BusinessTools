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

export function DividendYieldCalculator() {
    const [sharePrice, setSharePrice] = useState(1500);
    const [dividendPerShare, setDividendPerShare] = useState(30);
    const [quantity, setQuantity] = useState(100);

    const yieldPercent = sharePrice > 0 ? (dividendPerShare / sharePrice) * 100 : 0;
    const totalDividend = dividendPerShare * quantity;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Dividend Inputs</CardTitle>
                    <CardDescription>Calculate yield percentage.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Current Share Price (₹)</Label>
                        <Input type="number" value={sharePrice} onChange={(e) => setSharePrice(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>Annual Dividend Per Share (₹)</Label>
                        <Input type="number" value={dividendPerShare} onChange={(e) => setDividendPerShare(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>Quantity Held (Optional)</Label>
                        <Input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Yield Summary</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">Dividend Yield</div>
                            <div className="text-4xl font-bold text-primary">
                                {yieldPercent.toFixed(2)} %
                            </div>
                        </div>

                        {quantity > 0 && (
                            <div className="p-4 bg-background rounded-lg border">
                                <div className="text-sm text-muted-foreground">Total Annual Income</div>
                                <div className="text-2xl font-bold text-green-600">
                                    ₹ {totalDividend.toLocaleString("en-IN")}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mt-4">
                            <div className="p-2 border rounded">FD Avg: ~7%</div>
                            <div className="p-2 border rounded">Savings Avg: ~3%</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
