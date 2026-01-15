"use client";

import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function GstCalculator() {
    const [amount, setAmount] = useState(10000);
    const [taxRate, setTaxRate] = useState(18);
    const [isInclusive, setIsInclusive] = useState(false); // false = Exclusive, true = Inclusive

    const [result, setResult] = useState({
        netAmount: 0,
        gstAmount: 0,
        totalAmount: 0,
    });

    useEffect(() => {
        let net = 0, gst = 0, total = 0;

        if (isInclusive) {
            // Amount is Total
            // Net = Total / (1 + rate/100)
            total = amount;
            net = amount / (1 + taxRate / 100);
            gst = total - net;
        } else {
            // Amount is Net
            // GST = Net * rate/100
            net = amount;
            gst = amount * (taxRate / 100);
            total = net + gst;
        }

        setResult({
            netAmount: net,
            gstAmount: gst,
            totalAmount: total,
        });
    }, [amount, taxRate, isInclusive]);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>GST Inputs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Amount (₹)</Label>
                        <Input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                        />
                    </div>

                    <div className="space-y-4">
                        <Label>Tax Slab</Label>
                        <div className="grid grid-cols-5 gap-2">
                            {[5, 12, 18, 28].map((rate) => (
                                <Button
                                    key={rate}
                                    variant={taxRate === rate ? "default" : "outline"}
                                    onClick={() => setTaxRate(rate)}
                                    size="sm"
                                >
                                    {rate}%
                                </Button>
                            ))}
                            <div className="relative">
                                <Input
                                    type="number"
                                    value={taxRate}
                                    onChange={(e) => setTaxRate(Number(e.target.value))}
                                    className="w-full"
                                    placeholder="Custom"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 border rounded-md">
                        <Button
                            variant={!isInclusive ? "default" : "secondary"}
                            className="w-full"
                            onClick={() => setIsInclusive(false)}
                        >
                            GST Exclusive
                        </Button>
                        <Button
                            variant={isInclusive ? "default" : "secondary"}
                            className="w-full"
                            onClick={() => setIsInclusive(true)}
                        >
                            GST Inclusive
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                    <CardTitle className="text-primary text-center">Result</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-muted-foreground">Net Amount</span>
                        <span className="text-xl font-semibold">₹ {result.netAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-muted-foreground">GST Amount ({taxRate}%)</span>
                        <span className="text-xl font-semibold text-red-500">₹ {result.gstAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between items-center py-4">
                        <span className="font-bold text-lg">Total Amount</span>
                        <span className="text-3xl font-bold text-primary">₹ {result.totalAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
