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
import { Button } from "@/components/ui/button";

export function XirrCalculator() {
    const [sipAmount, setSipAmount] = useState(5000);
    const [currentValue, setCurrentValue] = useState(750000); // e.g. after 5 years
    const [startDate, setStartDate] = useState("2020-01-01");
    const [endDate, setEndDate] = useState("2025-01-01"); // 5 Years approx
    const [xirr, setXirr] = useState<number | null>(null);

    const calculateXirr = () => {
        // 1. Generate Cash Flows
        // Negative for investments (SIPs), Positive for redemption (Current Value)
        const cashFlows: { date: Date; amount: number }[] = [];
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Safety check date
        if (end <= start) {
            alert("End date must be after start date");
            return;
        }

        // Add monthly SIPs
        let currentDate = new Date(start);
        while (currentDate <= end) {
            cashFlows.push({
                date: new Date(currentDate),
                amount: -sipAmount // Outflow
            });
            // Add 1 month
            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        // Add Final Value (Inflow) at End Date
        cashFlows.push({
            date: end,
            amount: currentValue
        });

        // 2. Newton-Raphson logic to find XIRR
        // XNPV = sum( C_i / (1+r)^((d_i - d_0)/365) )
        // We need to find 'r' such that XNPV = 0.

        let rate = 0.1; // Initial guess 10%
        const maxErrors = 0.000001;
        const maxIter = 100;

        for (let i = 0; i < maxIter; i++) {
            const result = xnpv(rate, cashFlows);
            if (Math.abs(result.value) < maxErrors) {
                setXirr(rate * 100);
                return;
            }
            // New guess: rate = rate - f(rate)/f'(rate)
            rate = rate - result.value / result.derivative;
        }
        setXirr(null); // Failed to converge
    };

    const xnpv = (rate: number, flows: any[]) => {
        let value = 0;
        let derivative = 0;
        const t0 = flows[0].date.getTime();

        for (const flow of flows) {
            const t = (flow.date.getTime() - t0) / (1000 * 60 * 60 * 24 * 365); // Years diff
            const p = Math.pow(1 + rate, t);
            value += flow.amount / p;
            derivative -= (flow.amount * t) / (p * (1 + rate));
        }
        return { value, derivative };
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>XIRR Inputs</CardTitle>
                    <CardDescription>Calculate Return on SIP Investments.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Monthly SIP Amount (₹)</Label>
                        <Input type="number" value={sipAmount} onChange={(e) => setSipAmount(Number(e.target.value))} />
                    </div>
                    <div className="space-y-3">
                        <Label>Current Portfolio Value (₹)</Label>
                        <Input type="number" value={currentValue} onChange={(e) => setCurrentValue(Number(e.target.value))} />
                    </div>
                    <div className="space-y-3">
                        <Label>SIP Start Date</Label>
                        <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="space-y-3">
                        <Label>Valuation Date</Label>
                        <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    <Button onClick={calculateXirr} className="w-full">Calculate XIRR</Button>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20 h-full flex flex-col justify-center">
                    <CardHeader>
                        <CardTitle className="text-center text-primary">Your XIRR</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        {xirr !== null ? (
                            <>
                                <div className="text-6xl font-bold text-primary mb-2">
                                    {xirr.toFixed(2)} %
                                </div>
                                <p className="text-muted-foreground mt-2">
                                    Extended Internal Rate of Return
                                </p>
                            </>
                        ) : (
                            <p className="text-muted-foreground">Enter details and click Calculate.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
