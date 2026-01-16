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
import { Slider } from "@/components/ui/slider";

export function LoanEligibilityCalculator() {
    const [monthlyIncome, setMonthlyIncome] = useState(50000);
    const [interestRate, setInterestRate] = useState(8.5);
    const [tenureYears, setTenureYears] = useState(20);
    const [otherEmis, setOtherEmis] = useState(0);

    const [eligibility, setEligibility] = useState({
        maxEmi: 0,
        maxLoanAmount: 0
    });

    useEffect(() => {
        // FOIR assumption often 50% of Net Monthly Income
        const FOIR = 0.50;
        const netAvailable = (monthlyIncome * FOIR) - otherEmis;

        // If netAvailable <= 0, no loan
        if (netAvailable <= 0) {
            setEligibility({ maxEmi: 0, maxLoanAmount: 0 });
            return;
        }

        const maxEmi = netAvailable;

        // Reverse EMI formula: P = EMI * [ (1+r)^n - 1 ] / [ r * (1+r)^n ]
        const r = interestRate / 12 / 100;
        const n = tenureYears * 12;

        const maxLoan = maxEmi * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));

        setEligibility({
            maxEmi: Math.round(maxEmi),
            maxLoanAmount: Math.round(maxLoan)
        });

    }, [monthlyIncome, interestRate, tenureYears, otherEmis]);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Income Details</CardTitle>
                    <CardDescription>Check how much you can borrow.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Net Monthly Income (₹)</Label>
                        <Input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(Number(e.target.value))} />
                        <Slider value={[monthlyIncome]} onValueChange={(v) => setMonthlyIncome(v[0])} min={10000} max={500000} step={1000} />
                    </div>

                    <div className="space-y-3">
                        <Label>Existing Monthly EMIs (₹)</Label>
                        <Input type="number" value={otherEmis} onChange={(e) => setOtherEmis(Number(e.target.value))} />
                        <Slider value={[otherEmis]} onValueChange={(v) => setOtherEmis(v[0])} min={0} max={monthlyIncome} step={1000} />
                    </div>

                    <div className="space-y-3">
                        <Label>Interest Rate (% p.a)</Label>
                        <Input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>Tenure (Years)</Label>
                        <Input type="number" value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))} />
                        <Slider value={[tenureYears]} onValueChange={(v) => setTenureYears(v[0])} min={1} max={30} step={1} />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20 h-full flex flex-col justify-center">
                    <CardHeader>
                        <CardTitle className="text-center text-primary">Max Loan Eligibility</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <div className="text-5xl font-bold text-primary mb-2">
                            ₹ {eligibility.maxLoanAmount.toLocaleString("en-IN")}
                        </div>
                        <div className="mt-8 space-y-2">
                            <p className="text-muted-foreground text-sm">Max Affordable EMI</p>
                            <p className="text-xl font-semibold text-foreground">₹ {eligibility.maxEmi.toLocaleString("en-IN")} / month</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-4">
                            Assumes 50% of your net income is available for EMIs.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
