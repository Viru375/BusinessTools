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

export function FreelanceRateCalculator() {
    const [desiredIncome, setDesiredIncome] = useState(100000); // Yearly
    const [expenses, setExpenses] = useState(20000); // Yearly business expenses
    const [billableHours, setBillableHours] = useState(1000); // Yearly (approx 20 hrs/week * 50 weeks)

    // Formula: (Target Income + Expenses) / Billable Hours
    const totalTarget = desiredIncome + expenses;
    const hourlyRate = billableHours > 0 ? totalTarget / billableHours : 0;

    // Daily Rate (assume 8 hrs? No, freelance hours vary. Let's just say Daily based on 6 billable hours)
    const dailyRate = hourlyRate * 6;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Income Goals</CardTitle>
                    <CardDescription>Calculate your ideal freelance rate.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Desired Annual Salary ($)</Label>
                        <Input type="number" value={desiredIncome} onChange={(e) => setDesiredIncome(Number(e.target.value))} />
                        <Slider value={[desiredIncome]} onValueChange={(v) => setDesiredIncome(v[0])} min={30000} max={300000} step={5000} />
                    </div>

                    <div className="space-y-3">
                        <Label>Annual Business Expenses ($)</Label>
                        <Input type="number" value={expenses} onChange={(e) => setExpenses(Number(e.target.value))} />
                        <p className="text-xs text-muted-foreground">Software, Hardware, Insurance, Tax buffer etc.</p>
                    </div>

                    <div className="space-y-3">
                        <Label>Billable Hours per Year</Label>
                        <Input type="number" value={billableHours} onChange={(e) => setBillableHours(Number(e.target.value))} />
                        <p className="text-xs text-muted-foreground">
                            Full time is ~2000 hours. Freelancers often bill ~1000 hours (50% utilization).
                        </p>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Your Minimum Rate</CardTitle></CardHeader>
                    <CardContent className="space-y-6 text-center">
                        <div>
                            <div className="text-sm text-muted-foreground">Hourly Rate</div>
                            <div className="text-5xl font-bold text-primary">
                                $ {Math.ceil(hourlyRate)}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-background border rounded">
                                <div className="text-xs text-muted-foreground">Daily Rate (6h)</div>
                                <div className="font-bold text-lg">$ {Math.ceil(dailyRate)}</div>
                            </div>
                            <div className="p-3 bg-background border rounded">
                                <div className="text-xs text-muted-foreground">Weekly Rate (30h)</div>
                                <div className="font-bold text-lg">$ {Math.ceil(hourlyRate * 30)}</div>
                            </div>
                        </div>

                        <div className="text-xs text-muted-foreground pt-4">
                            Based on total revenue target of $ {totalTarget.toLocaleString()}.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
