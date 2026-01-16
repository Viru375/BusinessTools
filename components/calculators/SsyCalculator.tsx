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

export function SsyCalculator() {
    const [yearlyInvestment, setYearlyInvestment] = useState(100000);
    const [girlAge, setGirlAge] = useState(5);
    const [startYear, setStartYear] = useState(new Date().getFullYear());

    const INTEREST_RATE = 8.2; // Current SSY rate

    const [result, setResult] = useState({
        invested: 0,
        interest: 0,
        maturity: 0,
        maturityYear: 0
    });

    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        // Logic:
        // SSY matures after 21 years from account opening.
        // Deposits can be made for 15 years.
        // Compounded Annually.

        let balance = 0;
        let totalInvested = 0;
        const data = [];

        for (let i = 1; i <= 21; i++) {
            const currentYear = startYear + i - 1;

            // Deposits allowed for first 15 years only
            if (i <= 15) {
                balance += yearlyInvestment;
                totalInvested += yearlyInvestment;
            }

            // Interest earned on balance
            const interest = balance * (INTEREST_RATE / 100);
            balance += interest;

            data.push({
                year: currentYear,
                age: girlAge + i,
                value: Math.round(balance),
                invested: Math.round(totalInvested)
            });
        }

        setResult({
            invested: Math.round(totalInvested),
            interest: Math.round(balance - totalInvested),
            maturity: Math.round(balance),
            maturityYear: startYear + 21
        });
        setChartData(data);

    }, [yearlyInvestment, girlAge, startYear]);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>SSY Inputs</CardTitle>
                    <CardDescription>Sukanya Samriddhi Yojana (Current Rate: {INTEREST_RATE}%)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Yearly Investment (₹)</Label>
                        <Input type="number" value={yearlyInvestment} onChange={(e) => setYearlyInvestment(Number(e.target.value))} />
                        <Slider value={[yearlyInvestment]} onValueChange={(v) => setYearlyInvestment(v[0])} min={250} max={150000} step={250} />
                        <p className="text-xs text-muted-foreground">Max limit: ₹1,50,000 per financial year.</p>
                    </div>

                    <div className="space-y-3">
                        <Label>Girl Child's Age</Label>
                        <Input type="number" value={girlAge} onChange={(e) => setGirlAge(Number(e.target.value))} />
                        <Slider value={[girlAge]} onValueChange={(v) => setGirlAge(v[0])} min={0} max={10} step={1} />
                        <p className="text-xs text-muted-foreground">Account can be opened only up to age 10.</p>
                    </div>

                    <div className="space-y-3">
                        <Label>Start Year</Label>
                        <Input type="number" value={startYear} onChange={(e) => setStartYear(Number(e.target.value))} disabled className="bg-muted" />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Maturity Value</CardTitle></CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-center text-primary">
                            ₹ {result.maturity.toLocaleString("en-IN")}
                        </div>
                        <p className="text-center text-sm text-muted-foreground mt-2">
                            Matures in Year {result.maturityYear} (Girl's Age: {girlAge + 21})
                        </p>

                        <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-center">
                            <div>
                                <span className="text-muted-foreground block">Total Invested</span>
                                <span className="font-semibold">₹ {result.invested.toLocaleString("en-IN")}</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground block">Total Interest</span>
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
                                    <linearGradient id="colorValueSSY" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="year" hide />
                                <YAxis />
                                <Tooltip formatter={(value: number) => [`₹ ${value.toLocaleString("en-IN")}`, "Value"]} />
                                <Area type="monotone" dataKey="value" stroke="#ec4899" fillOpacity={1} fill="url(#colorValueSSY)" strokeWidth={2} />
                                <Area type="monotone" dataKey="invested" stroke="#64748b" fill="transparent" strokeDasharray="5 5" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
