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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function FibonacciRetracementCalculator() {
    const [high, setHigh] = useState(150);
    const [low, setLow] = useState(100);
    const [trend, setTrend] = useState("Uptrend"); // Uptrend or Downtrend

    const [levels, setLevels] = useState<any[]>([]);

    useEffect(() => {
        const diff = high - low;
        const fibRatios = [0.236, 0.382, 0.5, 0.618, 0.786];

        let calcLevels = [];

        if (trend === "Uptrend") {
            // Retracement from High downwards
            // Level = High - (Diff * Ratio)
            // 0% is High, 100% is Low

            calcLevels.push({ ratio: "0%", value: high, color: "text-red-500" });
            fibRatios.forEach(r => {
                calcLevels.push({
                    ratio: `${(r * 100).toFixed(1)}%`,
                    value: high - (diff * r),
                    color: r === 0.5 || r === 0.618 ? "text-green-600 font-bold" : "text-muted-foreground"
                });
            });
            calcLevels.push({ ratio: "100%", value: low, color: "text-blue-500" });
        } else {
            // Downtrend
            // Retracement from Low upwards
            // Level = Low + (Diff * Ratio)
            // 0% is Low, 100% is High

            calcLevels.push({ ratio: "0%", value: low, color: "text-red-500" });
            fibRatios.forEach(r => {
                calcLevels.push({
                    ratio: `${(r * 100).toFixed(1)}%`,
                    value: low + (diff * r),
                    color: r === 0.5 || r === 0.618 ? "text-green-600 font-bold" : "text-muted-foreground"
                });
            });
            calcLevels.push({ ratio: "100%", value: high, color: "text-blue-500" });
        }

        setLevels(calcLevels);

    }, [high, low, trend]);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Trend Inputs</CardTitle>
                    <CardDescription>Enter swing high and low.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Trend Direction</Label>
                        <Select value={trend} onValueChange={setTrend}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Uptrend">Uptrend (Bullish)</SelectItem>
                                <SelectItem value="Downtrend">Downtrend (Bearish)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <Label>Swing High</Label>
                            <Input type="number" value={high} onChange={(e) => setHigh(Number(e.target.value))} />
                        </div>
                        <div className="space-y-3">
                            <Label>Swing Low</Label>
                            <Input type="number" value={low} onChange={(e) => setLow(Number(e.target.value))} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Retracement Levels</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {levels.map((l, i) => (
                                <div key={i} className="flex justify-between items-center p-2 border-b last:border-0 hover:bg-white/50 transition-colors">
                                    <span className="text-sm font-medium">{l.ratio}</span>
                                    <span className={`text-lg ${l.color}`}>
                                        {l.value.toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-xs text-center text-muted-foreground">
                            Golden Zone: 50% - 61.8%
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
