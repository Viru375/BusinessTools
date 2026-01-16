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

export function SimpleInterestCalculator() {
    const [principal, setPrincipal] = useState(10000);
    const [rate, setRate] = useState(5);
    const [time, setTime] = useState(3);

    const [result, setResult] = useState({
        interest: 0,
        total: 0
    });

    useEffect(() => {
        // SI = (P * R * T) / 100
        const i = (principal * rate * time) / 100;
        const t = principal + i;
        setResult({
            interest: Math.round(i),
            total: Math.round(t)
        });
    }, [principal, rate, time]);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Simple Interest Inputs</CardTitle>
                    <CardDescription>Calculate SI without compounding.</CardDescription>
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
                            max={30}
                            step={1}
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20 flex flex-col justify-center">
                    <CardHeader>
                        <CardTitle className="text-center text-primary">Total Amount</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-bold text-center text-primary mb-6">
                            ₹ {result.total.toLocaleString("en-IN")}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-4 bg-background rounded-lg border">
                                <div className="text-sm text-muted-foreground">Principal</div>
                                <div className="text-xl font-bold">₹ {principal.toLocaleString("en-IN")}</div>
                            </div>
                            <div className="p-4 bg-background rounded-lg border">
                                <div className="text-sm text-muted-foreground">Total Interest</div>
                                <div className="text-xl font-bold text-green-600">₹ {result.interest.toLocaleString("en-IN")}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
