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

export function CostOfLivingCalculator() {
    const [baseCity, setBaseCity] = useState("Bangalore");
    const [targetCity, setTargetCity] = useState("Mumbai");
    const [currentSalary, setCurrentSalary] = useState(1000000); // Annual

    // Simplified Indices (Base: Bangalore = 100)
    // Real data would need an API or massive JSON.
    const indices: Record<string, number> = {
        "Bangalore": 100,
        "Mumbai": 125, // Significantly higher rent
        "Delhi": 105,
        "Hyderabad": 95,
        "Chennai": 95,
        "Pune": 98,
        "Kolkata": 85,
        "Jaipur": 80,
        "New York": 350, // Just for fun comparison
        "London": 280,
        "Dubai": 220
    };

    const baseIndex = indices[baseCity];
    const targetIndex = indices[targetCity];

    const requiredSalary = currentSalary * (targetIndex / baseIndex);
    const differencePercent = ((targetIndex - baseIndex) / baseIndex) * 100;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>City Comparison</CardTitle>
                    <CardDescription>Salary Equivalence.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Current City</Label>
                        <Select value={baseCity} onValueChange={setBaseCity}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {Object.keys(indices).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-3">
                        <Label>Current Salary (Annual ₹)</Label>
                        <Input type="number" value={currentSalary} onChange={(e) => setCurrentSalary(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>Target City</Label>
                        <Select value={targetCity} onValueChange={setTargetCity}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {Object.keys(indices).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Equivalent Salary</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">To maintain standard of living in {targetCity}, you need:</div>
                            <div className="text-4xl font-bold text-primary">
                                ₹ {Math.round(requiredSalary).toLocaleString("en-IN")}
                            </div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border">
                            <div className="text-xs text-muted-foreground">Cost Difference</div>
                            <div className={`text-2xl font-bold ${differencePercent > 0 ? "text-red-500" : "text-green-600"}`}>
                                {differencePercent > 0 ? "+" : ""}{differencePercent.toFixed(1)}%
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                                {differencePercent > 0
                                    ? `${targetCity} is more expensive than ${baseCity}.`
                                    : `${targetCity} is cheaper than ${baseCity}.`}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
