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
import { Input } from "@/components/ui/input";

export function NcbCalculator() {
    const [lastNcb, setLastNcb] = useState("0");
    const [claimMade, setClaimMade] = useState("No");
    const [ownDamagePremium, setOwnDamagePremium] = useState(15000);

    let newNcb = 0;

    if (claimMade === "Yes") {
        newNcb = 0; // Reset to 0 usually
        // Some insurers offer NCB protect add-on, but ignoring that for base case.
    } else {
        const current = Number(lastNcb);
        if (current === 0) newNcb = 20;
        else if (current === 20) newNcb = 25;
        else if (current === 25) newNcb = 35;
        else if (current === 35) newNcb = 45;
        else if (current === 45) newNcb = 50;
        else if (current === 50) newNcb = 50; // Max Capped
    }

    const discountAmount = ownDamagePremium * (newNcb / 100);
    const payablePremium = ownDamagePremium - discountAmount;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Renewal Details</CardTitle>
                    <CardDescription>Calculate Next Year&apos;s Bonus.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Previous Year NCB (%)</Label>
                        <Select value={lastNcb} onValueChange={setLastNcb}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">0%</SelectItem>
                                <SelectItem value="20">20%</SelectItem>
                                <SelectItem value="25">25%</SelectItem>
                                <SelectItem value="35">35%</SelectItem>
                                <SelectItem value="45">45%</SelectItem>
                                <SelectItem value="50">50%</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-3">
                        <Label>Did you make a claim this year?</Label>
                        <Select value={claimMade} onValueChange={setClaimMade}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="No">No</SelectItem>
                                <SelectItem value="Yes">Yes</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-3">
                        <Label>Base Own Damage Premium (₹)</Label>
                        <Input type="number" value={ownDamagePremium} onChange={(e) => setOwnDamagePremium(Number(e.target.value))} />
                        <p className="text-xs text-muted-foreground">Premium before NCB discount.</p>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Your Benefit</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">New NCB Eligibility</div>
                            <div className="text-4xl font-bold text-primary">
                                {newNcb}%
                            </div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border text-sm space-y-2">
                            <div className="flex justify-between">
                                <span>Discount Amount</span>
                                <span className="font-semibold text-green-600">- ₹ {Math.round(discountAmount).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between border-t pt-2">
                                <span>Net Premium (OD)</span>
                                <span className="font-semibold">₹ {Math.round(payablePremium).toLocaleString()}</span>
                            </div>
                        </div>

                        {claimMade === "Yes" && lastNcb !== "0" && (
                            <div className="text-xs text-red-500 bg-red-50 p-2 rounded">
                                Alert: Making a claim resets your NCB to 0%. Avoid small claims to protect NCB.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
