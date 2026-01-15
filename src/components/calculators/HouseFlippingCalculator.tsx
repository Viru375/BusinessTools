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

export function HouseFlippingCalculator() {
    const [purchasePrice, setPurchasePrice] = useState(4000000);
    const [renovationCost, setRenovationCost] = useState(500000);
    const [holdingCosts, setHoldingCosts] = useState(100000); // Interest, Tax, Utils
    const [salePrice, setSalePrice] = useState(5500000);
    const [sellingCosts, setSellingCosts] = useState(100000); // Brokerage, Closing

    const totalInvestment = purchasePrice + renovationCost + holdingCosts + sellingCosts;
    const netProfit = salePrice - totalInvestment;
    const roi = (netProfit / totalInvestment) * 100;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Project Costs</CardTitle>
                    <CardDescription>Flip Economics.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Purchase Price (₹)</Label>
                        <Input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(Number(e.target.value))} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <Label>Renovation Cost</Label>
                            <Input type="number" value={renovationCost} onChange={(e) => setRenovationCost(Number(e.target.value))} />
                        </div>
                        <div className="space-y-3">
                            <Label>Holding Costs</Label>
                            <Input type="number" value={holdingCosts} onChange={(e) => setHoldingCosts(Number(e.target.value))} />
                            <p className="text-xs text-muted-foreground">Interest, Taxes etc.</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label>Expected Sale Price (₹)</Label>
                        <Input type="number" value={salePrice} onChange={(e) => setSalePrice(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>Selling Costs (Brokerage etc.)</Label>
                        <Input type="number" value={sellingCosts} onChange={(e) => setSellingCosts(Number(e.target.value))} />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Flip Profitability</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">Net Profit</div>
                            <div className={`text-4xl font-bold ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                                ₹ {netProfit.toLocaleString("en-IN")}
                            </div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-xs text-muted-foreground">Total Invested</div>
                                <div className="font-semibold">₹ {totalInvestment.toLocaleString("en-IN")}</div>
                            </div>
                            <div>
                                <div className="text-xs text-muted-foreground">ROI</div>
                                <div className={`font-bold ${roi >= 15 ? "text-green-600" : "text-yellow-600"}`}>
                                    {roi.toFixed(2)} %
                                </div>
                            </div>
                        </div>

                        {roi < 10 && netProfit > 0 && (
                            <div className="text-xs text-yellow-600">
                                Caution: ROI is low. Ensure risk buffer.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
