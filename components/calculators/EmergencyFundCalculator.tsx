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

export function EmergencyFundCalculator() {
    const [monthlyExpenses, setMonthlyExpenses] = useState(30000);
    const [months, setMonths] = useState(6);

    // Logic
    const totalFund = monthlyExpenses * months;

    // Suggestion
    let comment = "";
    if (months < 3) comment = "Risky. Aim for at least 3 months.";
    else if (months <= 6) comment = "Good. Provides a solid safety net.";
    else comment = "Excellent. Very secure buffer.";

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Expense Details</CardTitle>
                    <CardDescription>Safety Net Planning.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Monthly Necessary Expenses (₹)</Label>
                        <Input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} />
                        <p className="text-xs text-muted-foreground">Rent, EMI, Food, Utilities (No discretionary).</p>
                    </div>

                    <div className="space-y-3">
                        <Label>Duration Coverage (Months)</Label>
                        <Slider value={[months]} onValueChange={(v) => setMonths(v[0])} min={1} max={12} />
                        <div className="text-right text-xs">{months} Months</div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Required Fund</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">Total Emergency Corpus</div>
                            <div className="text-4xl font-bold text-primary">
                                ₹ {totalFund.toLocaleString("en-IN")}
                            </div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border items-center flex gap-3 text-sm text-left">
                            <div className="text-2xl">🛡️</div>
                            <div>
                                <div className="font-semibold">Recommendation</div>
                                <div className="text-muted-foreground">{comment} Keep this in a Liquid Fund or Sweep-in FD.</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
