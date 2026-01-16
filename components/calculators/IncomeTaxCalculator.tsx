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
import { Button } from "@/components/ui/button";

export function IncomeTaxCalculator() {
    const [income, setIncome] = useState(1200000);
    const [deductions, setDeductions] = useState(150000); // 80C etc for Old Regime

    // FY 2024-25 Slabs
    // Old Regime (approx for < 60 age)
    // 0-2.5L: Nil
    // 2.5-5L: 5%
    // 5-10L: 20%
    // >10L: 30%
    // Cess: 4%
    // Rebate 87A: Taxable income <= 5L -> Tax 0

    // New Regime (FY 24-25)
    // 0-3L: Nil
    // 3-7L: 5%
    // 7-10L: 10%
    // 10-12L: 15%
    // 12-15L: 20%
    // >15L: 30%
    // Standard Deduction: 75000 (New Regime)
    // Rebate 87A: Taxable income <= 7L -> Tax 0

    const calculateOldRegime = (gross: number, deduct: number) => {
        let taxable = gross - deduct;
        if (taxable <= 0) return 0;

        // Standard Deduction Old Regime usually 50k for salaried
        taxable = taxable - 50000;
        if (taxable <= 500000) return 0; // Rebate 87A

        let tax = 0;
        // > 10L
        if (taxable > 1000000) {
            tax += (taxable - 1000000) * 0.30;
            tax += 112500; // Tax for 10L slab
        }
        // 5-10L
        else if (taxable > 500000) {
            tax += (taxable - 500000) * 0.20;
            tax += 12500; // Tax for 5L slab
        }
        // 2.5-5L
        else if (taxable > 250000) {
            tax += (taxable - 250000) * 0.05;
        }

        return Math.round(tax * 1.04); // Cess 4%
    };

    const calculateNewRegime = (gross: number) => {
        // Standard Deduct New Regime FY25
        let taxable = gross - 75000;
        if (taxable <= 0) return 0;

        if (taxable <= 700000) return 0; // Rebate limit in New Regime is 7L (Zero tax)

        let tax = 0;

        // > 15L
        if (taxable > 1500000) {
            tax += (taxable - 1500000) * 0.30;
            tax += 150000; // Tax up to 15L
        }
        // 12-15L: 20%
        else if (taxable > 1200000) {
            tax += (taxable - 1200000) * 0.20;
            tax += 90000; // Tax up to 12L
        }
        // 10-12L: 15%
        else if (taxable > 1000000) {
            tax += (taxable - 1000000) * 0.15;
            tax += 60000; // Tax up to 10L
        }
        // 7-10L: 10%
        else if (taxable > 700000) { // Should be 700000 to match slab logic, but slab is 3-7.
            // Correct Slabs:
            // 0-3: 0
            // 3-7: 5%  -> (400000 * 0.05) = 20000
            // 7-10: 10% -> (300000 * 0.10) = 30000 -> Cum = 50000
            // 10-12: 15% -> (200000 * 0.15) = 30000 -> Cum = 80000
            // 12-15: 20% -> (300000 * 0.20) = 60000 -> Cum = 140000

            // Re-calc cumulative base correctly:
            // Up to 15L:
            // 3-7: 20k
            // 7-10: 30k
            // 10-12: 30k
            // 12-15: 60k
            // Total tax at 15L = 20+30+30+60 = 140k. Wait, 15L slab is 20%? No 30% > 15L.

            // Let's do simple stepped calc:
            if (taxable > 1500000) {
                tax = (taxable - 1500000) * 0.30 + 150000;
            } else if (taxable > 1200000) {
                tax = (taxable - 1200000) * 0.20 + 90000; // (20k+30k+40k?) 
                // 3-7(4L*5%=20k) + 7-10(3L*10%=30k) + 10-12(2L*15%=30k) = 80k. 
                // Wait 12-15 is 20%. 3L*20% = 60k. Total 140k.
                // My hardcoded base might be wrong. Let's compute step by step.

                /*
                 0-3: 0
                 3-7: 5% (4L) = 20000
                 7-10: 10% (3L) = 30000
                 10-12: 15% (2L) = 30000
                 12-15: 20% (3L) = 60000
                 >15: 30%
                 */
                // Correct Logic rewrite:
            }
        }

        // Proper Stepped Loop for New Regime
        let temp = taxable;
        let t = 0;

        // Slab 1: 0-3L
        if (temp > 300000) {
            // Slab 2: 3-7L (4L width)
            let slab2 = Math.min(temp, 700000) - 300000;
            t += slab2 * 0.05;

            if (temp > 700000) {
                // Slab 3: 7-10L (3L width)
                let slab3 = Math.min(temp, 1000000) - 700000;
                t += slab3 * 0.10;

                if (temp > 1000000) {
                    // Slab 4: 10-12L (2L width)
                    let slab4 = Math.min(temp, 1200000) - 1000000;
                    t += slab4 * 0.15;

                    if (temp > 1200000) {
                        // Slab 5: 12-15L (3L width)
                        let slab5 = Math.min(temp, 1500000) - 1200000;
                        t += slab5 * 0.20;

                        if (temp > 1500000) {
                            // Slab 6: >15L
                            let slab6 = temp - 1500000;
                            t += slab6 * 0.30;
                        }
                    }
                }
            }
        }

        return Math.round(t * 1.04);
    };

    const taxOld = calculateOldRegime(income, deductions);
    const taxNew = calculateNewRegime(income);

    const diff = Math.abs(taxOld - taxNew);
    const betterRegime = taxOld < taxNew ? "Old Regime" : "New Regime";

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Tax Inputs (FY 24-25)</CardTitle>
                    <CardDescription>Compare Old vs New Tax Regime.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Gross Annual Income (₹)</Label>
                        <Input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
                    </div>
                    <div className="space-y-3">
                        <Label>Total Deductions (Old Regime only) (₹)</Label>
                        <Input type="number" value={deductions} onChange={(e) => setDeductions(Number(e.target.value))} />
                        <p className="text-xs text-muted-foreground">Includes 80C, 80D, HRA Exemption, Home Loan Interest etc.</p>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center">Tax Comparison</CardTitle></CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="p-4 bg-background border rounded-lg text-center">
                                <div className="text-sm text-muted-foreground">Old Regime Tax</div>
                                <div className={`text-2xl font-bold ${taxOld < taxNew ? "text-green-600" : "text-foreground"}`}>
                                    ₹ {taxOld.toLocaleString("en-IN")}
                                </div>
                            </div>
                            <div className="p-4 bg-background border rounded-lg text-center">
                                <div className="text-sm text-muted-foreground">New Regime Tax</div>
                                <div className={`text-2xl font-bold ${taxNew < taxOld ? "text-green-600" : "text-foreground"}`}>
                                    ₹ {taxNew.toLocaleString("en-IN")}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-green-100 border border-green-200 rounded-lg text-center">
                            <h3 className="text-green-800 font-bold text-lg">Recommendation: {betterRegime}</h3>
                            <p className="text-green-700">You save ₹ {diff.toLocaleString("en-IN")} by choosing the {betterRegime}.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
