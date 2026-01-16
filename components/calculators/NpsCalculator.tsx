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

export function NpsCalculator() {
    const [monthlyInvest, setMonthlyInvest] = useState(5000);
    const [currentAge, setCurrentAge] = useState(25);
    const [interestRate, setInterestRate] = useState(10); // Typical equity heavy NPS

    // Final Withdrawals
    const [annuityPercent, setAnnuityPercent] = useState(40); // Min 40%
    const [annuityRate, setAnnuityRate] = useState(6); // Return on annuity

    const [result, setResult] = useState({
        invested: 0,
        interest: 0,
        maturity: 0,
        lumpsum: 0,
        annuity: 0,
        monthlyPension: 0
    });

    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        // NPS Logic: Monthly contribution continuously compounded? 
        // Usually monthly compounding or annual. Let's use monthly for SIP like behavior.

        let balance = 0;
        let totalInvested = 0;
        const data = [];
        const years = 60 - currentAge;
        const currentYear = new Date().getFullYear();
        const months = years * 12;
        const monthlyRate = interestRate / 12 / 100;

        for (let i = 1; i <= months; i++) {
            balance = (balance + monthlyInvest) * (1 + monthlyRate);
            totalInvested += monthlyInvest;

            if (i % 12 === 0) {
                data.push({
                    age: currentAge + (i / 12),
                    value: Math.round(balance),
                    invested: Math.round(totalInvested)
                });
            }
        }

        // Final Distribution
        const annuityAmount = balance * (annuityPercent / 100);
        const lumpsumAmount = balance - annuityAmount;

        // Monthly Pension from Annuity
        const pension = (annuityAmount * (annuityRate / 100)) / 12;

        setResult({
            invested: Math.round(totalInvested),
            interest: Math.round(balance - totalInvested),
            maturity: Math.round(balance),
            lumpsum: Math.round(lumpsumAmount),
            annuity: Math.round(annuityAmount),
            monthlyPension: Math.round(pension)
        });
        setChartData(data);

    }, [monthlyInvest, currentAge, interestRate, annuityPercent, annuityRate]);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>NPS Inputs</CardTitle>
                    <CardDescription>National Pension System Estimator.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Monthly Investment (₹)</Label>
                        <Input type="number" value={monthlyInvest} onChange={(e) => setMonthlyInvest(Number(e.target.value))} />
                        <Slider value={[monthlyInvest]} onValueChange={(v) => setMonthlyInvest(v[0])} min={500} max={100000} step={500} />
                    </div>

                    <div className="space-y-3">
                        <Label>Current Age</Label>
                        <Input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} />
                        <Slider value={[currentAge]} onValueChange={(v) => setCurrentAge(v[0])} min={18} max={59} step={1} />
                        <p className="text-xs text-muted-foreground">Matures at 60.</p>
                    </div>

                    <div className="space-y-3">
                        <Label>Expected Annual Return (%)</Label>
                        <Input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
                        <Slider value={[interestRate]} onValueChange={(v) => setInterestRate(v[0])} min={5} max={15} step={0.5} />
                    </div>

                    <div className="space-y-3">
                        <Label>Annuity Re-investment (%)</Label>
                        <Input type="number" value={annuityPercent} onChange={(e) => setAnnuityPercent(Number(e.target.value))} />
                        <Slider value={[annuityPercent]} onValueChange={(v) => setAnnuityPercent(v[0])} min={40} max={100} step={5} />
                        <p className="text-xs text-muted-foreground">Min 40% value must be used to buy annuity for pension.</p>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Your Retirement</CardTitle></CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-6 text-center mb-6">
                            <div>
                                <div className="text-sm text-muted-foreground">Total Corpus (Age 60)</div>
                                <div className="text-2xl font-bold text-primary">₹ {result.maturity.toLocaleString("en-IN")}</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Monthly Pension</div>
                                <div className="text-2xl font-bold text-blue-600">₹ {result.monthlyPension.toLocaleString("en-IN")}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm bg-background p-4 rounded-lg border">
                            <div>
                                <span className="text-muted-foreground block">Lumpsum Withdrawal</span>
                                <span className="font-semibold text-green-600">₹ {result.lumpsum.toLocaleString("en-IN")}</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground block">Annuity Value</span>
                                <span className="font-semibold">₹ {result.annuity.toLocaleString("en-IN")}</span>
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
                                    <linearGradient id="colorValueNPS" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="age" />
                                <YAxis />
                                <Tooltip formatter={(value: number) => [`₹ ${value.toLocaleString("en-IN")}`, "Corpus"]} />
                                <Area type="monotone" dataKey="value" stroke="#2563eb" fillOpacity={1} fill="url(#colorValueNPS)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
