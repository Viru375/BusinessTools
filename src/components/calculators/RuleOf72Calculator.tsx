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

export function RuleOf72Calculator() {
    const [rate, setRate] = useState(12);

    const yearsToDouble = rate > 0 ? (72 / rate).toFixed(2) : "Infinity";

    return (
        <div className="grid gap-6">
            <Card className="max-w-xl mx-auto w-full">
                <CardHeader>
                    <CardTitle>Rule of 72 Inputs</CardTitle>
                    <CardDescription>Estimate how many years to double your money.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <Label>Expected Annual Return (%)</Label>
                            <Input
                                type="number"
                                value={rate}
                                onChange={(e) => setRate(Number(e.target.value))}
                                className="w-24 h-8"
                            />
                        </div>
                        <Slider
                            value={[rate]}
                            onValueChange={(v) => setRate(v[0])}
                            min={1}
                            max={50}
                            step={0.5}
                        />
                    </div>

                    <div className="p-8 bg-primary/10 rounded-xl text-center space-y-2">
                        <h3 className="text-muted-foreground uppercase text-xs font-bold tracking-widest">Doubling Time</h3>
                        <div className="text-5xl font-bold text-primary">{yearsToDouble} Years</div>
                        <p className="text-sm text-muted-foreground pt-2">At {rate}% returns, your investment will double in approximately {yearsToDouble} years.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
