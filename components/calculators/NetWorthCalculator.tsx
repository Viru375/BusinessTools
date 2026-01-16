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

export function NetWorthCalculator() {
    // Assets
    const [cash, setCash] = useState(50000);
    const [investments, setInvestments] = useState(500000);
    const [property, setProperty] = useState(5000000);
    const [others, setOthers] = useState(200000); // Jewelry, Car etc.

    // Liabilities
    const [loans, setLoans] = useState(2500000);
    const [creditCard, setCreditCard] = useState(20000);

    const totalAssets = cash + investments + property + others;
    const totalLiabilities = loans + creditCard;
    const netWorth = totalAssets - totalLiabilities;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Your Balance Sheet</CardTitle>
                    <CardDescription>Assets vs Liabilities.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label className="text-base text-green-600 font-semibold">Assets (What you own)</Label>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <div className="space-y-2"><Label>Cash/Bank</Label><Input type="number" value={cash} onChange={(e) => setCash(Number(e.target.value))} /></div>
                            <div className="space-y-2"><Label>Investments</Label><Input type="number" value={investments} onChange={(e) => setInvestments(Number(e.target.value))} /></div>
                            <div className="space-y-2"><Label>Property/Real Estate</Label><Input type="number" value={property} onChange={(e) => setProperty(Number(e.target.value))} /></div>
                            <div className="space-y-2"><Label>Other (Gold/Car)</Label><Input type="number" value={others} onChange={(e) => setOthers(Number(e.target.value))} /></div>
                        </div>
                    </div>

                    <div>
                        <Label className="text-base text-red-600 font-semibold">Liabilities (What you owe)</Label>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <div className="space-y-2"><Label>Loans (Home/Edu)</Label><Input type="number" value={loans} onChange={(e) => setLoans(Number(e.target.value))} /></div>
                            <div className="space-y-2"><Label>Credit Card Dues</Label><Input type="number" value={creditCard} onChange={(e) => setCreditCard(Number(e.target.value))} /></div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Your Net Worth</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">Total Assets - Total Liabilities</div>
                            <div className={`text-4xl font-bold ${netWorth >= 0 ? "text-green-600" : "text-red-600"}`}>
                                ₹ {netWorth.toLocaleString("en-IN")}
                            </div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-xs text-muted-foreground">Total Assets</div>
                                <div className="font-semibold text-green-600">₹ {totalAssets.toLocaleString("en-IN")}</div>
                            </div>
                            <div>
                                <div className="text-xs text-muted-foreground">Total Liabilities</div>
                                <div className="font-semibold text-red-600">₹ {totalLiabilities.toLocaleString("en-IN")}</div>
                            </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                            Tracking this number annually is the best way to measure financial progress.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
