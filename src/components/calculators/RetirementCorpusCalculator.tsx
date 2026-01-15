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

export function RetirementCorpusCalculator() {
    const [currentExpense, setCurrentExpense] = useState(50000); // Monthly
    const [currentAge, setCurrentAge] = useState(30);
    const [retireAge, setRetireAge] = useState(60);
    const [lifeExpectancy, setLifeExpectancy] = useState(85);
    const [inflation, setInflation] = useState(6);

    const [corpusNeeded, setCorpusNeeded] = useState(0);
    const [monthlyExpenseAtRetirement, setMonthlyExpenseAtRetirement] = useState(0);

    useEffect(() => {
        // 1. Calculate Monthly Expense at Retirement time (FV)
        const yearsToRetire = retireAge - currentAge;
        const expenseAtRetirement = currentExpense * Math.pow((1 + inflation / 100), yearsToRetire);

        setMonthlyExpenseAtRetirement(Math.round(expenseAtRetirement));

        // 2. Calculate Corpus needed to sustain this for (LifeExpectancy - RetireAge) years
        // Assumption: Post-retirement return = Inflation (Real return 0 for safety)
        // If Real Return > 0, Corpus needed is less.
        // Let's assume a safe conservative liquid fund return approx equal to inflation.
        // Then Corpus = Annual Expense * Years

        const yearsInRetirement = lifeExpectancy - retireAge;
        const annualExpenseAtRetirement = expenseAtRetirement * 12;

        const corpus = annualExpenseAtRetirement * yearsInRetirement;
        setCorpusNeeded(Math.round(corpus));

    }, [currentExpense, currentAge, retireAge, lifeExpectancy, inflation]);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Lifestyle Inputs</CardTitle>
                    <CardDescription>Estimate your target nest egg.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Current Monthly Expenses (₹)</Label>
                        <Input type="number" value={currentExpense} onChange={(e) => setCurrentExpense(Number(e.target.value))} />
                        <Slider value={[currentExpense]} onValueChange={(v) => setCurrentExpense(v[0])} min={10000} max={200000} step={1000} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <Label>Current Age</Label>
                            <Input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} />
                        </div>
                        <div className="space-y-3">
                            <Label>Retirement Age</Label>
                            <Input type="number" value={retireAge} onChange={(e) => setRetireAge(Number(e.target.value))} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label>Life Expectancy</Label>
                        <Input type="number" value={lifeExpectancy} onChange={(e) => setLifeExpectancy(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>Expected Inflation (%)</Label>
                        <Input type="number" value={inflation} onChange={(e) => setInflation(Number(e.target.value))} />
                        <Slider value={[inflation]} onValueChange={(v) => setInflation(v[0])} min={4} max={10} step={0.5} />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Required Corpus</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">You need to save</div>
                            <div className="text-4xl font-bold text-primary">
                                ₹ {corpusNeeded.toLocaleString("en-IN")}
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">by age {retireAge}</p>
                        </div>

                        <div className="p-4 bg-background rounded-lg border">
                            <div className="text-sm text-muted-foreground">Monthly Expense at Age {retireAge}</div>
                            <div className="text-2xl font-bold text-red-600">
                                ₹ {monthlyExpenseAtRetirement.toLocaleString("en-IN")}
                            </div>
                            <p className="text-xs text-muted-foreground">Due to {inflation}% inflation</p>
                        </div>

                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                            <strong>Note:</strong> This assumes your post-retirement investment returns exactly match inflation (0% real return). If you beat inflation, you need less.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
