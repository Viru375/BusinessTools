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

export function ScssCalculator() {
    const [investment, setInvestment] = useState(1500000); // Max 30L
    const [rate, setRate] = useState(8.2); // Current SCSS Rate

    // SCSS pays significantly simpler interest logic
    // Interest is paid Quarterly.
    const annualInterest = investment * (rate / 100);
    const quarterlyInterest = annualInterest / 4;
    const totalInterest5Years = annualInterest * 5;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>SCSS Inputs</CardTitle>
                    <CardDescription>Senior Citizen Savings Scheme (5 Years).</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Lumpsum Investment (₹)</Label>
                        <Input type="number" value={investment} onChange={(e) => setInvestment(Number(e.target.value))} />
                        <Slider value={[investment]} onValueChange={(v) => setInvestment(v[0])} min={1000} max={3000000} step={5000} />
                        <p className="text-xs text-muted-foreground">Min ₹1,000. Max ₹30 Lakhs.</p>
                    </div>

                    <div className="space-y-3">
                        <Label>Interest Rate (%)</Label>
                        <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
                        <p className="text-xs text-muted-foreground">Current Rate: 8.2%</p>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Payout Summary</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">Quarterly Payout</div>
                            <div className="text-4xl font-bold text-primary">
                                ₹ {Math.round(quarterlyInterest).toLocaleString("en-IN")}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">Paid directly to bank account</div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-xs text-muted-foreground">Total Interest (5Y)</div>
                                <div className="font-semibold text-green-600">₹ {Math.round(totalInterest5Years).toLocaleString("en-IN")}</div>
                            </div>
                            <div>
                                <div className="text-xs text-muted-foreground">Maturity Value</div>
                                {/* Returns Principal at end */}
                                <div className="font-semibold">₹ {investment.toLocaleString("en-IN")}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
