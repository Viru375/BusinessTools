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
import { Slider } from "@/components/ui/slider";

export function PositionSizeCalculator() {
    const [capital, setCapital] = useState(100000);
    const [riskPercent, setRiskPercent] = useState(1);
    const [entryPrice, setEntryPrice] = useState(100);
    const [stopLoss, setStopLoss] = useState(95);

    const riskAmount = (capital * riskPercent) / 100;
    const riskPerShare = Math.abs(entryPrice - stopLoss);

    const quantity = riskPerShare > 0 ? Math.floor(riskAmount / riskPerShare) : 0;
    const totalExposure = quantity * entryPrice;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Risk Parameters</CardTitle>
                    <CardDescription>Calculate safe position size.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Total Trading Capital (₹)</Label>
                        <Input type="number" value={capital} onChange={(e) => setCapital(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>Risk per Trade (%)</Label>
                        <Input type="number" value={riskPercent} onChange={(e) => setRiskPercent(Number(e.target.value))} />
                        <Slider value={[riskPercent]} onValueChange={(v) => setRiskPercent(v[0])} min={0.5} max={5} step={0.5} />
                        <p className="text-xs text-muted-foreground">Standard risk is 1-2% of capital.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <Label>Entry Price</Label>
                            <Input type="number" value={entryPrice} onChange={(e) => setEntryPrice(Number(e.target.value))} />
                        </div>
                        <div className="space-y-3">
                            <Label>Stop Loss</Label>
                            <Input type="number" value={stopLoss} onChange={(e) => setStopLoss(Number(e.target.value))} max={entryPrice} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Safe Position</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">Recommended Quantity</div>
                            <div className="text-5xl font-bold text-primary">
                                {quantity} <span className="text-lg text-muted-foreground font-normal">shares</span>
                            </div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-xs text-muted-foreground">Amount At Risk</div>
                                <div className="font-semibold text-red-600">₹ {riskAmount.toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="text-xs text-muted-foreground">Total Capital Deployed</div>
                                <div className="font-semibold">₹ {totalExposure.toLocaleString()}</div>
                            </div>
                        </div>

                        {quantity > 0 && totalExposure > capital && (
                            <div className="text-xs text-destructive font-medium border border-destructive/20 bg-destructive/5 p-2 rounded">
                                Warning: Required capital exceeds total capital. Use leverage or reduce stop-loss.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
