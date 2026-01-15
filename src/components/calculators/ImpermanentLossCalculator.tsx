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

export function ImpermanentLossCalculator() {
    const [tokenAPriceChange, setTokenAPriceChange] = useState(50); // % change
    const [tokenBPriceChange, setTokenBPriceChange] = useState(0); // Stable?

    // Logic: 
    // Divergence = P_ratio_end / P_ratio_start
    // IL = 2 * sqrt(price_ratio) / (1 + price_ratio) - 1

    // Let P1 = P_TokenA_End / P_TokenA_Start = 1 + changeA/100
    // Let P2 = P_TokenB_End / P_TokenB_Start = 1 + changeB/100

    // Simplified for standard 50/50 pool:
    // Ratio k = P1 / P2

    const p1 = 1 + tokenAPriceChange / 100;
    const p2 = 1 + tokenBPriceChange / 100;

    const priceRatio = p1 / p2;

    const il = (2 * Math.sqrt(priceRatio) / (1 + priceRatio)) - 1;
    const ilPercent = Math.abs(il * 100);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Pool Parameters</CardTitle>
                    <CardDescription>Change in Token Prices.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Token A Price Change (%)</Label>
                        <Input type="number" value={tokenAPriceChange} onChange={(e) => setTokenAPriceChange(Number(e.target.value))} />
                        <p className="text-xs text-muted-foreground">e.g. 50% means price went up 1.5x</p>
                    </div>

                    <div className="space-y-3">
                        <Label>Token B Price Change (%)</Label>
                        <Input type="number" value={tokenBPriceChange} onChange={(e) => setTokenBPriceChange(Number(e.target.value))} />
                        <p className="text-xs text-muted-foreground">Use 0 for stablecoins.</p>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Risk Calculation</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">Impermanent Loss</div>
                            <div className="text-4xl font-bold text-red-600">
                                {ilPercent.toFixed(2)} %
                            </div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border text-sm">
                            vs HODLing: <span className="font-bold text-red-500">You lost {ilPercent.toFixed(2)}%</span> value compared to just holding the tokens.
                        </div>

                        <div className="text-xs text-muted-foreground">
                            *This loss is only realized if you withdraw liquidity at current prices. Trading fees earned may offset this loss.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
