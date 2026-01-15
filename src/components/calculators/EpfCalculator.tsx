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
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export function EpfCalculator() {
    const [basicSalary, setBasicSalary] = useState(25000); // Monthly
    const [currentAge, setCurrentAge] = useState(25);
    const [retireAge, setRetireAge] = useState(58);
    const [interestRate, setInterestRate] = useState(8.25); // Current EPF Rate
    const [employerContributionRate, setEmployerContributionRate] = useState(12);
    const [annualIncrease, setAnnualIncrease] = useState(5); // % Salary hike

    const [result, setResult] = useState({
        invested: 0,
        interest: 0,
        maturity: 0
    });

    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        // EPF Logic:
        // Employee: 12% of Basic
        // Employer: 12% of Basic (minus EPS)
        // EPS: 8.33% of Basic (capped at 15000 basic -> 1250/mo max). 
        // Rest goes to EPF.
        // If Basic > 15000:
        // EPS = 1250 fixed.
        // Employer EPF = (12% of Basic) - 1250.

        // Simplification for Calculator:
        // Assume Full EPF contribution is used for corpus calculation (EPS is separate pension).
        // Let's model the EPF part only.

        let balance = 0;
        let totalInvested = 0;
        let currentBasic = basicSalary;
        const data = [];
        const years = retireAge - currentAge;

        const currentYear = new Date().getFullYear();

        for (let i = 0; i < years; i++) {
            // Monthly calculation for better compounding accuracy (simplified to yearly loop for graph speed)
            // Let's do yearly accumulation

            let yearlyEmployeeContrib = 0;
            let yearlyEmployerContrib = 0;

            // Capped Basic for EPS is 15000
            let EPS_Deduction = 0;
            if (currentBasic > 15000) {
                EPS_Deduction = 1250;
            } else {
                EPS_Deduction = currentBasic * 0.0833;
            }

            // Employee Contrib = 12%
            const empValidBasic = currentBasic;
            const empContribMonth = empValidBasic * 0.12;

            // Employer Contrib = 12% - EPS
            const employerTotalMonth = empValidBasic * 0.12; // Matching 12% usually
            const epfEmployerMonth = employerTotalMonth - EPS_Deduction;

            const totalMonthlyContrib = empContribMonth + epfEmployerMonth;

            // Add 12 months with interest
            // Approximation: Add contribution at year end or average? 
            // Better: Balance * (1+r) + Contrib * (1+r/2) approx.

            const yearlyContrib = totalMonthlyContrib * 12;

            // Interest on opening balance
            const interestOnBalance = balance * (interestRate / 100);

            // Interest on new contributions (avg 6 months)
            const interestOnContrib = yearlyContrib * (interestRate / 100) * 0.5;

            const totalInterest = interestOnBalance + interestOnContrib;

            balance = balance + yearlyContrib + totalInterest;
            totalInvested += yearlyContrib;

            data.push({
                year: currentYear + i,
                age: currentAge + i + 1,
                value: Math.round(balance),
                invested: Math.round(totalInvested)
            });

            // Annual Hike
            currentBasic = currentBasic * (1 + annualIncrease / 100);
        }

        setResult({
            invested: Math.round(totalInvested),
            interest: Math.round(balance - totalInvested),
            maturity: Math.round(balance)
        });
        setChartData(data);

    }, [basicSalary, currentAge, retireAge, interestRate, annualIncrease]);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>EPF Inputs</CardTitle>
                    <CardDescription>Employee Provident Fund Estimator.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Monthly Basic Salary + DA (₹)</Label>
                        <Input type="number" value={basicSalary} onChange={(e) => setBasicSalary(Number(e.target.value))} />
                        <Slider value={[basicSalary]} onValueChange={(v) => setBasicSalary(v[0])} min={5000} max={200000} step={1000} />
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
                        <Label>Current EPF Interest Rate (%)</Label>
                        <Input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>Annual Salary Increase (%)</Label>
                        <Input type="number" value={annualIncrease} onChange={(e) => setAnnualIncrease(Number(e.target.value))} />
                        <Slider value={[annualIncrease]} onValueChange={(v) => setAnnualIncrease(v[0])} min={0} max={15} step={0.5} />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Accumulated Corpus</CardTitle></CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-center text-primary">
                            ₹ {result.maturity.toLocaleString("en-IN")}
                        </div>
                        <p className="text-center text-sm text-muted-foreground mt-2">
                            at age {retireAge}
                        </p>

                        <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-center">
                            <div>
                                <span className="text-muted-foreground block">Total Contribution</span>
                                <span className="font-semibold">₹ {result.invested.toLocaleString("en-IN")}</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground block">Total Interest</span>
                                <span className="font-semibold text-green-600">₹ {result.interest.toLocaleString("en-IN")}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Growth Chart</CardTitle></CardHeader>
                    <CardContent className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorValueEPF" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="age" />
                                <YAxis />
                                <Tooltip formatter={(value: number) => [`₹ ${value.toLocaleString("en-IN")}`, "Corpus"]} />
                                <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValueEPF)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
