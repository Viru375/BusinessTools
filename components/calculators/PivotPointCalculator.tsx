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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function PivotPointCalculator() {
    const [high, setHigh] = useState(105);
    const [low, setLow] = useState(98);
    const [close, setClose] = useState(102);
    const [method, setMethod] = useState("Standard");

    const [levels, setLevels] = useState<any>(null);

    const calculate = () => {
        // Basic Pivot (P)
        const p = (high + low + close) / 3;

        let result = {};

        if (method === "Standard") {
            // R1, S1
            const r1 = (2 * p) - low;
            const s1 = (2 * p) - high;

            // R2, S2
            const r2 = p + (high - low);
            const s2 = p - (high - low);

            // R3, S3
            const r3 = high + 2 * (p - low);
            const s3 = low - 2 * (high - p);

            result = { p, r1, s1, r2, s2, r3, s3 };
        } else if (method === "Fibonacci") {
            // P
            // R1 = P + 0.382 * (H-L)
            // S1 = P - 0.382 * (H-L)
            // R2 = P + 0.618 * (H-L)
            // S2 = P - 0.618 * (H-L)

            const range = high - low;
            const r1 = p + (0.382 * range);
            const s1 = p - (0.382 * range);
            const r2 = p + (0.618 * range);
            const s2 = p - (0.618 * range);
            const r3 = p + (1.000 * range);
            const s3 = p - (1.000 * range);

            result = { p, r1, s1, r2, s2, r3, s3 };
        }
        // Add Camarilla / Woodie if needed later

        setLevels(result);
    };

    // Auto calc on change
    React.useEffect(() => {
        if (high > 0 && low > 0 && close > 0) calculate();
    }, [high, low, close, method]);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Previous Day Data</CardTitle>
                    <CardDescription>Enter High, Low, Close.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>High</Label>
                        <Input type="number" value={high} onChange={(e) => setHigh(Number(e.target.value))} />
                    </div>
                    <div className="space-y-3">
                        <Label>Low</Label>
                        <Input type="number" value={low} onChange={(e) => setLow(Number(e.target.value))} />
                    </div>
                    <div className="space-y-3">
                        <Label>Close</Label>
                        <Input type="number" value={close} onChange={(e) => setClose(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>Method</Label>
                        <Select value={method} onValueChange={setMethod}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Standard">Standard (Classic)</SelectItem>
                                <SelectItem value="Fibonacci">Fibonacci</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Pivot Levels</CardTitle></CardHeader>
                    <CardContent>
                        {levels && (
                            <div className="space-y-3 text-center">
                                <div className="p-2 bg-red-100 rounded text-red-800 font-semibold flex justify-between px-6">
                                    <span>R3</span> <span>{levels.r3.toFixed(2)}</span>
                                </div>
                                <div className="p-2 bg-red-50 rounded text-red-700 font-semibold flex justify-between px-6">
                                    <span>R2</span> <span>{levels.r2.toFixed(2)}</span>
                                </div>
                                <div className="p-2 bg-red-50/50 rounded text-red-600 font-semibold flex justify-between px-6">
                                    <span>R1</span> <span>{levels.r1.toFixed(2)}</span>
                                </div>

                                <div className="py-4 border-y-2 border-primary/20 text-xl font-bold text-primary">
                                    Pivot Point: {levels.p.toFixed(2)}
                                </div>

                                <div className="p-2 bg-green-50/50 rounded text-green-600 font-semibold flex justify-between px-6">
                                    <span>S1</span> <span>{levels.s1.toFixed(2)}</span>
                                </div>
                                <div className="p-2 bg-green-50 rounded text-green-700 font-semibold flex justify-between px-6">
                                    <span>S2</span> <span>{levels.s2.toFixed(2)}</span>
                                </div>
                                <div className="p-2 bg-green-100 rounded text-green-800 font-semibold flex justify-between px-6">
                                    <span>S3</span> <span>{levels.s3.toFixed(2)}</span>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
