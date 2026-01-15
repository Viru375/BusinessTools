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

export function FireCalculator() {
    const [annualExpenses, setAnnualExpenses] = useState(600000); // 50k per month
    const [currentInvestments, setCurrentInvestments] = useState(2000000);
    const [monthlySavings, setMonthlySavings] = useState(50000);
    const [returnRate, setReturnRate] = useState(10);
    const [inflation, setInflation] = useState(6);

    const [fireNumber, setFireNumber] = useState(0);
    const [yearsToFire, setYearsToFire] = useState(0);

    useEffect(() => {
        // 25X Rule (4% Withdrawal Rate)
        // Adjusted FIRE Number should technically account for inflation? 
        // Standard 25X rule is in "Today's Money".

        // Let's aim for a corpus that matches 25X (or 30X for safety) of today's expense.
        // BUT we need to project when our savings will hit that target, adjusting target for inflation?
        // Simplified Real Return approach:

        const realReturn = returnRate - inflation; // Effective growth in purchasing power
        const target = annualExpenses * 25; // Standard FIRE number (25x)

        setFireNumber(target);

        // Calculate time to reach target
        // FV = PV * (1+r)^n + PMT * [((1+r)^n - 1) / r]
        // We need to solve for n.
        // More simply, iterate month by month using real return.

        // If real return <= 0, might never reach if savings don't outpace target growth (which is 0 in real terms).

        if (realReturn <= 0) {
            // Simple linear approx if real return is 0
            const gap = target - currentInvestments;
            const annualSavings = monthlySavings * 12;
            if (annualSavings > 0) {
                setYearsToFire(gap / annualSavings);
            } else {
                setYearsToFire(999);
            }
            return;
        }

        let balance = currentInvestments;
        let months = 0;
        const monthlyRate = realReturn / 12 / 100;

        // Limit to 100 years calculation
        while (balance < target && months < 1200) {
            // Monthly compounding
            balance = balance * (1 + monthlyRate) + monthlySavings;
            months++;
        }

        setYearsToFire(months / 12);

    }, [annualExpenses, currentInvestments, monthlySavings, returnRate, inflation]);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>FIRE Inputs</CardTitle>
                    <CardDescription>Financial Independence, Retire Early.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Current Annual Expenses (₹)</Label>
                        <Input type="number" value={annualExpenses} onChange={(e) => setAnnualExpenses(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>Current Investments / Savings (₹)</Label>
                        <Input type="number" value={currentInvestments} onChange={(e) => setCurrentInvestments(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>Monthly Saving Addition (₹)</Label>
                        <Input type="number" value={monthlySavings} onChange={(e) => setMonthlySavings(Number(e.target.value))} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <Label>Investment Return (%)</Label>
                            <Input type="number" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} />
                        </div>
                        <div className="space-y-3">
                            <Label>Inflation (%)</Label>
                            <Input type="number" value={inflation} onChange={(e) => setInflation(Number(e.target.value))} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">FIRE Targets</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-8">
                        <div>
                            <div className="text-sm text-muted-foreground">FIRE Number (Target Corpus)</div>
                            <div className="text-4xl font-bold text-primary">
                                ₹ {fireNumber.toLocaleString("en-IN")}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">25x Annual Expenses (in today's value)</div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border">
                            <div className="text-sm text-muted-foreground">Time to Financial Freedom</div>
                            <div className="text-3xl font-bold text-green-600">
                                {yearsToFire.toFixed(1)} Years
                            </div>
                        </div>

                        <div className="p-2 text-xs text-muted-foreground text-left bg-muted rounded">
                            <strong>Assumption:</strong> Calculation uses "Real Return" (Return - Inflation) to keep the target constant in today's purchasing power. This shows when your buying power hits the 25x mark.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
