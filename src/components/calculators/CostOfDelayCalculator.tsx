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
    Legend
} from "recharts";

export function CostOfDelayCalculator() {
    const [sipAmount, setSipAmount] = useState(10000);
    const [returnRate, setReturnRate] = useState(12);
    const [investmentDuration, setInvestmentDuration] = useState(20);
    const [delayMonths, setDelayMonths] = useState(60); // 5 Years delay

    const [result, setResult] = useState({
        startedNow: 0,
        startedLater: 0,
        costOfDelay: 0
    });

    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        // Calc for "Started Now"
        // Duration = T years
        const r = returnRate / 12 / 100;
        const n = investmentDuration * 12;
        // FV = P * [ (1+i)^n - 1 ] * (1+i) / i
        const fvNow = sipAmount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

        // Calc for "Started Later"
        // Duration = T - Delay
        const delayYears = delayMonths / 12;
        const remainingYears = investmentDuration - delayYears;
        let fvLater = 0;

        if (remainingYears > 0) {
            const nLater = remainingYears * 12;
            fvLater = sipAmount * ((Math.pow(1 + r, nLater) - 1) / r) * (1 + r);
        }

        setResult({
            startedNow: Math.round(fvNow),
            startedLater: Math.round(fvLater),
            costOfDelay: Math.round(fvNow - fvLater)
        });

        // Chart Data
        const data = [];
        // Show growth over total duration
        let potNow = 0;
        let potLater = 0;

        // Start loop
        for (let m = 1; m <= n; m++) {
            // Now Scenario
            potNow += sipAmount;
            potNow += potNow * r;

            // Later Scenario
            if (m > delayMonths) {
                potLater += sipAmount;
                potLater += potLater * r;
            }

            // Push data points yearly
            if (m % 12 === 0) {
                data.push({
                    year: `Year ${m / 12}`,
                    StartedNow: Math.round(potNow),
                    DelayedStart: Math.round(potLater)
                });
            }
        }
        setChartData(data);

    }, [sipAmount, returnRate, investmentDuration, delayMonths]);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Delay Inputs</CardTitle>
                    <CardDescription>See the impact of waiting.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Monthly SIP Amount (₹)</Label>
                            <Input type="number" value={sipAmount} onChange={(e) => setSipAmount(Number(e.target.value))} className="w-24 h-8" />
                        </div>
                        <Slider value={[sipAmount]} onValueChange={(v) => setSipAmount(v[0])} min={1000} max={100000} step={500} />
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Delay Period (Months)</Label>
                            <Input type="number" value={delayMonths} onChange={(e) => setDelayMonths(Number(e.target.value))} className="w-24 h-8" />
                        </div>
                        <Slider value={[delayMonths]} onValueChange={(v) => setDelayMonths(v[0])} min={1} max={120} step={1} />
                        <p className="text-xs text-muted-foreground">{Math.floor(delayMonths / 12)} Years and {delayMonths % 12} Months</p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Total Investment Goal Duration (Years)</Label>
                            <Input type="number" value={investmentDuration} onChange={(e) => setInvestmentDuration(Number(e.target.value))} className="w-24 h-8" />
                        </div>
                        <Slider value={[investmentDuration]} onValueChange={(v) => setInvestmentDuration(v[0])} min={5} max={40} step={1} />
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Expected Return (%)</Label>
                            <Input type="number" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} className="w-24 h-8" />
                        </div>
                        <Slider value={[returnRate]} onValueChange={(v) => setReturnRate(v[0])} min={1} max={25} step={0.5} />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-destructive/5 border-destructive/20 text-center">
                    <CardHeader><CardTitle className="text-destructive">Cost of Delay</CardTitle></CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-destructive">₹ {result.costOfDelay.toLocaleString("en-IN")}</div>
                        <p className="text-muted-foreground text-sm mt-2">You lose this amount by waiting {Math.floor(delayMonths / 12)} years.</p>

                        <div className="grid grid-cols-2 gap-4 mt-6 text-left">
                            <div className="p-3 bg-background border rounded">
                                <div className="text-xs text-muted-foreground">Corpus if started Today</div>
                                <div className="font-bold text-green-600">₹ {result.startedNow.toLocaleString("en-IN")}</div>
                            </div>
                            <div className="p-3 bg-background border rounded">
                                <div className="text-xs text-muted-foreground">Corpus if Delayed</div>
                                <div className="font-bold text-orange-600">₹ {result.startedLater.toLocaleString("en-IN")}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Wealth Gap</CardTitle></CardHeader>
                    <CardContent className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="year" hide />
                                <YAxis />
                                <Tooltip formatter={(value: number) => [`₹ ${value.toLocaleString("en-IN")}`, "Corpus"]} />
                                <Legend />
                                <Area type="monotone" dataKey="StartedNow" stroke="#16a34a" fill="#16a34a" fillOpacity={0.1} strokeWidth={2} name="Current Plan" />
                                <Area type="monotone" dataKey="DelayedStart" stroke="#ea580c" fill="#ea580c" fillOpacity={0.1} strokeWidth={2} name="Delayed Plan" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
