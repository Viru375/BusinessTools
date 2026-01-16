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

export function KvpCalculator() {
    const [investment, setInvestment] = useState(50000);

    // Current KVP Rate: 7.5% (Compounded Annually) -> Doubles in 115 Months (9 Years 7 Months)
    // Note: Rates change quarterly. Hardcoding standard latest for now.
    const RATE = 7.5;
    const MONTHS_TO_DOUBLE = 115;

    const maturityAmount = investment * 2;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>KVP Inputs</CardTitle>
                    <CardDescription>Kisan Vikas Patra (Rate: {RATE}%)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>One-time Investment Amount (₹)</Label>
                        <Input type="number" value={investment} onChange={(e) => setInvestment(Number(e.target.value))} />
                        <Slider value={[investment]} onValueChange={(v) => setInvestment(v[0])} min={1000} max={1000000} step={1000} />
                        <p className="text-xs text-muted-foreground">Min ₹1000, No Max limit.</p>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Maturity Value</CardTitle></CardHeader>
                    <CardContent className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">
                            ₹ {maturityAmount.toLocaleString("en-IN")}
                        </div>
                        <div className="mt-4 p-4 bg-background rounded border">
                            <p className="font-semibold text-lg text-foreground">Doubles in {Math.floor(MONTHS_TO_DOUBLE / 12)} Years & {MONTHS_TO_DOUBLE % 12} Months</p>
                            <p className="text-xs text-muted-foreground mt-1">Lock-in Period: 2 Years 6 Months</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
