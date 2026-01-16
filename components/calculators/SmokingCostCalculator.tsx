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
import { Slider } from "@/components/ui/slider";

export function SmokingCostCalculator() {
    const [cigsPerDay, setCigsPerDay] = useState(5);
    const [costPerPack, setCostPerPack] = useState(350); // Pack of 20
    const [years, setYears] = useState(20);
    const [investmentReturn, setInvestmentReturn] = useState(12); // If invested instead

    // Logic
    const costPerCig = costPerPack / 20;
    const dailyCost = cigsPerDay * costPerCig;
    const monthlyCost = dailyCost * 30;

    // Future Value of monthly SIP equivalent to smoking cost
    const r = investmentReturn / 12 / 100;
    const n = years * 12;

    const totalSpent = monthlyCost * n;
    const fv = monthlyCost * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Habit Details</CardTitle>
                    <CardDescription>Cost Analysis.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <Label>Cigarettes / Day</Label>
                            <Input type="number" value={cigsPerDay} onChange={(e) => setCigsPerDay(Number(e.target.value))} />
                        </div>
                        <div className="space-y-3">
                            <Label>Cost per Pack (20)</Label>
                            <Input type="number" value={costPerPack} onChange={(e) => setCostPerPack(Number(e.target.value))} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label>Duration (Years)</Label>
                        <Slider value={[years]} onValueChange={(v) => setYears(v[0])} min={1} max={50} />
                        <div className="text-right text-xs">{years} Years</div>
                    </div>

                    <div className="space-y-3">
                        <Label>Opportunity Cost Return (%)</Label>
                        <Input type="number" value={investmentReturn} onChange={(e) => setInvestmentReturn(Number(e.target.value))} />
                        <p className="text-xs text-muted-foreground">If this money was invested in SIP.</p>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Financial Impact</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">Total Wealth Lost</div>
                            <div className="text-4xl font-bold text-red-600">
                                ₹ {(fv / 100000).toFixed(2)} Lakhs
                            </div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border text-sm space-y-2">
                            <div className="flex justify-between">
                                <span>Actual Amount Burnt</span>
                                <span className="font-semibold">₹ {totalSpent.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between border-t pt-2">
                                <span>Monthly Drain</span>
                                <span className="font-semibold">₹ {monthlyCost.toLocaleString("en-IN")}</span>
                            </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                            Additional Impact: Term insurance premiums for smokers are typically 50-80% higher than non-smokers.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
