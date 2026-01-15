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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft } from "lucide-react";

export function CurrencyConverter() {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");

    // Static Rates (Base USD) - As of Jan 2026 (Hypothetical/Approx)
    // USD 1 = INR 88? EUR 0.92? GBP 0.78? JPY 145?
    // Let's use standard representative rates.
    const rates: Record<string, number> = {
        "USD": 1,
        "EUR": 0.92,
        "GBP": 0.79,
        "INR": 86.50, // Future estimate
        "JPY": 150.00,
        "AUD": 1.52,
        "CAD": 1.36,
        "CNY": 7.25,
        "AED": 3.67
    };

    const [result, setResult] = useState(0);

    useEffect(() => {
        // Convert From -> USD -> To
        const inUsd = amount / rates[fromCurrency];
        const final = inUsd * rates[toCurrency];
        setResult(final);
    }, [amount, fromCurrency, toCurrency]);

    const swap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    }

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Converter</CardTitle>
                    <CardDescription>Major world currencies.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Amount</Label>
                        <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                    </div>

                    <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-end">
                        <div className="space-y-3">
                            <Label>From</Label>
                            <Select value={fromCurrency} onValueChange={setFromCurrency}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {Object.keys(rates).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="pb-3 text-muted-foreground cursor-pointer hover:text-primary transition-colors" onClick={swap}>
                            <ArrowRightLeft size={20} />
                        </div>

                        <div className="space-y-3">
                            <Label>To</Label>
                            <Select value={toCurrency} onValueChange={setToCurrency}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {Object.keys(rates).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Converted Value</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">{amount} {fromCurrency} =</div>
                            <div className="text-4xl font-bold text-primary">
                                {result.toLocaleString(undefined, { maximumFractionDigits: 2 })} {toCurrency}
                            </div>
                        </div>

                        <div className="text-xs text-muted-foreground border-t pt-4">
                            Exchange Rate Used: 1 {fromCurrency} = {(rates[toCurrency] / rates[fromCurrency]).toFixed(4)} {toCurrency}
                            <br />
                            *Rates are indicative. Actual bank rates may vary.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
