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
import { Button } from "@/components/ui/button";

export function CapitalGainsCalculator() {
    const [assetType, setAssetType] = useState("equity");
    const [buyPrice, setBuyPrice] = useState(100000);
    const [sellPrice, setSellPrice] = useState(150000);
    const [buyDate, setBuyDate] = useState("2023-01-01");
    const [sellDate, setSellDate] = useState("2024-02-01");

    const [result, setResult] = useState<any>(null);

    const calculateCG = () => {
        const buy = new Date(buyDate);
        const sell = new Date(sellDate);

        // Time diff in years
        const distinctYears = (sell.getTime() - buy.getTime()) / (1000 * 3600 * 24 * 365.25);
        const profit = sellPrice - buyPrice;

        let type = "STCG";
        let taxRate = 0;
        let tax = 0;
        let exemption = 0;

        if (assetType === "equity") {
            // Equity funds / Stocks
            // STCG < 1 year (12 months)
            if (distinctYears >= 1) {
                type = "LTCG";
                // New Budget 2024: LTCG 12.5% > 1.25 Lakhs exempt
                taxRate = 12.5;
                exemption = 125000;
            } else {
                type = "STCG";
                // New Budget 2024: STCG 20%
                taxRate = 20;
                exemption = 0;
            }
        } else if (assetType === "debt") {
            // Debt Funds (Now usually taxed as per slab, effectively STCG logic often applies or just slab)
            // For simplicity, let's assume > 3 years implies Indexation or old rules? 
            // Actually recent change: Debt funds taxed at slab.
            // Let's call it "Taxed at Slab"

            if (distinctYears >= 3) {
                type = "Long Term (Taxed at Slab)";
            } else {
                type = "Short Term (Taxed at Slab)";
            }
            taxRate = 0; // Depends on income
        } else {
            // Real Estate / Gold
            // LTCG > 2 years
            if (distinctYears >= 2) {
                type = "LTCG";
                taxRate = 12.5; // New option logic? Or 20% with indexation.
                // To keep simple: 20% with indexation or 12.5% without. user usually picks better.
                // Let's stick to 20% indicative.
                taxRate = 20;
            } else {
                type = "STCG (Slab)";
                taxRate = 0;
            }
        }

        let taxableAmount = 0;
        if (taxRate > 0) {
            taxableAmount = Math.max(0, profit - exemption);
            tax = taxableAmount * (taxRate / 100);
        }

        setResult({
            profit,
            type,
            taxRate,
            tax,
            exemption
        });
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Transaction Details</CardTitle>
                    <CardDescription>Calculate Tax on Profit.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                    <div className="space-y-2">
                        <Label>Asset Type</Label>
                        <Select value={assetType} onValueChange={setAssetType}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="equity">Equity / Mutual Funds (Shares)</SelectItem>
                                <SelectItem value="debt">Debt Mutual Funds</SelectItem>
                                <SelectItem value="other">Real Estate / Gold</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Buy Price (Total)</Label>
                            <Input type="number" value={buyPrice} onChange={(e) => setBuyPrice(Number(e.target.value))} />
                        </div>
                        <div>
                            <Label>Sell Price (Total)</Label>
                            <Input type="number" value={sellPrice} onChange={(e) => setSellPrice(Number(e.target.value))} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Buy Date</Label>
                            <Input type="date" value={buyDate} onChange={(e) => setBuyDate(e.target.value)} />
                        </div>
                        <div>
                            <Label>Sell Date</Label>
                            <Input type="date" value={sellDate} onChange={(e) => setSellDate(e.target.value)} />
                        </div>
                    </div>

                    <Button onClick={calculateCG} className="w-full">Calculate Tax</Button>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-muted/20 h-full">
                    <CardHeader><CardTitle>Tax Result</CardTitle></CardHeader>
                    <CardContent>
                        {result ? (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <div className="text-sm text-muted-foreground">Capital Gain (Profit)</div>
                                    <div className={`text-3xl font-bold ${result.profit >= 0 ? "text-green-600" : "text-red-500"}`}>
                                        ₹ {result.profit.toLocaleString("en-IN")}
                                    </div>
                                </div>

                                <div className="p-4 bg-background border rounded-lg space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Gain Type</span>
                                        <span className="font-semibold">{result.type}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Exemption Applied</span>
                                        <span className="font-semibold">₹ {result.exemption.toLocaleString("en-IN")}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Tax Rate</span>
                                        <span className="font-semibold">{result.taxRate > 0 ? `${result.taxRate}%` : "As per Slab"}</span>
                                    </div>
                                </div>

                                {result.taxRate > 0 && result.profit > 0 && (
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                                        <div className="text-sm text-red-800">Estimated Tax Payable</div>
                                        <div className="text-2xl font-bold text-red-600">₹ {Math.round(result.tax).toLocaleString("en-IN")}</div>
                                    </div>
                                )}
                                {result.taxRate === 0 && (
                                    <div className="text-center text-sm text-muted-foreground">
                                        Tax calculation depends on your total income slab.
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground py-10">
                                Enter details to see tax implication.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
