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

export function FinancialFreedomCalculator() {
    const [currentAge, setCurrentAge] = useState(30);
    const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
    const [currentCorpus, setCurrentCorpus] = useState(1000000); // Existing savings
    const [monthlyInvestment, setMonthlyInvestment] = useState(30000);
    const [expectedReturn, setExpectedReturn] = useState(10);
    const [inflation, setInflation] = useState(6);

    // Rule of thumb: Financial Freedom Corups = 25x Annual Expenses (4% withdrawal rate)
    // Adjusted for inflation? 
    // Let's project forward.

    // Real Rate
    const r = ((1 + expectedReturn / 100) / (1 + inflation / 100)) - 1;
    const yearlyRealRate = r; // Approx

    // Target Corpus in TODAY's money should be 25-30x annual expenses.
    const targetCorpusPresentValue = monthlyExpenses * 12 * 30; // 30x conservative

    // We need to find 'n' (years) where:
    // PV(Target) = PV(Existing + SIPs)
    // Or easier: Project future wealth in Real Terms until > Target

    let years = 0;
    let simulatedCorpus = currentCorpus;
    const monthlyRealRate = yearlyRealRate / 12;
    const annualInv = monthlyInvestment * 12; // Simplified annual addition for speed

    // Limit to 50 years calculation
    while (simulatedCorpus < targetCorpusPresentValue && years < 50) {
        simulatedCorpus = simulatedCorpus * (1 + yearlyRealRate) + annualInv;
        years++;
    }

    const freedomAge = currentAge + years;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Freedom Plan</CardTitle>
                    <CardDescription>When can you stop working?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Current Age: {currentAge}</Label>
                        <Slider value={[currentAge]} onValueChange={(v) => setCurrentAge(v[0])} min={18} max={60} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <Label>Current Savings (₹)</Label>
                            <Input type="number" value={currentCorpus} onChange={(e) => setCurrentCorpus(Number(e.target.value))} />
                        </div>
                        <div className="space-y-3">
                            <Label>Monthly Inv. (₹)</Label>
                            <Input type="number" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label>Monthly Expenses (₹)</Label>
                        <Input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} />
                        <p className="text-xs text-muted-foreground">Amount needed in today&apos;s value to live comfortably.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <Label>Exp. Return (%)</Label>
                            <Input type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} />
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
                    <CardHeader><CardTitle className="text-center text-primary">Freedom Timeline</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">Financial Freedom Age</div>
                            <div className="text-4xl font-bold text-primary">
                                {years < 50 ? freedomAge : "50+ Years"}
                            </div>
                            {years < 50 && <div className="text-xs text-muted-foreground mt-1">in {years} years</div>}
                        </div>

                        <div className="p-4 bg-background rounded-lg border text-sm space-y-2">
                            <div className="flex justify-between">
                                <span>Target Corpus (Today&apos;s Value)</span>
                                <span className="font-semibold">₹ {(targetCorpusPresentValue / 10000000).toFixed(2)} Cr</span>
                            </div>
                            <div className="text-xs text-muted-foreground text-left pt-2">
                                This target assumes you need a corpus that can generate ₹{monthlyExpenses.toLocaleString()}/mo inflation-adjusted, indefinitely (30x rule).
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
