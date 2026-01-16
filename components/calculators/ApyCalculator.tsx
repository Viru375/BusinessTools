"use client";

import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function ApyCalculator() {
    const [age, setAge] = useState(18);
    const [pension, setPension] = useState("1000"); // 1000, 2000, 3000, 4000, 5000

    // Approximation logic mimicking official chart
    // For 1000 pension: contribution starts ~42 @ 18yr to ~291 @ 39yr
    // This is a rough formula-based estimator for demo purposes.
    // Formula: Base 42 for 18yr. Increases exponentially.

    const calculateContribution = (entryAge: number, pensionAmount: number) => {
        if (entryAge < 18 || entryAge > 40) return 0; // Not eligible

        // Base factor per 1000 rupees pension
        // Age 18 -> 42
        // Age 40 -> 291
        // Linear interp is bad. Let's use simplified lookup for key ages.

        const multiplier = pensionAmount / 1000;

        // Rough polynomial fit
        // y = 0.25x^2 - 7x + 85 (very rough)
        // Better: Hardcoded array for accuracy for Age 18-40

        const data = {
            18: 42, 19: 46, 20: 50, 21: 54, 22: 59, 23: 64, 24: 70, 25: 76,
            26: 82, 27: 90, 28: 97, 29: 106, 30: 116, 31: 126, 32: 138, 33: 151,
            34: 165, 35: 181, 36: 198, 37: 218, 38: 240, 39: 264, 40: 291
        };

        // @ts-ignore
        const baseContrib = data[entryAge] || 0;
        return baseContrib * multiplier;
    };

    const monthlyContrib = calculateContribution(age, Number(pension));
    const totalYears = 60 - age;
    const totalInvestment = monthlyContrib * 12 * totalYears;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>APY Inputs</CardTitle>
                    <CardDescription>Atal Pension Yojana (Age 18-40).</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Entry Age (Years)</Label>
                        <Input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} min={18} max={40} />
                        <p className="text-xs text-muted-foreground">Must be between 18 and 40.</p>
                    </div>

                    <div className="space-y-3">
                        <Label>Desired Monthly Pension (₹)</Label>
                        <Select value={pension} onValueChange={setPension}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1000">₹ 1,000</SelectItem>
                                <SelectItem value="2000">₹ 2,000</SelectItem>
                                <SelectItem value="3000">₹ 3,000</SelectItem>
                                <SelectItem value="4000">₹ 4,000</SelectItem>
                                <SelectItem value="5000">₹ 5,000</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Contribution Required</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">Monthly Contribution</div>
                            <div className="text-4xl font-bold text-primary">
                                ₹ {monthlyContrib}
                            </div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-xs text-muted-foreground">Total Years to Pay</div>
                                <div className="font-semibold">{totalYears} Years</div>
                            </div>
                            <div>
                                <div className="text-xs text-muted-foreground">Total Investment</div>
                                <div className="font-semibold">₹ {totalInvestment.toLocaleString("en-IN")}</div>
                            </div>
                        </div>

                        <div className="text-xs text-muted-foreground mt-2">
                            *Calculated based on standard indicative charts. Actual bank deductions may vary slightly.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
