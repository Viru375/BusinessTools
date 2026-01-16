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

export function PpfCalculator() {
    const [yearlyInvestment, setYearlyInvestment] = useState(150000);
    const [timePeriod, setTimePeriod] = useState(15);
    // PPF rate is fixed by govt, approx 7.1% currently
    const interestRate = 7.1;

    const [result, setResult] = useState({
        investedAmount: 0,
        totalInterest: 0,
        maturityValue: 0,
    });

    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        // PPF Compounding is Annually but calculated on min monthly bal.
        // For simplicity, we assume investment at start of year -> Interest (n+1) = (Balance + Inv) * r
        // Formal PPF formula: F = P * [({(1+i)^n}-1)/i]

        let balance = 0;
        let totalInvested = 0;
        const data = [];

        const i = interestRate / 100;

        for (let year = 1; year <= timePeriod; year++) {
            totalInvested += yearlyInvestment;
            // Interest calculated on balance + investment
            const interest = (balance + yearlyInvestment) * i;
            balance = balance + yearlyInvestment + interest;

            data.push({
                year: `Year ${year}`,
                invested: totalInvested,
                value: Math.round(balance)
            })
        }

        setResult({
            investedAmount: totalInvested,
            totalInterest: Math.round(balance - totalInvested),
            maturityValue: Math.round(balance)
        });

        setChartData(data);
    }, [yearlyInvestment, timePeriod]);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>PPF Inputs</CardTitle>
                    <CardDescription>Current Interest Rate: 7.1%</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Yearly Investment (₹)</Label>
                            <Input
                                type="number"
                                value={yearlyInvestment}
                                onChange={(e) => {
                                    let val = Number(e.target.value);
                                    if (val > 150000) val = 150000;
                                    setYearlyInvestment(val);
                                }}
                                className="w-28 h-8"
                            />
                        </div>
                        <Slider
                            value={[yearlyInvestment]}
                            onValueChange={(v) => setYearlyInvestment(v[0])}
                            min={500}
                            max={150000}
                            step={500}
                        />
                        <p className="text-xs text-muted-foreground">Max annual limit: ₹1,50,000</p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Time Period (Years)</Label>
                            <Input
                                type="number"
                                value={timePeriod}
                                onChange={(e) => setTimePeriod(Number(e.target.value))}
                                className="w-24 h-8"
                            />
                        </div>
                        <Slider
                            value={[timePeriod]}
                            onValueChange={(v) => setTimePeriod(v[0])}
                            min={15}
                            max={50}
                            step={5}
                        />
                        <p className="text-xs text-muted-foreground">Min lock-in: 15 Years</p>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                        <CardTitle className="text-center text-primary">Maturity Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-center text-primary">
                            ₹ {result.maturityValue.toLocaleString("en-IN")}
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                            <div className="flex flex-col items-center">
                                <span className="text-muted-foreground">Total Invested</span>
                                <span className="font-semibold">₹ {result.investedAmount.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-muted-foreground">Total Interest</span>
                                <span className="font-semibold text-green-600">₹ {result.totalInterest.toLocaleString("en-IN")}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Growth Chart</CardTitle></CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorValuePPF" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="year" hide />
                                <YAxis />
                                <Tooltip
                                    formatter={(value: number) => [`₹ ${value.toLocaleString("en-IN")}`, "Value"]}
                                />
                                <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValuePPF)" strokeWidth={2} />
                                <Area type="monotone" dataKey="invested" stroke="#64748b" fill="transparent" strokeDasharray="5 5" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
