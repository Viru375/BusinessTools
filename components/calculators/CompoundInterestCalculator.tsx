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

export function CompoundInterestCalculator() {
    const [principal, setPrincipal] = useState(10000);
    const [rate, setRate] = useState(10);
    const [time, setTime] = useState(5);

    const [result, setResult] = useState({
        interest: 0,
        total: 0
    });

    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        // CI = P(1 + r/n)^(nt)
        // Assuming Annually Compounding for simplicity in basic UI (n=1)
        const n = 1;
        const r = rate / 100;

        // Calculate final amount
        const amount = principal * Math.pow((1 + r / n), (n * time));
        const interest = amount - principal;

        setResult({
            interest: Math.round(interest),
            total: Math.round(amount)
        });

        const data = [];
        for (let i = 0; i <= time; i++) {
            const val = principal * Math.pow((1 + r / n), (n * i));
            data.push({
                year: `Year ${i}`,
                principal: principal,
                value: Math.round(val)
            });
        }
        setChartData(data);

    }, [principal, rate, time]);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Compound Interest Inputs</CardTitle>
                    <CardDescription>Annually Compounded</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Principal Amount (₹)</Label>
                            <Input
                                type="number"
                                value={principal}
                                onChange={(e) => setPrincipal(Number(e.target.value))}
                                className="w-28 h-8"
                            />
                        </div>
                        <Slider
                            value={[principal]}
                            onValueChange={(v) => setPrincipal(v[0])}
                            min={1000}
                            max={1000000}
                            step={1000}
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Interest Rate (% p.a)</Label>
                            <Input
                                type="number"
                                value={rate}
                                onChange={(e) => setRate(Number(e.target.value))}
                                className="w-24 h-8"
                            />
                        </div>
                        <Slider
                            value={[rate]}
                            onValueChange={(v) => setRate(v[0])}
                            min={1}
                            max={50}
                            step={0.5}
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Time Period (Years)</Label>
                            <Input
                                type="number"
                                value={time}
                                onChange={(e) => setTime(Number(e.target.value))}
                                className="w-24 h-8"
                            />
                        </div>
                        <Slider
                            value={[time]}
                            onValueChange={(v) => setTime(v[0])}
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
                        <CardTitle className="text-center text-primary">Total Amount</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-center text-primary">
                            ₹ {result.total.toLocaleString("en-IN")}
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                            <div className="flex flex-col items-center">
                                <span className="text-muted-foreground">Principal</span>
                                <span className="font-semibold">₹ {principal.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-muted-foreground">Compound Interest</span>
                                <span className="font-semibold text-green-600">₹ {result.interest.toLocaleString("en-IN")}</span>
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
                                    <linearGradient id="colorValueCI" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="year" hide />
                                <YAxis />
                                <Tooltip
                                    formatter={(value: number) => [`₹ ${value.toLocaleString("en-IN")}`, "Value"]}
                                />
                                <Area type="monotone" dataKey="value" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorValueCI)" strokeWidth={2} />
                                <Area type="monotone" dataKey="principal" stroke="#64748b" fill="transparent" strokeDasharray="5 5" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
