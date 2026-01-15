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

export function RoiCalculator() {
    const [invested, setInvested] = useState(1000);
    const [returned, setReturned] = useState(1500);
    const [timeYears, setTimeYears] = useState(1);

    // ROI = (Net Profit / Cost of Investment) * 100
    const netProfit = returned - invested;
    const totalRoi = invested > 0 ? (netProfit / invested) * 100 : 0;
    const annualizedRoi = (Math.pow((returned / invested), (1 / timeYears)) - 1) * 100;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Investment Details</CardTitle>
                    <CardDescription>Calculate Return on Investment.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Amount Invested ($)</Label>
                        <Input type="number" value={invested} onChange={(e) => setInvested(Number(e.target.value))} />
                    </div>
                    <div className="space-y-3">
                        <Label>Amount Returned ($)</Label>
                        <Input type="number" value={returned} onChange={(e) => setReturned(Number(e.target.value))} />
                    </div>
                    <div className="space-y-3">
                        <Label>Time Period (Years)</Label>
                        <Input type="number" value={timeYears} onChange={(e) => setTimeYears(Number(e.target.value))} />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">ROI Results</CardTitle></CardHeader>
                    <CardContent className="space-y-6 text-center">
                        <div>
                            <div className="text-sm text-muted-foreground">Total ROI</div>
                            <div className={`text-4xl font-bold ${totalRoi >= 0 ? "text-green-600" : "text-red-500"}`}>
                                {totalRoi.toFixed(2)}%
                            </div>
                        </div>

                        <div>
                            <div className="text-sm text-muted-foreground">Annualized ROI</div>
                            <div className="text-2xl font-bold text-blue-600">
                                {invested > 0 ? annualizedRoi.toFixed(2) : 0}%
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <div className="text-sm text-muted-foreground">Net Profit</div>
                            <div className={`text-xl font-bold ${netProfit >= 0 ? "text-green-600" : "text-red-500"}`}>
                                $ {netProfit.toLocaleString()}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
