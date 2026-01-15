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

export function PmvvyCalculator() {
    const [investment, setInvestment] = useState(1500000); // Max 15L
    const [rate, setRate] = useState(7.4); // Last known rate
    const [payoutMode, setPayoutMode] = useState("Monthly");

    // PMVVY Logic (10 years)
    // Monthly, Quarterly, Half-yearly, Yearly

    const calculatePension = () => {
        // 7.4% is annual effective? Actually rate varies slightly by mode to match effective yield.
        // Let's assume input rate is nominal per annum for simplicity or use flat calc.
        // Actually PMVVY had fixed pension amounts for 1.62L etc.
        // Simplification: Interest = Invest * Rate.
        // Monthly = Interest / 12

        const annual = investment * (rate / 100);

        if (payoutMode === "Monthly") return annual / 12;
        if (payoutMode === "Quarterly") return annual / 4;
        if (payoutMode === "Half-Yearly") return annual / 2;
        return annual;
    };

    const pension = calculatePension();

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>PMVVY Inputs</CardTitle>
                    <CardDescription>Pradhan Mantri Vaya Vandana Yojana (10 Years).</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Lumpsum Investment (₹)</Label>
                        <Input type="number" value={investment} onChange={(e) => setInvestment(Number(e.target.value))} />
                        <p className="text-xs text-muted-foreground">Max ₹15 Lakhs per senior citizen.</p>
                    </div>

                    <div className="space-y-3">
                        <Label>Payout Frequency</Label>
                        <Select value={payoutMode} onValueChange={setPayoutMode}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Monthly">Monthly</SelectItem>
                                <SelectItem value="Quarterly">Quarterly</SelectItem>
                                <SelectItem value="Half-Yearly">Half-Yearly</SelectItem>
                                <SelectItem value="Yearly">Yearly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-3">
                        <Label>Interest Rate (%)</Label>
                        <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
                        <p className="text-xs text-muted-foreground">Standard Rate ~7.4% (Closed Mar 2023 but useful for existing holders).</p>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Pension Summary</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">{payoutMode} Pension</div>
                            <div className="text-4xl font-bold text-primary">
                                ₹ {Math.round(pension).toLocaleString("en-IN")}
                            </div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border">
                            <div className="text-xs text-muted-foreground">Total Interest (10Y)</div>
                            <div className="font-semibold text-green-600">₹ {Math.round(pension * (payoutMode === "Monthly" ? 120 : (payoutMode === "Quarterly" ? 40 : 10))).toLocaleString("en-IN")}</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
