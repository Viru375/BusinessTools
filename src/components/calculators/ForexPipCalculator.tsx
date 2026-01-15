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

export function ForexPipCalculator() {
    const [currencyPair, setCurrencyPair] = useState("EUR/USD");
    const [lotSize, setLotSize] = useState(100000); // Standard Lot
    const [exchangeRate, setExchangeRate] = useState(1.0850); // Ask price usually?

    // Pip Size Logic
    // Most pairs: 0.0001
    // JPY pairs: 0.01
    const isJpy = currencyPair.includes("JPY");
    const pipDecimal = isJpy ? 0.01 : 0.0001;

    // Pip Value Formula
    // Quote Currency Value = Lot Size * Pip Size
    // If Quote is Account Currency (e.g. USD in EUR/USD), value is direct.
    // If Account is Base (e.g. USD in USD/JPY), we convert.

    // Assuming Account Currency is USD for simplicity in this V1.

    let pipValue = 0;

    if (currencyPair.endsWith("USD")) {
        // EUR/USD, GBP/USD etc.
        // 100,000 * 0.0001 = 10 USD
        pipValue = lotSize * pipDecimal;
    } else if (currencyPair.startsWith("USD")) {
        // USD/JPY, USD/CHF
        // Value in Quote currency = Lot * PipDecimal
        // Convert to USD = (Lot * PipDecimal) / ExchangeRate
        pipValue = (lotSize * pipDecimal) / exchangeRate;
    } else {
        // Cross pairs (e.g. EUR/GBP).
        // Logic complex without real-time cross rates.
        // Approximating for simple display or asking user for "Quote/USD" rate.
        // For now, let's treat generic "Quote" value.
        pipValue = lotSize * pipDecimal; // In Quote Currency
    }

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Trading Parameters</CardTitle>
                    <CardDescription>Calculate Pip Value.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Currency Pair</Label>
                        <Select value={currencyPair} onValueChange={setCurrencyPair}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="EUR/USD">EUR/USD</SelectItem>
                                <SelectItem value="GBP/USD">GBP/USD</SelectItem>
                                <SelectItem value="USD/JPY">USD/JPY</SelectItem>
                                <SelectItem value="USD/CHF">USD/CHF</SelectItem>
                                <SelectItem value="USD/CAD">USD/CAD</SelectItem>
                                <SelectItem value="AUD/USD">AUD/USD</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-3">
                        <Label>Trade Size (Units)</Label>
                        <Select value={String(lotSize)} onValueChange={(v) => setLotSize(Number(v))}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1000">Micro Lot (1,000)</SelectItem>
                                <SelectItem value="10000">Mini Lot (10,000)</SelectItem>
                                <SelectItem value="100000">Standard Lot (100,000)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-3">
                        <Label>Current Exchange Rate</Label>
                        <Input type="number" value={exchangeRate} onChange={(e) => setExchangeRate(Number(e.target.value))} />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Pip Value</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">Value per Pip (USD)</div>
                            <div className="text-4xl font-bold text-primary">
                                $ {pipValue.toFixed(2)}
                            </div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border">
                            <div className="text-xs text-muted-foreground">For 10 Pips Movement</div>
                            <div className="text-2xl font-bold text-green-600">
                                $ {(pipValue * 10).toFixed(2)}
                            </div>
                        </div>

                        {!currencyPair.includes("USD") && (
                            <div className="text-xs text-muted-foreground mt-2">
                                *Value shown is in Quote Currency. Convert to your account currency if different.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
