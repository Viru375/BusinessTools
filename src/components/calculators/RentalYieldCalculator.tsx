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

export function RentalYieldCalculator() {
    const [propertyCost, setPropertyCost] = useState(5000000);
    const [monthlyRent, setMonthlyRent] = useState(15000);
    const [annualMaintenance, setAnnualMaintenance] = useState(20000);

    const annualRent = monthlyRent * 12;
    const grossYield = (annualRent / propertyCost) * 100;

    const netRent = annualRent - annualMaintenance;
    const netYield = (netRent / propertyCost) * 100;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                    <CardDescription>Calculate Return on Investment.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Total Property Cost (₹)</Label>
                        <Input type="number" value={propertyCost} onChange={(e) => setPropertyCost(Number(e.target.value))} />
                        <p className="text-xs text-muted-foreground">Include registration, repairs, furnishing etc.</p>
                    </div>

                    <div className="space-y-3">
                        <Label>Monthly Rent (₹)</Label>
                        <Input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>Annual Maintenance / Expenses (₹)</Label>
                        <Input type="number" value={annualMaintenance} onChange={(e) => setAnnualMaintenance(Number(e.target.value))} />
                        <p className="text-xs text-muted-foreground">Society charges, taxes, repairs.</p>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Yield Analysis</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">Gross Rental Yield</div>
                            <div className="text-4xl font-bold text-primary">
                                {grossYield.toFixed(2)} %
                            </div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border">
                            <div className="text-sm text-muted-foreground">Net Rental Yield</div>
                            <div className="text-2xl font-bold text-green-600">
                                {netYield.toFixed(2)} %
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">After expenses</p>
                        </div>

                        <div className="mt-4 text-xs text-muted-foreground">
                            *Typical residential yield in India is 2-4%. Commercial can be 5-8%.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
