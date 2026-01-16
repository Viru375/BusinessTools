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

export function CryptoSipCalculator() {
    const [monthlyInvestment, setMonthlyInvestment] = useState(100);
    const [durationYears, setDurationYears] = useState(3);
    const [expectedAnnualReturn, setExpectedAnnualReturn] = useState(50); // Crypto returns are high volatility

    // Calculation
    const monthlyRate = expectedAnnualReturn / 12 / 100;
    const months = durationYears * 12;

    // FV of Annuity
    const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvested = monthlyInvestment * months;
    const wealthGained = futureValue - totalInvested;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>DCA Strategy</CardTitle>
                    <CardDescription>Dollar Cost Averaging Projection.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Monthly Investment ($)</Label>
                        <Input type="number" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>Expected Annual Return (%)</Label>
                        <Input type="number" value={expectedAnnualReturn} onChange={(e) => setExpectedAnnualReturn(Number(e.target.value))} />
                        <p className="text-xs text-muted-foreground">Conservative BTC: ~50%? TradFi: ~10%. High Risk.</p>
                    </div>

                    <div className="space-y-3">
                        <Label>Duration (Years)</Label>
                        <Slider value={[durationYears]} onValueChange={(v) => setDurationYears(v[0])} min={1} max={10} />
                        <div className="text-right text-xs">{durationYears} Years</div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Projected Value</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">Portfolio Value</div>
                            <div className="text-4xl font-bold text-primary">
                                $ {futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-xs text-muted-foreground">Total Invested</div>
                                <div className="font-semibold">$ {totalInvested.toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="text-xs text-muted-foreground">Total Gain</div>
                                <div className="font-bold text-green-600">
                                    $ {wealthGained.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </div>
                            </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                            *Crypto markets are highly volatile. Past performance is not indicative of future results.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
