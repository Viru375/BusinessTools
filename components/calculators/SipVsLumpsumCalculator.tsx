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

export function SipVsLumpsumCalculator() {
    const [amount, setAmount] = useState(100000); // Common amount to compare, e.g. 1L lumpsum vs 1L over time? Or compare equal Investment?
    // Comparison usually means: If I have 1 Lakh now (Lumpsum) VS If I invest 10k/month (SIP).
    // Let's keep inputs separate for clarity.

    const [sipAmount, setSipAmount] = useState(5000);
    const [lumpsumAmount, setLumpsumAmount] = useState(100000);

    const [returnRate, setReturnRate] = useState(12);
    const [timePeriod, setTimePeriod] = useState(10);

    const [sipResult, setSipResult] = useState(0);
    const [lumpsumResult, setLumpsumResult] = useState(0);

    useEffect(() => {
        // Lumpsum Calc
        const r = returnRate / 100;
        const t = timePeriod;
        const lumpVal = lumpsumAmount * Math.pow(1 + r, t);
        setLumpsumResult(Math.round(lumpVal));

        // SIP Calc
        // FV = P * [ (1+i)^n - 1 ] * (1+i) / i
        const monthlyRate = r / 12;
        const months = t * 12;
        const sipVal = sipAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
        setSipResult(Math.round(sipVal));

    }, [sipAmount, lumpsumAmount, returnRate, timePeriod]);

    return (
        <div className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <Label>SIP Amount (Monthly) (₹)</Label>
                                <Input type="number" value={sipAmount} onChange={(e) => setSipAmount(Number(e.target.value))} className="w-24 h-8" />
                            </div>
                            <Slider value={[sipAmount]} onValueChange={(v) => setSipAmount(v[0])} min={500} max={100000} step={500} />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <Label>Lumpsum Amount (One-time) (₹)</Label>
                                <Input type="number" value={lumpsumAmount} onChange={(e) => setLumpsumAmount(Number(e.target.value))} className="w-24 h-8" />
                            </div>
                            <Slider value={[lumpsumAmount]} onValueChange={(v) => setLumpsumAmount(v[0])} min={10000} max={1000000} step={10000} />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <Label>Return Rate (% p.a)</Label>
                                <Input type="number" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} className="w-24 h-8" />
                            </div>
                            <Slider value={[returnRate]} onValueChange={(v) => setReturnRate(v[0])} min={1} max={30} step={0.5} />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <Label>Time Period (Years)</Label>
                                <Input type="number" value={timePeriod} onChange={(e) => setTimePeriod(Number(e.target.value))} className="w-24 h-8" />
                            </div>
                            <Slider value={[timePeriod]} onValueChange={(v) => setTimePeriod(v[0])} min={1} max={30} step={1} />
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="h-full flex flex-col justify-center bg-muted/20">
                        <CardHeader><CardTitle className="text-center">Comparison Result</CardTitle></CardHeader>
                        <CardContent className="space-y-8">
                            <div className="text-center p-4 bg-background rounded-lg border shadow-sm">
                                <h3 className="text-muted-foreground text-sm uppercase tracking-wide font-semibold">SIP Returns</h3>
                                <div className="text-3xl font-bold text-primary mt-2">₹ {sipResult.toLocaleString("en-IN")}</div>
                                <p className="text-xs text-muted-foreground mt-1">Total Inv: ₹ {(sipAmount * timePeriod * 12).toLocaleString("en-IN")}</p>
                            </div>

                            <div className="text-center p-4 bg-background rounded-lg border shadow-sm">
                                <h3 className="text-muted-foreground text-sm uppercase tracking-wide font-semibold">Lumpsum Returns</h3>
                                <div className="text-3xl font-bold text-blue-600 mt-2">₹ {lumpsumResult.toLocaleString("en-IN")}</div>
                                <p className="text-xs text-muted-foreground mt-1">Total Inv: ₹ {lumpsumAmount.toLocaleString("en-IN")}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
