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

export function RentVsBuyCalculator() {
    const [propertyPrice, setPropertyPrice] = useState(5000000);
    const [rent, setRent] = useState(15000); // Monthly
    const [years, setYears] = useState(20);
    const [investmentReturn, setInvestmentReturn] = useState(10); // Opportunity cost Return
    const [loanInterest, setLoanInterest] = useState(8.5);
    const [propertyAppreciation, setPropertyAppreciation] = useState(5);
    const [rentInflation, setRentInflation] = useState(5);

    const [result, setResult] = useState({
        buyingNetWorth: 0,
        rentingNetWorth: 0,
        verdict: ""
    });

    useEffect(() => {
        // 1. Buying Scenario
        // Down payment: 20%
        const downPayment = propertyPrice * 0.2;
        const loanAmount = propertyPrice * 0.8;

        // EMI
        const r = loanInterest / 12 / 100;
        const n = Math.min(years * 12, 240); // Max 20y tenor for calc simplicity or use `years`
        const loanTenureMonths = years * 12;

        const emi = (loanAmount * r * Math.pow(1 + r, loanTenureMonths)) / (Math.pow(1 + r, loanTenureMonths) - 1);

        // Total spent on borrowing
        // Property Value after Years
        const futurePropertyValue = propertyPrice * Math.pow(1 + propertyAppreciation / 100, years);

        // Total Outflow for Buyer = DownPayment + (EMI * Months) (Ignoring maintenance for simplicity)
        // Actually, wealth is Asset Value - Outstanding Loan (0 if paid off)
        const buyingWealth = futurePropertyValue;

        // 2. Renting Scenario
        // Invest Downpayment
        // Invest Monthly Savings (EMI - Rent)
        // If Rent > EMI, negative savings (cost).

        let investmentBalance = downPayment * Math.pow(1 + investmentReturn / 100, years);

        let currentRent = rent;
        let rentingWealth = investmentBalance;

        // Yearly Loop for SIP of difference
        let totalRentPaid = 0;

        // Simplify: Monthly loop
        let accumulatedSavings = 0; // Future value of monthly differences

        for (let y = 1; y <= years; y++) {
            const monthlyDiff = emi - currentRent;

            // Accumulate this difference for 12 months with interest
            // FV of series for 1 year
            // We add this to our investment pool.

            // If EMI > Rent, Renter saves money and invests it.
            // If Rent > EMI, Renter pays extra, effectively withdrawing? Assume negative investment.

            const annualDiffWithInterest = monthlyDiff * 12 * Math.pow(1 + investmentReturn / 100, years - y); // Rough FV
            accumulatedSavings += annualDiffWithInterest;

            totalRentPaid += currentRent * 12;
            currentRent = currentRent * (1 + rentInflation / 100);
        }

        rentingWealth += accumulatedSavings;

        const diff = buyingWealth - rentingWealth;
        const verdict = diff > 0
            ? `Buying is better by ₹ ${(diff / 100000).toFixed(2)} Lakhs`
            : `Renting is better by ₹ ${(Math.abs(diff) / 100000).toFixed(2)} Lakhs`;

        setResult({
            buyingNetWorth: Math.round(buyingWealth),
            rentingNetWorth: Math.round(rentingWealth),
            verdict
        });

    }, [propertyPrice, rent, years, investmentReturn, loanInterest, propertyAppreciation, rentInflation]);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Comparison Inputs</CardTitle>
                    <CardDescription>Rent vs Buy Analysis.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Property Price (₹)</Label>
                        <Input type="number" value={propertyPrice} onChange={(e) => setPropertyPrice(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>Monthly Rent (₹)</Label>
                        <Input type="number" value={rent} onChange={(e) => setRent(Number(e.target.value))} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <Label>Loan Rate (%)</Label>
                            <Input type="number" value={loanInterest} onChange={(e) => setLoanInterest(Number(e.target.value))} />
                        </div>
                        <div className="space-y-3">
                            <Label>Investment Return (%)</Label>
                            <Input type="number" value={investmentReturn} onChange={(e) => setInvestmentReturn(Number(e.target.value))} />
                            <p className="text-xs text-muted-foreground">Return on saved money.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <Label>Prop. Appreciation (%)</Label>
                            <Input type="number" value={propertyAppreciation} onChange={(e) => setPropertyAppreciation(Number(e.target.value))} />
                        </div>
                        <div className="space-y-3">
                            <Label>Rent Inflation (%)</Label>
                            <Input type="number" value={rentInflation} onChange={(e) => setRentInflation(Number(e.target.value))} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label>Analysis Period (Years)</Label>
                        <Slider value={[years]} onValueChange={(v) => setYears(v[0])} min={5} max={30} step={1} />
                        <div className="text-right text-sm">{years} years</div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Verdict</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-8">
                        <div className="p-4 bg-background rounded-lg border shadow-sm">
                            <div className="text-lg font-bold text-primary">
                                {result.verdict}
                            </div>
                            <div className="text-xs text-muted-foreground mt-2">
                                (Net wealth difference after {years} years)
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <div className="text-sm text-muted-foreground">Buying Net Worth</div>
                                <div className="text-xl font-bold">₹ {(result.buyingNetWorth / 100000).toFixed(2)} L</div>
                                <div className="text-xs text-muted-foreground">Property Value</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Renting Net Worth</div>
                                <div className="text-xl font-bold">₹ {(result.rentingNetWorth / 100000).toFixed(2)} L</div>
                                <div className="text-xs text-muted-foreground">Investments Value</div>
                            </div>
                        </div>

                        <div className="text-xs text-muted-foreground text-left bg-muted p-2 rounded">
                            <strong>Logic:</strong> This assumes 20% downpayment. We compare the Future Value of the Property vs The Future Value of (Downpayment + Monthly Savings) invested elsewhere.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
