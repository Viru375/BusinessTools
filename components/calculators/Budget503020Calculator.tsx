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

export function Budget503020Calculator() {
    const [income, setIncome] = useState(50000); // Monthly Take-home

    // Logic
    const needs = income * 0.5;
    const wants = income * 0.3;
    const savings = income * 0.2;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Income Details</CardTitle>
                    <CardDescription>Monthly Budget Allocation.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Monthly Take-Home Pay (₹)</Label>
                        <Input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
                        <p className="text-xs text-muted-foreground">Enter your income after taxes.</p>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Ideal Allocation</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div className="grid gap-4">
                            <div className="p-4 bg-background rounded-lg border flex justify-between items-center">
                                <div className="text-left">
                                    <div className="font-semibold text-blue-600">Needs (50%)</div>
                                    <div className="text-xs text-muted-foreground">Rent, Groceries, Utilities</div>
                                </div>
                                <div className="font-bold text-xl">₹ {needs.toLocaleString("en-IN")}</div>
                            </div>

                            <div className="p-4 bg-background rounded-lg border flex justify-between items-center">
                                <div className="text-left">
                                    <div className="font-semibold text-purple-600">Wants (30%)</div>
                                    <div className="text-xs text-muted-foreground">Dining, Movies, Hobbies</div>
                                </div>
                                <div className="font-bold text-xl">₹ {wants.toLocaleString("en-IN")}</div>
                            </div>

                            <div className="p-4 bg-background rounded-lg border flex justify-between items-center">
                                <div className="text-left">
                                    <div className="font-semibold text-green-600">Savings (20%)</div>
                                    <div className="text-xs text-muted-foreground">Investing, Debt Repayment</div>
                                </div>
                                <div className="font-bold text-xl">₹ {savings.toLocaleString("en-IN")}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
