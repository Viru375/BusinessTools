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

export function SwpCalculator() {
    const [initialInvestment, setInitialInvestment] = useState(1000000);
    const [withdrawalPerMonth, setWithdrawalPerMonth] = useState(5000);
    const [durationYears, setDurationYears] = useState(10);
    const [expectedReturn, setExpectedReturn] = useState(8);

    const [result, setResult] = useState({
        totalWithdrawn: 0,
        finalValue: 0,
        profit: 0
    });

    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        let balance = initialInvestment;
        let totalWithdrawn = 0;
        const data = [];

        // Monthly Calculation
        const months = durationYears * 12;
        const monthlyRate = expectedReturn / 12 / 100;

        for (let i = 1; i <= months; i++) {
            // Interest earned for the month
            const interest = balance * monthlyRate;

            // Add interest
            balance += interest;

            // Withdraw
            if (balance >= withdrawalPerMonth) {
                balance -= withdrawalPerMonth;
                totalWithdrawn += withdrawalPerMonth;
            } else {
                // Capital exhausted
                totalWithdrawn += balance;
                balance = 0;
            }

            if (i % 12 === 0) {
                data.push({
                    year: i / 12,
                    balance: Math.round(balance),
                    withdrawn: Math.round(totalWithdrawn)
                });
            }
        }

        setResult({
            totalWithdrawn: Math.round(totalWithdrawn),
            finalValue: Math.round(balance),
            profit: Math.round(totalWithdrawn + balance - initialInvestment)
        });
        setChartData(data);

    }, [initialInvestment, withdrawalPerMonth, durationYears, expectedReturn]);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>SWP Inputs</CardTitle>
                    <CardDescription>Systematic Withdrawal Plan.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Total Investment (₹)</Label>
                        <Input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(Number(e.target.value))} />
                        <Slider value={[initialInvestment]} onValueChange={(v) => setInitialInvestment(v[0])} min={100000} max={10000000} step={10000} />
                    </div>

                    <div className="space-y-3">
                        <Label>Monthly Withdrawal (₹)</Label>
                        <Input type="number" value={withdrawalPerMonth} onChange={(e) => setWithdrawalPerMonth(Number(e.target.value))} />
                        <Slider value={[withdrawalPerMonth]} onValueChange={(v) => setWithdrawalPerMonth(v[0])} min={1000} max={100000} step={500} />
                    </div>

                    <div className="space-y-3">
                        <Label>Expected Return (%)</Label>
                        <Input type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} />
                        <Slider value={[expectedReturn]} onValueChange={(v) => setExpectedReturn(v[0])} min={1} max={20} step={0.5} />
                    </div>

                    <div className="space-y-3">
                        <Label>Time Period (Years)</Label>
                        <Input type="number" value={durationYears} onChange={(e) => setDurationYears(Number(e.target.value))} />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">SWP Summary</CardTitle></CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-6 text-center mb-6">
                            <div>
                                <div className="text-sm text-muted-foreground">Total Withdrawn</div>
                                <div className="text-2xl font-bold text-primary">₹ {result.totalWithdrawn.toLocaleString("en-IN")}</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Final Balance</div>
                                <div className={`text-2xl font-bold ${result.finalValue > 0 ? "text-green-600" : "text-red-500"}`}>
                                    ₹ {result.finalValue.toLocaleString("en-IN")}
                                </div>
                            </div>
                        </div>

                        {result.finalValue === 0 && (
                            <div className="p-2 text-center text-destructive text-sm font-semibold">
                                Warning: Corpus exhausted before completion! Reduce withdrawal rate.
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Balance Projection</CardTitle></CardHeader>
                    <CardContent className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorBal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip formatter={(value: number) => [`₹ ${value.toLocaleString("en-IN")}`, "Balance"]} />
                                <Area type="monotone" dataKey="balance" stroke="#8884d8" fillOpacity={1} fill="url(#colorBal)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
