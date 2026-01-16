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

export function HlvCalculator() {
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(60);
    const [annualIncome, setAnnualIncome] = useState(1000000);
    const [annualExpenses, setAnnualExpenses] = useState(400000); // Personal expenses to deduct
    const [savings, setSavings] = useState(500000);
    const [liabilities, setLiabilities] = useState(2000000);
    const [inflation, setInflation] = useState(6);
    const [expectedReturn, setExpectedReturn] = useState(8); // On insurance corpus

    // Method: Income Efficiency
    // 1. Net Annual Income required for family = Income - Personal Expenses
    const netIncomeRequired = annualIncome - annualExpenses;

    // 2. Years left
    const yearsLeft = retirementAge - currentAge;

    // 3. Present Value of Future Income Streams
    // Real Rate of Return = ((1+Return)/(1+Inflation)) - 1
    const realRate = ((1 + expectedReturn / 100) / (1 + inflation / 100)) - 1;

    // PV = P * [ (1 - (1+r)^-n) / r ]
    const pvOfIncome = netIncomeRequired * ((1 - Math.pow(1 + realRate, -yearsLeft)) / realRate);

    // 4. HLV = PV + Liabilities - Existing Savings
    const hlv = pvOfIncome + liabilities - savings;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Details</CardTitle>
                    <CardDescription>Income Replacement Method.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <Label>Current Age</Label>
                            <Input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} />
                        </div>
                        <div className="space-y-3">
                            <Label>Retirement Age</Label>
                            <Input type="number" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label>Annual Income (₹)</Label>
                        <Input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>Self Expenses (₹)</Label>
                        <Input type="number" value={annualExpenses} onChange={(e) => setAnnualExpenses(Number(e.target.value))} />
                        <p className="text-xs text-muted-foreground">Amount spent on yourself (not family).</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <Label>Outstanding Loans</Label>
                            <Input type="number" value={liabilities} onChange={(e) => setLiabilities(Number(e.target.value))} />
                        </div>
                        <div className="space-y-3">
                            <Label>Current Savings</Label>
                            <Input type="number" value={savings} onChange={(e) => setSavings(Number(e.target.value))} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label>Inflation: {inflation}% | Expected Return: {expectedReturn}%</Label>
                        <Slider value={[expectedReturn]} onValueChange={(v) => setExpectedReturn(v[0])} min={5} max={15} step={0.5} />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Insurance Needed</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">Human Life Value (HLV)</div>
                            <div className="text-4xl font-bold text-primary">
                                ₹ {Math.round(Math.max(0, hlv)).toLocaleString("en-IN")}
                            </div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border text-left space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Family Income Support Needed</span>
                                <span className="font-semibold">₹ {Math.round(pvOfIncome).toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between text-red-600">
                                <span>+ Debt Payoff</span>
                                <span className="font-semibold">₹ {liabilities.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                                <span>- Existing Assets</span>
                                <span className="font-semibold">₹ {savings.toLocaleString("en-IN")}</span>
                            </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                            This amount ensures your family can maintain their current lifestyle and pay off debts if something happens to you today.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
