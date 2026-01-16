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

export function HomeAffordabilityCalculator() {
    const [grossIncome, setGrossIncome] = useState(100000); // Monthly
    const [existingEmi, setExistingEmi] = useState(10000);
    const [loanTenure, setLoanTenure] = useState(20);
    const [interestRate, setInterestRate] = useState(8.5);
    const [downPayment, setDownPayment] = useState(1000000); // Cash in hand

    // Logic: 
    // Banks considering 50-60% FOIR (Fixed Obligation to Income Ratio). Let's use 50%.
    const maxAllowableEmiAll = grossIncome * 0.50;
    const availableEmi = Math.max(0, maxAllowableEmiAll - existingEmi);

    // Calculate Loan Amount for this EMI
    // P = (E * ((1+r)^n - 1)) / (r * (1+r)^n)

    const r = interestRate / 12 / 100;
    const n = loanTenure * 12;

    const loanEligible = availableEmi * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)));

    const affordPrice = loanEligible + downPayment;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Financial Profile</CardTitle>
                    <CardDescription>Check buying power.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Monthly Gross Income (₹)</Label>
                        <Input type="number" value={grossIncome} onChange={(e) => setGrossIncome(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>Existing Monthly EMIs (₹)</Label>
                        <Input type="number" value={existingEmi} onChange={(e) => setExistingEmi(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>Cash for Down Payment (₹)</Label>
                        <Input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <Label>Loan Tenure (Years)</Label>
                            <Slider value={[loanTenure]} onValueChange={(v) => setLoanTenure(v[0])} min={5} max={30} />
                            <div className="text-right text-xs">{loanTenure} Y</div>
                        </div>
                        <div className="space-y-3">
                            <Label>Interest Rate (%)</Label>
                            <Input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Affordability</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">Max Property Budget</div>
                            <div className="text-4xl font-bold text-primary">
                                ₹ {(affordPrice / 100000).toFixed(2)} Lakhs
                            </div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-xs text-muted-foreground">Eligible Loan Amount</div>
                                <div className="font-semibold text-green-600">₹ {(loanEligible / 100000).toFixed(2)} L</div>
                            </div>
                            <div>
                                <div className="text-xs text-muted-foreground">Max EMI Capacity</div>
                                <div className="font-semibold">₹ {Math.round(availableEmi).toLocaleString()}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
