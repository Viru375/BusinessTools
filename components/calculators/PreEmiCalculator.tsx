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

export function PreEmiCalculator() {
    const [loanAmount, setLoanAmount] = useState(3000000); // Disbursed amount
    const [interestRate, setInterestRate] = useState(9);
    const [constructionMonths, setConstructionMonths] = useState(24);

    // Pre-EMI is simple interest on the disbursed amount usually.
    const annualInterest = loanAmount * (interestRate / 100);
    const monthlyInterest = annualInterest / 12;

    const totalPreEmiPaid = monthlyInterest * constructionMonths;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Loan Details</CardTitle>
                    <CardDescription>Under-construction property finance.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Disbursed Loan Amount (₹)</Label>
                        <Input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
                        <p className="text-xs text-muted-foreground">Amount released by bank so far.</p>
                    </div>

                    <div className="space-y-3">
                        <Label>Interest Rate (%)</Label>
                        <Input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>Construction/Possession Delay (Months)</Label>
                        <Input type="number" value={constructionMonths} onChange={(e) => setConstructionMonths(Number(e.target.value))} />
                        <Slider value={[constructionMonths]} onValueChange={(v) => setConstructionMonths(v[0])} min={1} max={60} />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Interest Liability</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">Monthly Pre-EMI</div>
                            <div className="text-4xl font-bold text-primary">
                                ₹ {Math.round(monthlyInterest).toLocaleString("en-IN")}
                            </div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border">
                            <div className="text-xs text-muted-foreground">Total Interest during Construction</div>
                            <div className="text-2xl font-bold text-red-600">
                                ₹ {Math.round(totalPreEmiPaid).toLocaleString("en-IN")}
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                This money does NOT reduce your principal.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
