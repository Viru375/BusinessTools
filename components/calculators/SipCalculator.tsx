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

export function SipCalculator() {
    const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
    const [returnRate, setReturnRate] = useState(12);
    const [timePeriod, setTimePeriod] = useState(10);

    const [result, setResult] = useState({
        investedAmount: 0,
        estReturns: 0,
        totalValue: 0,
    });

    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        const calculateSIP = () => {
            const i = returnRate / 12 / 100;
            const n = timePeriod * 12;

            // FV = P * [ (1+i)^n - 1 ] * (1+i) / i
            const investedAmount = monthlyInvestment * n;
            const totalValue =
                (monthlyInvestment * (Math.pow(1 + i, n) - 1) * (1 + i)) / i;
            const estReturns = totalValue - investedAmount;

            setResult({
                investedAmount: Math.round(investedAmount),
                estReturns: Math.round(estReturns),
                totalValue: Math.round(totalValue),
            });

            // Generate Chart Data (Yearly)
            const data = [];
            for (let year = 1; year <= timePeriod; year++) {
                const months = year * 12;
                const invested = monthlyInvestment * months;
                const value =
                    (monthlyInvestment * (Math.pow(1 + i, months) - 1) * (1 + i)) / i;
                data.push({
                    year: `Year ${year}`,
                    invested: Math.round(invested),
                    value: Math.round(value),
                });
            }
            setChartData(data);
        };

        calculateSIP();
    }, [monthlyInvestment, returnRate, timePeriod]);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>SIP Inputs</CardTitle>
                    <CardDescription>Adjust the values below.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Monthly Investment (₹)</Label>
                            <Input
                                type="number"
                                value={monthlyInvestment}
                                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                                className="w-24 h-8"
                            />
                        </div>
                        <Slider
                            value={[monthlyInvestment]}
                            onValueChange={(v) => setMonthlyInvestment(v[0])}
                            min={500}
                            max={100000}
                            step={500}
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Expected Return Rate (% p.a)</Label>
                            <Input
                                type="number"
                                value={returnRate}
                                onChange={(e) => setReturnRate(Number(e.target.value))}
                                className="w-24 h-8"
                            />
                        </div>
                        <Slider
                            value={[returnRate]}
                            onValueChange={(v) => setReturnRate(v[0])}
                            min={1}
                            max={30}
                            step={0.1}
                        />
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
                            min={1}
                            max={50}
                            step={1}
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                        <CardTitle className="text-center text-primary">Proj. Total Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-center text-primary">
                            ₹ {result.totalValue.toLocaleString("en-IN")}
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                            <div className="flex flex-col items-center">
                                <span className="text-muted-foreground">Invested Amount</span>
                                <span className="font-semibold">₹ {result.investedAmount.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-muted-foreground">Est. Returns</span>
                                <span className="font-semibold text-green-600">₹ {result.estReturns.toLocaleString("en-IN")}</span>
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
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
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
                                <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                                <Area type="monotone" dataKey="invested" stroke="#64748b" fill="transparent" strokeDasharray="5 5" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
