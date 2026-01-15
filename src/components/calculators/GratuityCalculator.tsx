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

export function GratuityCalculator() {
    const [basicSalary, setBasicSalary] = useState(50000); // Monthly Basic + DA
    const [years, setYears] = useState(5);

    const [gratuity, setGratuity] = useState(0);

    useEffect(() => {
        // Formula: (15 * Last Drawn Salary * Tenure) / 26
        // Note: Generally capped at 20 Lakhs for tax exemption, but actual payout can be higher if employer allows.
        // We will show the calculated amount.

        const g = (15 * basicSalary * years) / 26;
        setGratuity(Math.round(g));

    }, [basicSalary, years]);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Gratuity Inputs</CardTitle>
                    <CardDescription>Calculate your gratuity payout.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Monthly Basic Salary + DA (₹)</Label>
                            <Input type="number" value={basicSalary} onChange={(e) => setBasicSalary(Number(e.target.value))} className="w-28 h-8" />
                        </div>
                        <Slider value={[basicSalary]} onValueChange={(v) => setBasicSalary(v[0])} min={10000} max={500000} step={1000} />
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <Label>Years of Service</Label>
                            <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-24 h-8" />
                        </div>
                        <Slider value={[years]} onValueChange={(v) => setYears(v[0])} min={5} max={40} step={1} />
                        <p className="text-xs text-muted-foreground text-destructive">Minimum 5 years of service required for eligibility.</p>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20 h-full flex flex-col justify-center">
                    <CardHeader>
                        <CardTitle className="text-center text-primary">Estimated Gratuity</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <div className="text-5xl font-bold text-primary mb-2">
                            ₹ {gratuity.toLocaleString("en-IN")}
                        </div>
                        <p className="text-muted-foreground mt-4">
                            Calculated as: <br /><code>(15 × {basicSalary} × {years}) / 26</code>
                        </p>
                        {gratuity > 2000000 && (
                            <div className="mt-4 p-2 bg-yellow-100 text-yellow-800 text-xs rounded">
                                Note: Tax exemption is usually limited to ₹20 Lakhs.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
