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
import { Slider } from "@/components/ui/slider";

export function InflationCalculator() {
    const [amount, setAmount] = useState(10000);
    const [years, setYears] = useState(10);
    const [inflationRate, setInflationRate] = useState(6);

    // FV = PV * (1 + r)^n
    const futureValue = amount * Math.pow((1 + inflationRate / 100), years);
    const purchasingPowerLoss = amount - (amount / Math.pow((1 + inflationRate / 100), years)); // Conceptually tricky to show.

    // Better Metric: "Worth of {amount} after {years} years" vs "Amount needed to equal buying power of {amount}"
    // The calculated futureValue is "Amount needed in future to match purchasing power of today's Amount".

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Inflation Inputs</CardTitle>
                    <CardDescription>Future Value of Money.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Current Amount (₹)</Label>
                        <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>Time Period (Years)</Label>
                        <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
                        <Slider value={[years]} onValueChange={(v) => setYears(v[0])} min={1} max={50} step={1} />
                    </div>

                    <div className="space-y-3">
                        <Label>Inflation Rate (%)</Label>
                        <Input type="number" value={inflationRate} onChange={(e) => setInflationRate(Number(e.target.value))} />
                        <Slider value={[inflationRate]} onValueChange={(v) => setInflationRate(v[0])} min={1} max={15} step={0.5} />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Future Value</CardTitle></CardHeader>
                    <CardContent className="space-y-6 text-center">
                        <div>
                            <div className="text-sm text-muted-foreground">In {years} years, you will need</div>
                            <div className="text-4xl font-bold text-primary">
                                ₹ {Math.round(futureValue).toLocaleString("en-IN")}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">to buy what <strong>₹ {amount.toLocaleString()}</strong> buys today.</div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border">
                            <div className="text-sm text-red-600">Purchasing Power Erosion</div>
                            <div className="text-muted-foreground text-sm mt-2">
                                Today's <strong>₹ {amount.toLocaleString()}</strong> will only be worth about
                                <strong> ₹ {Math.round(amount / Math.pow((1 + inflationRate / 100), years)).toLocaleString("en-IN")} </strong>
                                in {years} years.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
