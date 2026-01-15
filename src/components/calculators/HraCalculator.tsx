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
import { Switch } from "@/components/ui/switch";

export function HraCalculator() {
    const [basicSalary, setBasicSalary] = useState(500000); // Yearly
    const [da, setDa] = useState(0); // Dearness Allowance
    const [hraReceived, setHraReceived] = useState(200000);
    const [rentPaid, setRentPaid] = useState(180000);
    const [isMetro, setIsMetro] = useState(true); // Metro city check

    const [exemptHra, setExemptHra] = useState(0);
    const [taxableHra, setTaxableHra] = useState(0);

    const calculateHra = () => {
        // HRA Exemption is minimum of:
        // 1. Actual HRA Received
        // 2. 50% of (Basic + DA) for Metro, 40% for Non-Metro
        // 3. Rent Paid - 10% of (Basic + DA)

        const salary = basicSalary + da;

        const condition1 = hraReceived;
        const condition2 = salary * (isMetro ? 0.50 : 0.40);
        const condition3 = rentPaid - (salary * 0.10);

        // condition3 can be negative if rent is low, in which case 0 exemption from this clause
        const c3 = condition3 > 0 ? condition3 : 0;

        const exemption = Math.min(condition1, condition2, c3);

        setExemptHra(exemption);
        setTaxableHra(hraReceived - exemption);
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>HRA Inputs (Yearly)</CardTitle>
                    <CardDescription>Calculate HRA tax exemption.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center space-x-2 border p-3 rounded-lg">
                        <Switch checked={isMetro} onCheckedChange={setIsMetro} id="metro-mode" />
                        <Label htmlFor="metro-mode">Live in Metro City (Delhi, Mumbai, Kolkata, Chennai)?</Label>
                    </div>

                    <div className="space-y-3">
                        <Label>Basic Salary + DA (Yearly) (₹)</Label>
                        <Input type="number" value={basicSalary} onChange={(e) => setBasicSalary(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>HRA Received (Yearly) (₹)</Label>
                        <Input type="number" value={hraReceived} onChange={(e) => setHraReceived(Number(e.target.value))} />
                    </div>

                    <div className="space-y-3">
                        <Label>Total Rent Paid (Yearly) (₹)</Label>
                        <Input type="number" value={rentPaid} onChange={(e) => setRentPaid(Number(e.target.value))} />
                    </div>

                    <Button onClick={calculateHra} className="w-full">Calculate Exemption</Button>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-muted/20 h-full">
                    <CardHeader><CardTitle>Calculation Result</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-4 bg-background rounded-lg border shadow-sm">
                            <div className="text-sm text-muted-foreground">Exempted HRA (Tax Free)</div>
                            <div className="text-3xl font-bold text-green-600">₹ {exemptHra.toLocaleString("en-IN")}</div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border shadow-sm">
                            <div className="text-sm text-muted-foreground">Taxable HRA</div>
                            <div className="text-3xl font-bold text-destructive">₹ {taxableHra.toLocaleString("en-IN")}</div>
                        </div>

                        <div className="text-sm text-muted-foreground mt-4">
                            Based on the lowest of:
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Actual HRA Received</li>
                                <li>{isMetro ? "50%" : "40%"} of Basic Salary</li>
                                <li>Rent Paid minus 10% of Basic Salary</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
