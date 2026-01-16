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

export function NscCalculator() {
    const [investment, setInvestment] = useState(50000);

    // Current NSC Rate (VIII Issue): 7.7%
    const RATE = 7.7;
    const TENURE = 5;

    // Formula: P * (1 + r/100)^n
    const maturityAmount = Math.round(investment * Math.pow((1 + RATE / 100), TENURE));
    const interestEarned = maturityAmount - investment;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>NSC Inputs</CardTitle>
                    <CardDescription>National Savings Certificate (Rate: {RATE}%)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Investment Amount (₹)</Label>
                        <Input type="number" value={investment} onChange={(e) => setInvestment(Number(e.target.value))} />
                        <Slider value={[investment]} onValueChange={(v) => setInvestment(v[0])} min={1000} max={500000} step={1000} />
                        <p className="text-xs text-muted-foreground">Min ₹1000. Interest compounded annually but payable at maturity.</p>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Maturity Value (5 Yrs)</CardTitle></CardHeader>
                    <CardContent className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">
                            ₹ {maturityAmount.toLocaleString("en-IN")}
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-center">
                            <div>
                                <span className="text-muted-foreground block">Principal</span>
                                <span className="font-semibold">₹ {investment.toLocaleString("en-IN")}</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground block">Total Interest</span>
                                <span className="font-semibold text-green-600">₹ {interestEarned.toLocaleString("en-IN")}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
