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

export function DiscountCalculator() {
    const [originalPrice, setOriginalPrice] = useState(1000);
    const [discountPercent, setDiscountPercent] = useState(20);

    const saved = (originalPrice * discountPercent) / 100;
    const finalPrice = originalPrice - saved;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Discount Inputs</CardTitle>
                    <CardDescription>Calculate sale price.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Original Price ($)</Label>
                        <Input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>Discount Percentage (%)</Label>
                        <Input type="number" value={discountPercent} onChange={(e) => setDiscountPercent(Number(e.target.value))} />
                        <Slider value={[discountPercent]} onValueChange={(v) => setDiscountPercent(v[0])} min={1} max={99} step={1} />
                    </div>

                    <div className="flex gap-2">
                        {[10, 20, 25, 50, 75].map((pct) => (
                            <div
                                key={pct}
                                onClick={() => setDiscountPercent(pct)}
                                className="cursor-pointer px-3 py-1 bg-muted rounded hover:bg-primary/20 text-sm font-medium transition-colors"
                            >
                                {pct}%
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Final Price</CardTitle></CardHeader>
                    <CardContent className="space-y-6 text-center">
                        <div>
                            <div className="text-5xl font-bold text-primary">
                                $ {finalPrice.toLocaleString()}
                            </div>
                        </div>

                        <div className="p-4 bg-green-100 border border-green-200 rounded-lg">
                            <div className="text-sm text-green-800">You Save</div>
                            <div className="text-3xl font-bold text-green-700">
                                $ {saved.toLocaleString()}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
