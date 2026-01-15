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

export function GoalPlanner() {
    const [targetAmount, setTargetAmount] = useState(1000000); // 10 Lakh
    const [years, setYears] = useState(5);
    const [returnRate, setReturnRate] = useState(12);

    const [requiredSip, setRequiredSip] = useState(0);

    useEffect(() => {
        // Goal Planning Formula (Reverse SIP)
        // Target = P * [ (1+i)^n - 1 ] * (1+i) / i
        // P = Target / ( [ (1+i)^n - 1 ] * (1+i) / i )

        const r = returnRate / 12 / 100; // Monthly rate
        const n = years * 12; // Total months

        if (r === 0) {
            setRequiredSip(Math.round(targetAmount / n));
            return;
        }

        const factor = ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        const monthlyInvestment = targetAmount / factor;

        setRequiredSip(Math.round(monthlyInvestment));
    }, [targetAmount, years, returnRate]);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Goal Inputs</CardTitle>
                    <CardDescription>Tell us about your financial goal.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Target Amount (₹)</Label>
                            <Input
                                type="number"
                                value={targetAmount}
                                onChange={(e) => setTargetAmount(Number(e.target.value))}
                                className="w-32 h-8"
                            />
                        </div>
                        <Slider
                            value={[targetAmount]}
                            onValueChange={(v) => setTargetAmount(v[0])}
                            min={100000}
                            max={50000000}
                            step={50000}
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Time to achieve (Years)</Label>
                            <Input
                                type="number"
                                value={years}
                                onChange={(e) => setYears(Number(e.target.value))}
                                className="w-24 h-8"
                            />
                        </div>
                        <Slider
                            value={[years]}
                            onValueChange={(v) => setYears(v[0])}
                            min={1}
                            max={30}
                            step={1}
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Expected Annual Return (%)</Label>
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
                            max={25}
                            step={0.5}
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20 h-full flex flex-col justify-center">
                    <CardHeader>
                        <CardTitle className="text-center text-primary">Required Monthly SIP</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <div className="text-5xl font-bold text-primary mb-2">
                            ₹ {requiredSip.toLocaleString("en-IN")}
                        </div>
                        <p className="text-muted-foreground mt-4">
                            To reach exactly <span className="font-semibold text-foreground">₹ {targetAmount.toLocaleString("en-IN")}</span><br /> in {years} years at {returnRate}%.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
