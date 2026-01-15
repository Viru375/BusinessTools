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

export function StepUpSipCalculator() {
    const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
    const [annualStepUp, setAnnualStepUp] = useState(10); // Percentage
    const [returnRate, setReturnRate] = useState(12);
    const [timePeriod, setTimePeriod] = useState(10);

    const [result, setResult] = useState({
        investedAmount: 0,
        estReturns: 0,
        totalValue: 0,
    });

    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        let currentSip = monthlyInvestment;
        let totalInvested = 0;
        let totalValue = 0;
        const data = [];
        const monthlyRate = returnRate / 12 / 100;

        for (let year = 1; year <= timePeriod; year++) {
            // For each month in the year
            let yearEndValue = 0; // Just for chart snapshots, simplified approximation for chart

            for (let month = 1; month <= 12; month++) {
                totalInvested += currentSip;
                // Add investment to total pot
                totalValue += currentSip;
                // Apply monthly interest
                totalValue += totalValue * monthlyRate;
            }

            data.push({
                year: `Year ${year}`,
                invested: Math.round(totalInvested),
                value: Math.round(totalValue)
            });

            // Step up for next year
            currentSip += currentSip * (annualStepUp / 100);
        }

        setResult({
            investedAmount: Math.round(totalInvested),
            estReturns: Math.round(totalValue - totalInvested),
            totalValue: Math.round(totalValue)
        });

        setChartData(data);

    }, [monthlyInvestment, annualStepUp, returnRate, timePeriod]);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Step-Up SIP Inputs</CardTitle>
                    <CardDescription>Increase your SIP every year.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Monthly Investment (₹)</Label>
                            <Input
                                type="number"
                                value={monthlyInvestment}
                                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                                className="w-28 h-8"
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
                            <Label>Annual Step-Up (%)</Label>
                            <Input
                                type="number"
                                value={annualStepUp}
                                onChange={(e) => setAnnualStepUp(Number(e.target.value))}
                                className="w-24 h-8"
                            />
                        </div>
                        <Slider
                            value={[annualStepUp]}
                            onValueChange={(v) => setAnnualStepUp(v[0])}
                            min={0}
                            max={50}
                            step={1}
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
                            max={40}
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
                                    <linearGradient id="colorValueStep" x1="0" y1="0" x2="0" y2="1">
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
                                <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValueStep)" strokeWidth={2} />
                                <Area type="monotone" dataKey="invested" stroke="#64748b" fill="transparent" strokeDasharray="5 5" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
