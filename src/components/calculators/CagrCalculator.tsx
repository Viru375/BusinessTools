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

export function CagrCalculator() {
    const [initialValue, setInitialValue] = useState(10000);
    const [finalValue, setFinalValue] = useState(20000);
    const [years, setYears] = useState(5);

    const [cagr, setCagr] = useState(0);

    useEffect(() => {
        // CAGR = ( (EV/BV)^(1/n) ) - 1
        if (initialValue > 0 && years > 0 && finalValue >= 0) {
            const val = Math.pow((finalValue / initialValue), (1 / years)) - 1;
            setCagr(val * 100);
        } else {
            setCagr(0);
        }
    }, [initialValue, finalValue, years]);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>CAGR Inputs</CardTitle>
                    <CardDescription>Calculate Compound Annual Growth Rate.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Initial Investment Value (₹)</Label>
                        <Input
                            type="number"
                            value={initialValue}
                            onChange={(e) => setInitialValue(Number(e.target.value))}
                        />
                    </div>

                    <div className="space-y-3">
                        <Label>Final Investment Value (₹)</Label>
                        <Input
                            type="number"
                            value={finalValue}
                            onChange={(e) => setFinalValue(Number(e.target.value))}
                        />
                    </div>

                    <div className="space-y-3">
                        <Label>Duration (Years)</Label>
                        <Input
                            type="number"
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20 h-full flex flex-col justify-center">
                    <CardHeader>
                        <CardTitle className="text-center text-primary">CAGR Result</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-6xl font-bold text-center text-primary mb-2">
                            {cagr.toFixed(2)} %
                        </div>
                        <p className="text-center text-muted-foreground text-sm">
                            Compound Annual Growth Rate
                        </p>

                        {cagr > 15 && (
                            <div className="mt-8 p-4 bg-green-100 text-green-800 rounded-lg text-center font-medium">
                                Excellent Performance! 🚀
                            </div>
                        )}
                        {cagr < 5 && cagr > 0 && (
                            <div className="mt-8 p-4 bg-yellow-100 text-yellow-800 rounded-lg text-center font-medium">
                                Below Inflation Average ⚠️
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
