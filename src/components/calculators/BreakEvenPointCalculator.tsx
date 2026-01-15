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

export function BreakEvenPointCalculator() {
    const [fixedCost, setFixedCost] = useState(5000);
    const [variableCost, setVariableCost] = useState(20); // Per unit
    const [price, setPrice] = useState(50); // Per unit

    // BEP (Units) = Fixed Cost / (Price - Variable Cost)
    // BEP (Sales) = BEP Units * Price

    const contributionMargin = price - variableCost;
    const bepUnits = contributionMargin > 0 ? Math.ceil(fixedCost / contributionMargin) : 0;
    const bepSales = bepUnits * price;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Cost & Price Inputs</CardTitle>
                    <CardDescription>Find where revenue equals costs.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Total Fixed Costs ($)</Label>
                        <Input type="number" value={fixedCost} onChange={(e) => setFixedCost(Number(e.target.value))} />
                        <p className="text-xs text-muted-foreground">Rent, Salaries, Insurance etc.</p>
                    </div>

                    <div className="space-y-3">
                        <Label>Variable Cost Per Unit ($)</Label>
                        <Input type="number" value={variableCost} onChange={(e) => setVariableCost(Number(e.target.value))} />
                        <p className="text-xs text-muted-foreground">Materials, Labor per item etc.</p>
                    </div>

                    <div className="space-y-3">
                        <Label>Selling Price Per Unit ($)</Label>
                        <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Break-Even Point</CardTitle></CardHeader>
                    <CardContent className="space-y-8 text-center">
                        <div>
                            <div className="text-sm text-muted-foreground">Units to Sell</div>
                            <div className="text-5xl font-bold text-primary">
                                {bepUnits.toLocaleString()}
                            </div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border">
                            <div className="text-sm text-muted-foreground">Revenue Needed</div>
                            <div className="text-3xl font-bold text-green-600">
                                $ {bepSales.toLocaleString()}
                            </div>
                        </div>

                        {contributionMargin <= 0 && (
                            <div className="text-red-500 text-sm font-semibold">
                                Warning: Variable cost is higher than selling price. You lose money on every sale!
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
