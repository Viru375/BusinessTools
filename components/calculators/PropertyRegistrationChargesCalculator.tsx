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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function PropertyRegistrationChargesCalculator() {
    const [propertyValue, setPropertyValue] = useState(5000000);
    const [state, setState] = useState("Karnataka"); // Default
    const [gender, setGender] = useState("Male");

    // Approximate charges map
    // Note: These change often. Using indicative values.
    const chargesMap: Record<string, { stamp: number, reg: number, surcharge?: number }> = {
        "Karnataka": { stamp: 5.6, reg: 1 }, // Cess included in 5.6? roughly.
        "Maharashtra": { stamp: 5, reg: 1 }, // 1% or 30k max? Reg is capped usually.
        "Tamil Nadu": { stamp: 7, reg: 4 }, // High
        "Delhi": { stamp: 6, reg: 1 }, // Male 6, Female 4
        "Uttar Pradesh": { stamp: 7, reg: 1 },
        "Haryana": { stamp: 7, reg: 0 }, // Often fixed reg
        "Telangana": { stamp: 6, reg: 0.5 },
        "Other": { stamp: 6, reg: 1 }
    };

    // Custom logic for gender rebates
    let rate = chargesMap[state] || chargesMap["Other"];
    let stampRate = rate.stamp;

    if (state === "Delhi") {
        if (gender === "Female") stampRate = 4;
        if (gender === "Joint") stampRate = 5;
    }
    // Similar logic for others if needed.

    const stampDuty = propertyValue * (stampRate / 100);
    const registration = propertyValue * (rate.reg / 100);
    const total = stampDuty + registration;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Registration Details</CardTitle>
                    <CardDescription>Estimate Govt Charges.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Property Market Value (₹)</Label>
                        <Input type="number" value={propertyValue} onChange={(e) => setPropertyValue(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>State</Label>
                        <Select value={state} onValueChange={setState}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {Object.keys(chargesMap).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-3">
                        <Label>Owner Gender</Label>
                        <Select value={gender} onValueChange={setGender}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Joint">Joint</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">Some states offer rebate for women.</p>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Total Charges</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">Total Payable</div>
                            <div className="text-4xl font-bold text-primary">
                                ₹ {total.toLocaleString("en-IN")}
                            </div>
                        </div>

                        <div className="space-y-2 text-sm bg-background p-4 rounded border">
                            <div className="flex justify-between">
                                <span>Stamp Duty ({stampRate.toFixed(1)}%)</span>
                                <span className="font-semibold">₹ {stampDuty.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Registration ({rate.reg}%)</span>
                                <span className="font-semibold">₹ {registration.toLocaleString("en-IN")}</span>
                            </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                            *Indicative rates. Actual charges may vary based on municipal limits, cess, and surcharge.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
