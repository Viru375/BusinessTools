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

export function MotorInsuranceIdvCalculator() {
    const [exShowroomPrice, setExShowroomPrice] = useState(1000000);
    const [age, setAge] = useState("0-6"); // Months

    // IRDAI Depreciation scale
    const depreciationMap: Record<string, number> = {
        "0-6": 5,        // < 6 months: 5%
        "6-12": 15,      // 6m - 1y: 15%
        "12-24": 20,     // 1y - 2y: 20%
        "24-36": 30,     // 2y - 3y: 30%
        "36-48": 40,     // 3y - 4y: 40%
        "48-60": 50      // 4y - 5y: 50%
        // > 5y: Mutual agreement / Surveyor
    };

    const depPercent = depreciationMap[age] || 0;

    const idv = exShowroomPrice - (exShowroomPrice * (depPercent / 100));

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Vehicle Details</CardTitle>
                    <CardDescription>Calculate Insured Declared Value.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Ex-Showroom Price (₹)</Label>
                        <Input type="number" value={exShowroomPrice} onChange={(e) => setExShowroomPrice(Number(e.target.value))} />
                        <p className="text-xs text-muted-foreground">Price of the car model when new (excluding Tax/Registration).</p>
                    </div>

                    <div className="space-y-3">
                        <Label>Vehicle Age</Label>
                        <Select value={age} onValueChange={setAge}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0-6">Less than 6 months</SelectItem>
                                <SelectItem value="6-12">6 months - 1 year</SelectItem>
                                <SelectItem value="12-24">1 - 2 years</SelectItem>
                                <SelectItem value="24-36">2 - 3 years</SelectItem>
                                <SelectItem value="36-48">3 - 4 years</SelectItem>
                                <SelectItem value="48-60">4 - 5 years</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Calculated IDV</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">Current Valuation</div>
                            <div className="text-4xl font-bold text-primary">
                                ₹ {idv.toLocaleString("en-IN")}
                            </div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border">
                            <div className="text-xs text-muted-foreground">Depreciation Applied</div>
                            <div className="text-2xl font-bold text-red-500">
                                {depPercent}%
                            </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                            IDV determines the maximum payout in case of Total Loss or Theft. It is NOT the resale value.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
