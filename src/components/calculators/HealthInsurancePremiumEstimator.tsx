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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export function HealthInsurancePremiumEstimator() {
    const [age, setAge] = useState(30);
    const [members, setMembers] = useState("Individual"); // Individual, 2A, 2A+1C, 2A+2C
    const [sumInsured, setSumInsured] = useState(500000);
    const [zone, setZone] = useState("Zone 1"); // Zone 1 (Metro), Zone 2, Zone 3

    // Base Rates (Approx) for 5L Sum Insured, Individual 30yo, Zone 1
    const baseRate = 8000;

    // Multipliers
    let mAge = 1;
    if (age > 35) mAge = 1.2;
    if (age > 45) mAge = 1.8;
    if (age > 55) mAge = 2.5;
    if (age > 65) mAge = 4.0;

    let mMembers = 1;
    if (members === "2A") mMembers = 1.6; // Floater cheap
    if (members === "2A+1C") mMembers = 2.0;
    if (members === "2A+2C") mMembers = 2.3;

    let mSI = 1;
    if (sumInsured === 1000000) mSI = 1.4;
    if (sumInsured === 2500000) mSI = 1.8;
    if (sumInsured === 5000000) mSI = 2.2; // Super Topups cheaper but base is base.

    let mZone = 1;
    if (zone === "Zone 2") mZone = 0.9; // Slightly cheaper
    if (zone === "Zone 3") mZone = 0.8;

    const estimatedPremium = baseRate * mAge * mMembers * mSI * mZone;
    const gst = estimatedPremium * 0.18;
    const total = estimatedPremium + gst;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Policy Parameters</CardTitle>
                    <CardDescription>Estimate Annual Premium.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Eldest Member Age: {age}</Label>
                        <Slider value={[age]} onValueChange={(v) => setAge(v[0])} min={18} max={75} />
                    </div>

                    <div className="space-y-3">
                        <Label>Policy Type</Label>
                        <Select value={members} onValueChange={setMembers}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Individual">Individual (1 Adult)</SelectItem>
                                <SelectItem value="2A">Family Floater (2 Adults)</SelectItem>
                                <SelectItem value="2A+1C">2 Adults + 1 Child</SelectItem>
                                <SelectItem value="2A+2C">2 Adults + 2 Children</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-3">
                        <Label>Sum Insured</Label>
                        <Select value={String(sumInsured)} onValueChange={(v) => setSumInsured(Number(v))}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="500000">₹ 5 Lakhs</SelectItem>
                                <SelectItem value="1000000">₹ 10 Lakhs</SelectItem>
                                <SelectItem value="2500000">₹ 25 Lakhs</SelectItem>
                                <SelectItem value="5000000">₹ 50 Lakhs</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-3">
                        <Label>City Zone</Label>
                        <Select value={zone} onValueChange={setZone}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Zone 1">Zone 1 (Delhi, Mumbai etc.)</SelectItem>
                                <SelectItem value="Zone 2">Zone 2 (Tier 1)</SelectItem>
                                <SelectItem value="Zone 3">Zone 3 (Rest of India)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Estimated Premium</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">Annual Premium (Incl GST)</div>
                            <div className="text-4xl font-bold text-primary">
                                ₹ {Math.round(total).toLocaleString("en-IN")}
                            </div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border text-sm space-y-2">
                            <div className="flex justify-between">
                                <span>Base Premium</span>
                                <span className="font-semibold">₹ {Math.round(estimatedPremium).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>GST (18%)</span>
                                <span className="font-semibold">₹ {Math.round(gst).toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                            *Disclaimer: This is a rough estimate based on market averages. Actual premiums vary by insurer, medical history, and specific plan features.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
