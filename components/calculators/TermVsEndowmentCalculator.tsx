"use client";

import React, { useState, useEffect } from "react";
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

export function TermVsEndowmentCalculator() {
    const [sumAssured, setSumAssured] = useState(10000000); // 1 Crore
    const [term, setTerm] = useState(20);
    const [endowmentPremium, setEndowmentPremium] = useState(500000); // Usually 50k per lakh? No, for 1Cr it's huge. Let's say 5L premium provides 1Cr cover? Unlikely.
    // Realistically: 
    // Endowment: Premium ~ 5-6% of SA. So 1Cr SA -> 5-6L Premium. Return ~ 5-6%.
    // Term: 1Cr SA -> 15-20k Premium.

    const [termPremium, setTermPremium] = useState(15000);
    const [investmentReturn, setInvestmentReturn] = useState(12); // Nifty Index Fund etc.
    const [endowmentReturn, setEndowmentReturn] = useState(6); // Typical traditional plan return

    const [result, setResult] = useState({
        termStrategyValue: 0,
        endowmentMaturity: 0,
        difference: 0
    });

    useEffect(() => {
        // 1. Endowment Corpus
        // FV of Annuity (Premiums). Assumes simplified annual compounding.
        // In reality, bonuses are declared. We simulate with a fixed rate.
        const rEndow = endowmentReturn / 100;
        const n = term;
        const endowValue = endowmentPremium * ((Math.pow(1 + rEndow, n) - 1) / rEndow) * (1 + rEndow);

        // 2. Term + Invest Difference
        const surplus = endowmentPremium - termPremium;
        if (surplus > 0) {
            const rInvest = investmentReturn / 100;
            const termInvestValue = surplus * ((Math.pow(1 + rInvest, n) - 1) / rInvest) * (1 + rInvest);

            setResult({
                termStrategyValue: Math.round(termInvestValue),
                endowmentMaturity: Math.round(endowValue),
                difference: Math.round(termInvestValue - endowValue)
            });
        } else {
            // Edge case if Term is costlier (impossible for same SA)
            setResult({
                termStrategyValue: 0,
                endowmentMaturity: Math.round(endowValue),
                difference: 0
            });
        }

    }, [sumAssured, term, endowmentPremium, termPremium, investmentReturn, endowmentReturn]);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Plan Comparison</CardTitle>
                    <CardDescription>Buy Term & Invest the Rest?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Life Cover (Sum Assured - ₹)</Label>
                        <Input type="number" value={sumAssured} onChange={(e) => setSumAssured(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>Policy Term (Years)</Label>
                        <Slider value={[term]} onValueChange={(v) => setTerm(v[0])} min={10} max={40} />
                        <div className="text-right text-xs">{term} Years</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <Label>Endowment Premium (₹)</Label>
                            <Input type="number" value={endowmentPremium} onChange={(e) => setEndowmentPremium(Number(e.target.value))} />
                        </div>
                        <div className="space-y-3">
                            <Label>Term Plan Premium (₹)</Label>
                            <Input type="number" value={termPremium} onChange={(e) => setTermPremium(Number(e.target.value))} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <Label>Endowment Return (%)</Label>
                            <Input type="number" value={endowmentReturn} onChange={(e) => setEndowmentReturn(Number(e.target.value))} />
                        </div>
                        <div className="space-y-3">
                            <Label>Equity/MF Return (%)</Label>
                            <Input type="number" value={investmentReturn} onChange={(e) => setInvestmentReturn(Number(e.target.value))} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Strategy Comparison</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">Extra Wealth with &apos;Term + Invest&apos;</div>
                            <div className="text-4xl font-bold text-green-600">
                                ₹ {(result.difference / 100000).toFixed(2)} Lakhs
                            </div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border space-y-4">
                            <div>
                                <div className="text-xs text-muted-foreground">Term Plan + Investment Corpus</div>
                                <div className="text-2xl font-bold">₹ {(result.termStrategyValue / 10000000).toFixed(2)} Cr</div>
                            </div>
                            <div className="border-t pt-4">
                                <div className="text-xs text-muted-foreground">Endowment Strategy Maturity</div>
                                <div className="text-2xl font-bold text-muted-foreground">₹ {(result.endowmentMaturity / 10000000).toFixed(2)} Cr</div>
                            </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                            Comparison assumes both policies provide the SAME life cover ({sumAssured}).
                            The surplus premium saved by not buying Endowment is invested at {investmentReturn}%.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
