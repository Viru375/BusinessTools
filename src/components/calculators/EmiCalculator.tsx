"use client";

import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";

export function EmiCalculator() {
    const [loanAmount, setLoanAmount] = useState(5000000); // 50 Lakhs
    const [interestRate, setInterestRate] = useState(8.5);
    const [tenureYears, setTenureYears] = useState(20);

    const [result, setResult] = useState({
        monthlyEmi: 0,
        totalInterest: 0,
        totalAmount: 0,
    });

    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        // E = P * r * (1+r)^n / ((1+r)^n - 1)
        const P = loanAmount;
        const r = interestRate / 12 / 100;
        const n = tenureYears * 12;

        const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalAmount = emi * n;
        const totalInterest = totalAmount - P;

        setResult({
            monthlyEmi: Math.round(emi),
            totalInterest: Math.round(totalInterest),
            totalAmount: Math.round(totalAmount),
        });

        setChartData([
            { name: "Principal Amount", value: Math.round(P) },
            { name: "Total Interest", value: Math.round(totalInterest) },
        ]);
    }, [loanAmount, interestRate, tenureYears]);

    const COLORS = ["#10b981", "#ef4444"]; // Emerald for Principal, Red for Interest

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>EMI Inputs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Loan Amount (₹)</Label>
                            <Input
                                type="number"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(Number(e.target.value))}
                                className="w-32 h-8"
                            />
                        </div>
                        <Slider
                            value={[loanAmount]}
                            onValueChange={(v) => setLoanAmount(v[0])}
                            min={100000}
                            max={10000000}
                            step={10000}
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Interest Rate (% p.a)</Label>
                            <Input
                                type="number"
                                value={interestRate}
                                onChange={(e) => setInterestRate(Number(e.target.value))}
                                className="w-24 h-8"
                            />
                        </div>
                        <Slider
                            value={[interestRate]}
                            onValueChange={(v) => setInterestRate(v[0])}
                            min={1}
                            max={20}
                            step={0.1}
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Tenure (Years)</Label>
                            <Input
                                type="number"
                                value={tenureYears}
                                onChange={(e) => setTenureYears(Number(e.target.value))}
                                className="w-24 h-8"
                            />
                        </div>
                        <Slider
                            value={[tenureYears]}
                            onValueChange={(v) => setTenureYears(v[0])}
                            min={1}
                            max={30}
                            step={1}
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                        <CardTitle className="text-center text-primary">Loan EMI</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-center text-primary">
                            ₹ {result.monthlyEmi.toLocaleString("en-IN")}
                        </div>
                        <div className="mt-4 text-center text-sm text-muted-foreground">
                            per month
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Breakup</CardTitle></CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value: number) => `₹ ${value.toLocaleString("en-IN")}`} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
