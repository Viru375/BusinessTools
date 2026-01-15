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

export function LumpsumCalculator() {
    const [totalInvestment, setTotalInvestment] = useState(100000); // 1 Lakh
    const [returnRate, setReturnRate] = useState(12);
    const [timePeriod, setTimePeriod] = useState(10);

    const [result, setResult] = useState({
        investedAmount: 0,
        estReturns: 0,
        totalValue: 0,
    });

    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        const calculateLumpsum = () => {
            // FV = P * (1 + r/n)^(nt) ... Simplified for annual compounding usually used in MFs as CAGR
            // FV = P * (1 + r)^t

            const P = totalInvestment;
            const r = returnRate / 100;
            const t = timePeriod;

            const totalValue = P * Math.pow(1 + r, t);
            const estReturns = totalValue - P;

            setResult({
                investedAmount: Math.round(P),
                estReturns: Math.round(estReturns),
                totalValue: Math.round(totalValue),
            });

            // Generate Chart Data (Yearly)
            const data = [];
            for (let year = 1; year <= t; year++) {
                const val = P * Math.pow(1 + r, year);
                data.push({
                    year: `Year ${year}`,
                    invested: Math.round(P),
                    value: Math.round(val),
                });
            }
            setChartData(data);
        };

        calculateLumpsum();
    }, [totalInvestment, returnRate, timePeriod]);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Lumpsum Inputs</CardTitle>
                    <CardDescription>Adjust the values below.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Total Investment (₹)</Label>
                            <Input
                                type="number"
                                value={totalInvestment}
                                onChange={(e) => setTotalInvestment(Number(e.target.value))}
                                className="w-28 h-8"
                            />
                        </div>
                        <Slider
                            value={[totalInvestment]}
                            onValueChange={(v) => setTotalInvestment(v[0])}
                            min={5000}
                            max={1000000}
                            step={5000}
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
                                    <linearGradient id="colorValueLump" x1="0" y1="0" x2="0" y2="1">
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
                                <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValueLump)" strokeWidth={2} />
                                <Area type="monotone" dataKey="invested" stroke="#64748b" fill="transparent" strokeDasharray="5 5" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
