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

export function CapitalGainsPropertyCalculator() {
    const [purchasePrice, setPurchasePrice] = useState(5000000);
    const [salePrice, setSalePrice] = useState(8000000);
    const [purchaseYear, setPurchaseYear] = useState("2015");
    const [saleYear, setSaleYear] = useState("2024");
    const [transferExpenses, setTransferExpenses] = useState(50000); // Brokerage etc.

    // Simplified CII Data (Cost Inflation Index) - In real app, store full JSON
    const ciiMap: Record<string, number> = {
        "2001": 100, "2002": 105, "2003": 109, "2004": 113, "2005": 117,
        "2006": 122, "2007": 129, "2008": 137, "2009": 148, "2010": 167,
        "2011": 184, "2012": 200, "2013": 220, "2014": 240, "2015": 254,
        "2016": 264, "2017": 272, "2018": 280, "2019": 289, "2020": 301,
        "2021": 317, "2022": 331, "2023": 348, "2024": 363 // Estimated
    };

    const holdingPeriod = Number(saleYear) - Number(purchaseYear);
    const type = holdingPeriod >= 2 ? "Long Term (LTCG)" : "Short Term (STCG)";

    // Logic: 
    // STCG: Added to income, taxed at slab.
    // LTCG: 
    // Old Regime: 20% with Indexation.
    // New Budget 2024 update: 12.5% WITHOUT Indexation (option to choose for some).
    // Let's show the standard Indexation calculation for legacy comparison or "With Indexation" view.

    const ciiPurchase = ciiMap[purchaseYear] || 363;
    const ciiSale = ciiMap[saleYear] || 363;

    const indexedCost = purchasePrice * (ciiSale / ciiPurchase);

    // 1. With Indexation
    const capitalGainIndexed = salePrice - transferExpenses - indexedCost;
    const taxIndexed = capitalGainIndexed > 0 ? capitalGainIndexed * 0.20 : 0;

    // 2. Without Indexation
    const capitalGainFlat = salePrice - transferExpenses - purchasePrice;
    const taxFlat = capitalGainFlat > 0 ? capitalGainFlat * 0.125 : 0;

    // Which is better?
    const betterTax = Math.min(taxIndexed, taxFlat);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Transaction Details</CardTitle>
                    <CardDescription>Compute Property Tax Liability.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <Label>Purchase Price (₹)</Label>
                            <Input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(Number(e.target.value))} />
                        </div>
                        <div className="space-y-3">
                            <Label>Purchase Year</Label>
                            <Select value={purchaseYear} onValueChange={setPurchaseYear}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {Object.keys(ciiMap).map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <Label>Sale Price (₹)</Label>
                            <Input type="number" value={salePrice} onChange={(e) => setSalePrice(Number(e.target.value))} />
                        </div>
                        <div className="space-y-3">
                            <Label>Sale Year</Label>
                            <Select value={saleYear} onValueChange={setSaleYear}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {Object.keys(ciiMap).map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label>Transfer Expenses (₹)</Label>
                        <Input type="number" value={transferExpenses} onChange={(e) => setTransferExpenses(Number(e.target.value))} />
                        <p className="text-xs text-muted-foreground">Brokerage, Legal fees etc.</p>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Tax Estimate</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-center">
                            <div className="text-sm text-muted-foreground">{type}</div>
                            <div className="text-4xl font-bold text-primary">
                                ₹ {Math.round(type.includes("Short") ? capitalGainFlat : betterTax).toLocaleString("en-IN")}
                            </div>
                            {type.includes("Long") && (
                                <div className="text-xs text-muted-foreground mt-1">
                                    Lowest of (12.5% Flat or 20% Indexed)
                                </div>
                            )}
                            {type.includes("Short") && (
                                <div className="text-xs text-muted-foreground mt-1">
                                    Added to taxable income (Slab Rate)
                                </div>
                            )}
                        </div>

                        {type.includes("Long") && (
                            <div className="p-4 bg-background rounded-lg border space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span>Indexed Cost (CII {ciiPurchase} → {ciiSale})</span>
                                    <span className="font-semibold">₹ {Math.round(indexedCost).toLocaleString()}</span>
                                </div>
                                <div className="border-t pt-2 flex justify-between">
                                    <span className="text-muted-foreground">Option 1: 20% with Indexation</span>
                                    <span className="font-semibold">₹ {Math.round(taxIndexed).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Option 2: 12.5% Flat</span>
                                    <span className="font-semibold">₹ {Math.round(taxFlat).toLocaleString()}</span>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
