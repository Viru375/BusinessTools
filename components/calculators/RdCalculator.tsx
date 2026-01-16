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

export function RdCalculator() {
    const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
    const [rate, setRate] = useState(6.5);
    const [months, setMonths] = useState(12);

    const [result, setResult] = useState({
        invested: 0,
        maturity: 0,
        interest: 0
    });

    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        // RD Formula with Quarterly Compounding (Standard bank RD)
        // M = P * n + Interest
        // Actually, General formula for RD with Quarterly compounding is complex iteration or approximation.
        // Exact Formula often used: M = P * [ (1+r/n)^(nt) - 1 ] / (1-(1+r/n)^(-1/3)) ... too complex.
        // Easier approach: Treat each deposit as a separate FD compounded quarterly for remaining duration.

        let totalMaturity = 0;
        const n = 4; // Quarterly
        const r = rate / 100;

        // For chart
        const data = [];
        let cumulativeInvested = 0;

        // Calculate maturity for each installment
        for (let i = 0; i < months; i++) {
            // Time remaining for this deposit in years
            const timeRemainingMonths = months - i;
            const timeRemainingYears = timeRemainingMonths / 12;

            // FV of this specific deposit
            const fv = monthlyDeposit * Math.pow(1 + r / n, n * timeRemainingYears);
            totalMaturity += fv;

            cumulativeInvested += monthlyDeposit;
        }

        // Re-generate approximated chart data over time (linear growth of corpus approx)
        let currentBal = 0;
        for (let m = 1; m <= months; m++) {
            currentBal += monthlyDeposit;
            // Add interest for this month roughly
            currentBal += currentBal * (rate / 12 / 100);

            if (m % 3 === 0 || m === months) { // Plot quarterly points or end
                data.push({
                    month: `Month ${m}`,
                    invested: monthlyDeposit * m,
                    value: Math.round(currentBal) // This is approx for chart visual
                });
            }
        }

        setResult({
            invested: monthlyDeposit * months,
            maturity: Math.round(totalMaturity),
            interest: Math.round(totalMaturity - (monthlyDeposit * months))
        });
        setChartData(data);

    }, [monthlyDeposit, rate, months]);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>RD Inputs</CardTitle>
                    <CardDescription>Recurring Deposit (Quarterly Compounding)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Monthly Deposit (₹)</Label>
                            <Input type="number" value={monthlyDeposit} onChange={(e) => setMonthlyDeposit(Number(e.target.value))} className="w-24 h-8" />
                        </div>
                        <Slider value={[monthlyDeposit]} onValueChange={(v) => setMonthlyDeposit(v[0])} min={500} max={100000} step={500} />
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Interest Rate (% p.a)</Label>
                            <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-24 h-8" />
                        </div>
                        <Slider value={[rate]} onValueChange={(v) => setRate(v[0])} min={3} max={12} step={0.1} />
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Time Period (Months)</Label>
                            <Input type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} className="w-24 h-8" />
                        </div>
                        <Slider value={[months]} onValueChange={(v) => setMonths(v[0])} min={6} max={120} step={6} />
                        <p className="text-xs text-muted-foreground">{Math.floor(months / 12)} Years {months % 12} Months</p>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20 text-center">
                    <CardHeader><CardTitle className="text-primary">Maturity Value</CardTitle></CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-primary">₹ {result.maturity.toLocaleString("en-IN")}</div>
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                            <div className="flex flex-col items-center">
                                <span className="text-muted-foreground">Total Deposit</span>
                                <span className="font-semibold">₹ {result.invested.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-muted-foreground">Total Interest</span>
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
                                    <linearGradient id="colorValueRD" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" hide />
                                <YAxis />
                                <Tooltip formatter={(value: number) => [`₹ ${value.toLocaleString("en-IN")}`, "Value"]} />
                                <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValueRD)" strokeWidth={2} />
                                <Area type="monotone" dataKey="invested" stroke="#64748b" fill="transparent" strokeDasharray="5 5" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
