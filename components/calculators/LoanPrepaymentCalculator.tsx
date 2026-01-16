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

export function LoanPrepaymentCalculator() {
    const [loanAmount, setLoanAmount] = useState(2500000);
    const [interestRate, setInterestRate] = useState(8.5);
    const [tenureYears, setTenureYears] = useState(20);
    const [prepaymentAmount, setPrepaymentAmount] = useState(0); // Lumpsum prepayment
    // Could add monthly prepayment, but let's stick to lumpsum or 'extra monthly' model.
    // Let's do a simple "Lumpsum Prepayment now" model.

    const [result, setResult] = useState({
        originalInterest: 0,
        newInterest: 0,
        savedInterest: 0,
        newTenureMonths: 0
    });

    useEffect(() => {
        // EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
        const r = interestRate / 12 / 100;
        const n = tenureYears * 12;

        // Original Scenario
        const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalPayableOriginal = emi * n;
        const interestOriginal = totalPayableOriginal - loanAmount;

        // Prepayment Scenario
        // Assume prepayment happens at month 0 (start) or technically 'now' (balance reduced)
        // If reducing balance:
        const newPrincipal = loanAmount - prepaymentAmount;

        if (newPrincipal <= 0) {
            setResult({
                originalInterest: Math.round(interestOriginal),
                newInterest: 0,
                savedInterest: Math.round(interestOriginal),
                newTenureMonths: 0
            });
            return;
        }

        // Keep EMI same, reduce tenure
        // n = -log(1 - (r*P)/EMI) / log(1+r)

        const termInv = 1 - (r * newPrincipal) / emi;
        let newN = 0;

        if (termInv > 0) {
            newN = -Math.log(termInv) / Math.log(1 + r);
        } else {
            // EMI not enough to cover interest?? Shouldn't happen if Prepayment reduced Principal
            newN = n; // Fallback
        }

        const totalPayableNew = emi * newN;
        const interestNew = totalPayableNew - newPrincipal;

        setResult({
            originalInterest: Math.round(interestOriginal),
            newInterest: Math.round(interestNew),
            savedInterest: Math.round(interestOriginal - interestNew),
            newTenureMonths: Math.round(newN)
        });

    }, [loanAmount, interestRate, tenureYears, prepaymentAmount]);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Loan Details</CardTitle>
                    <CardDescription>Enter your existing loan details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Outstanding Loan Amount (₹)</Label>
                        <Input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
                        <Slider value={[loanAmount]} onValueChange={(v) => setLoanAmount(v[0])} min={100000} max={10000000} step={100000} />
                    </div>

                    <div className="space-y-3">
                        <Label>Interest Rate (% p.a)</Label>
                        <Input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
                        <Slider value={[interestRate]} onValueChange={(v) => setInterestRate(v[0])} min={5} max={15} step={0.1} />
                    </div>

                    <div className="space-y-3">
                        <Label>Remaining Tenure (Years)</Label>
                        <Input type="number" value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))} />
                        <Slider value={[tenureYears]} onValueChange={(v) => setTenureYears(v[0])} min={1} max={30} step={1} />
                    </div>

                    <div className="space-y-3 pt-4 border-t">
                        <Label className="text-green-600 font-semibold">One-time Prepayment Amount (₹)</Label>
                        <Input type="number" value={prepaymentAmount} onChange={(e) => setPrepaymentAmount(Number(e.target.value))} />
                        <Slider value={[prepaymentAmount]} onValueChange={(v) => setPrepaymentAmount(v[0])} min={0} max={loanAmount} step={10000} />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-green-50/50 border-green-200">
                    <CardHeader><CardTitle className="text-green-700">Prepayment Impact</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-center">
                            <div className="text-sm text-muted-foreground uppercase tracking-wider">Interest Saved</div>
                            <div className="text-4xl font-bold text-green-700">₹ {result.savedInterest.toLocaleString("en-IN")}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-white border rounded shadow-sm text-center">
                                <div className="text-xs text-muted-foreground">Original Interest</div>
                                <div className="font-semibold">₹ {result.originalInterest.toLocaleString("en-IN")}</div>
                            </div>
                            <div className="p-3 bg-white border rounded shadow-sm text-center">
                                <div className="text-xs text-muted-foreground">New Interest</div>
                                <div className="font-semibold text-green-600">₹ {result.newInterest.toLocaleString("en-IN")}</div>
                            </div>
                        </div>

                        <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-center">
                            <div className="text-sm text-blue-900">Tenure Reduced By</div>
                            <div className="text-2xl font-bold text-blue-700">
                                {Math.floor(((tenureYears * 12) - result.newTenureMonths) / 12)} Yrs {Math.round(((tenureYears * 12) - result.newTenureMonths) % 12)} Mos
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
