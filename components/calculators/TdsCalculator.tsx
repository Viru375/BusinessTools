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
import { Button } from "@/components/ui/button";

export function TdsCalculator() {
    const [amount, setAmount] = useState(50000); // Payment Amount
    const [tdsRate, setTdsRate] = useState(10); // Standard 10% for professional fees etc.

    const [result, setResult] = useState({
        deduction: 0,
        netPayable: 0
    });

    const calculate = () => {
        const deduction = (amount * tdsRate) / 100;
        const net = amount - deduction;
        setResult({ deduction: Math.round(deduction), netPayable: Math.round(net) });
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>TDS Inputs</CardTitle>
                    <CardDescription>Calculate Tax Deducted at Source.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Total Payment Amount (₹)</Label>
                        <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>TDS Rate (%)</Label>
                        <Input type="number" value={tdsRate} onChange={(e) => setTdsRate(Number(e.target.value))} />
                        <p className="text-xs text-muted-foreground">Common rates: Salary (Slab), Professional Fees (10%), Rent (10%), Contractors (1% / 2%)</p>
                    </div>

                    <Button onClick={calculate} className="w-full">Calculate</Button>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-muted/20 h-full">
                    <CardHeader><CardTitle>Result</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-4 bg-background rounded-lg border shadow-sm">
                            <div className="text-sm text-muted-foreground">TDS Amount (To Deduct)</div>
                            <div className="text-3xl font-bold text-destructive">₹ {result.deduction.toLocaleString("en-IN")}</div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border shadow-sm">
                            <div className="text-sm text-muted-foreground">Net Payable (To Party)</div>
                            <div className="text-3xl font-bold text-primary">₹ {result.netPayable.toLocaleString("en-IN")}</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
