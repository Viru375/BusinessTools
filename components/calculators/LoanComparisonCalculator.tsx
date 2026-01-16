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

export function LoanComparisonCalculator() {
    const [loanA, setLoanA] = useState({ amount: 1000000, rate: 8.5, tenure: 10, fees: 5000 });
    const [loanB, setLoanB] = useState({ amount: 1000000, rate: 8.2, tenure: 10, fees: 10000 });

    const [resultA, setResultA] = useState({ emi: 0, totalPayment: 0, totalInterest: 0 });
    const [resultB, setResultB] = useState({ emi: 0, totalPayment: 0, totalInterest: 0 });

    const calculateLoan = (amount: number, rate: number, tenure: number, fees: number) => {
        const r = rate / 12 / 100;
        const n = tenure * 12;
        const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalPayment = (emi * n) + fees;
        const totalInterest = (emi * n) - amount;
        return { emi: Math.round(emi), totalPayment: Math.round(totalPayment), totalInterest: Math.round(totalInterest) };
    };

    useEffect(() => {
        setResultA(calculateLoan(loanA.amount, loanA.rate, loanA.tenure, loanA.fees));
        setResultB(calculateLoan(loanB.amount, loanB.rate, loanB.tenure, loanB.fees));
    }, [loanA, loanB]);

    return (
        <div className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
                {/* Loan A Inputs */}
                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                        <CardTitle className="text-blue-600">Loan Option A</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Loan Amount</Label>
                            <Input type="number" value={loanA.amount} onChange={(e) => setLoanA({ ...loanA, amount: Number(e.target.value) })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Inc. Rate (%)</Label>
                                <Input type="number" value={loanA.rate} onChange={(e) => setLoanA({ ...loanA, rate: Number(e.target.value) })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Tenure (Y)</Label>
                                <Input type="number" value={loanA.tenure} onChange={(e) => setLoanA({ ...loanA, tenure: Number(e.target.value) })} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Processing Fees</Label>
                            <Input type="number" value={loanA.fees} onChange={(e) => setLoanA({ ...loanA, fees: Number(e.target.value) })} />
                        </div>
                    </CardContent>
                </Card>

                {/* Loan B Inputs */}
                <Card className="border-l-4 border-l-purple-500">
                    <CardHeader>
                        <CardTitle className="text-purple-600">Loan Option B</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Loan Amount</Label>
                            <Input type="number" value={loanB.amount} onChange={(e) => setLoanB({ ...loanB, amount: Number(e.target.value) })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Inc. Rate (%)</Label>
                                <Input type="number" value={loanB.rate} onChange={(e) => setLoanB({ ...loanB, rate: Number(e.target.value) })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Tenure (Y)</Label>
                                <Input type="number" value={loanB.tenure} onChange={(e) => setLoanB({ ...loanB, tenure: Number(e.target.value) })} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Processing Fees</Label>
                            <Input type="number" value={loanB.fees} onChange={(e) => setLoanB({ ...loanB, fees: Number(e.target.value) })} />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Comparison Result */}
            <Card className="bg-muted/10">
                <CardHeader><CardTitle className="text-center">Recommendation</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-center">
                        {resultA.totalPayment < resultB.totalPayment ? (
                            <span className="text-2xl font-bold text-blue-600">Loan Option A is Cheaper by ₹ {(resultB.totalPayment - resultA.totalPayment).toLocaleString("en-IN")}</span>
                        ) : (
                            <span className="text-2xl font-bold text-purple-600">Loan Option B is Cheaper by ₹ {(resultA.totalPayment - resultB.totalPayment).toLocaleString("en-IN")}</span>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="space-y-2">
                            <h4 className="font-semibold text-blue-600">Option A Summary</h4>
                            <div className="text-sm">EMI: <span className="font-bold">₹ {resultA.emi.toLocaleString("en-IN")}</span></div>
                            <div className="text-sm">Total Cost: <span className="font-bold">₹ {resultA.totalPayment.toLocaleString("en-IN")}</span></div>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-semibold text-purple-600">Option B Summary</h4>
                            <div className="text-sm">EMI: <span className="font-bold">₹ {resultB.emi.toLocaleString("en-IN")}</span></div>
                            <div className="text-sm">Total Cost: <span className="font-bold">₹ {resultB.totalPayment.toLocaleString("en-IN")}</span></div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
