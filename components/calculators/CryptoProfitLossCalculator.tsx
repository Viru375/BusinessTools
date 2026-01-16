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

export function CryptoProfitLossCalculator() {
    const [investment, setInvestment] = useState(1000);
    const [initialPrice, setInitialPrice] = useState(50000);
    const [sellingPrice, setSellingPrice] = useState(65000);
    const [feePercentage, setFeePercentage] = useState(0.1); // Exchange fee
    const [currency, setCurrency] = useState("USD");

    // Logic: 
    // Coins bought = Investment / Initial Price
    const coins = investment / initialPrice;

    // Value at sell
    const rawValue = coins * sellingPrice;

    // Fees: Buying fee + Selling fee
    // Buy Fee
    const buyFee = investment * (feePercentage / 100);
    // Sell Fee
    const sellFee = rawValue * (feePercentage / 100);
    const totalFees = buyFee + sellFee;

    const exitValue = rawValue - totalFees;
    const netProfit = exitValue - investment;
    const roi = (netProfit / investment) * 100;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Trade Details</CardTitle>
                    <CardDescription>Profit Analysis.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Currency</Label>
                        <Select value={currency} onValueChange={setCurrency}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="USD">USD ($)</SelectItem>
                                <SelectItem value="INR">INR (₹)</SelectItem>
                                <SelectItem value="EUR">EUR (€)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-3">
                        <Label>Invested Amount</Label>
                        <Input type="number" value={investment} onChange={(e) => setInvestment(Number(e.target.value))} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <Label>Buy Price (per coin)</Label>
                            <Input type="number" value={initialPrice} onChange={(e) => setInitialPrice(Number(e.target.value))} />
                        </div>
                        <div className="space-y-3">
                            <Label>Sell Price (per coin)</Label>
                            <Input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(Number(e.target.value))} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label>Exchange Fee (%)</Label>
                        <Input type="number" value={feePercentage} onChange={(e) => setFeePercentage(Number(e.target.value))} />
                        <p className="text-xs text-muted-foreground">Applied on both buy and sell.</p>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Outcome</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">Net {netProfit >= 0 ? "Profit" : "Loss"}</div>
                            <div className={`text-4xl font-bold ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                                {currency === "INR" ? "₹" : currency === "EUR" ? "€" : "$"} {Math.abs(netProfit).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-xs text-muted-foreground">Total Value</div>
                                <div className="font-semibold">{currency === "INR" ? "₹" : "$"} {exitValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                            </div>
                            <div>
                                <div className="text-xs text-muted-foreground">ROI</div>
                                <div className={`font-bold ${roi >= 0 ? "text-green-600" : "text-red-600"}`}>
                                    {roi.toFixed(2)} %
                                </div>
                            </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                            Total Fees Estimates: {currency === "INR" ? "₹" : "$"} {totalFees.toFixed(2)}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
