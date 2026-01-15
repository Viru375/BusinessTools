"use client";

import React, { useState, useRef } from "react";
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
import { Printer } from "lucide-react";

export function RentReceiptGenerator() {
    const [tenantName, setTenantName] = useState("");
    const [landlordName, setLandlordName] = useState("");
    const [rentAmount, setRentAmount] = useState(15000);
    const [address, setAddress] = useState("");
    const [month, setMonth] = useState("January 2025");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const printRef = useRef(null);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card className="print:hidden">
                <CardHeader>
                    <CardTitle>Receipt Details</CardTitle>
                    <CardDescription>Fill details to generate receipt.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label>Tenant Name</Label>
                        <Input value={tenantName} onChange={(e) => setTenantName(e.target.value)} placeholder="Your Name" />
                    </div>
                    <div>
                        <Label>Landlord Name</Label>
                        <Input value={landlordName} onChange={(e) => setLandlordName(e.target.value)} placeholder="Owner Name" />
                    </div>
                    <div>
                        <Label>Monthly Rent Amount (₹)</Label>
                        <Input type="number" value={rentAmount} onChange={(e) => setRentAmount(Number(e.target.value))} />
                    </div>
                    <div>
                        <Label>Rented Property Address</Label>
                        <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full Address" />
                    </div>
                    <div>
                        <Label>Month of Receipt</Label>
                        <Input value={month} onChange={(e) => setMonth(e.target.value)} placeholder="e.g. March 2025" />
                    </div>
                    <div>
                        <Label>Receipt Date</Label>
                        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>

                    <Button onClick={handlePrint} className="w-full flex items-center gap-2">
                        <Printer size={16} /> Print Receipt
                    </Button>
                </CardContent>
            </Card>

            <div className="print:w-full print:absolute print:top-0 print:left-0 print:bg-white print:p-8">
                <Card className="border-2 border-dashed border-gray-300 bg-yellow-50/30">
                    <CardContent className="p-8 space-y-6 text-sm md:text-base">
                        <div className="text-center border-b pb-4 mb-4">
                            <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-800">Rent Receipt</h2>
                            <p className="text-muted-foreground">{month}</p>
                        </div>

                        <div className="space-y-4 leading-loose text-gray-800">
                            <p>
                                Received with thanks from <strong>{tenantName || "_________________"}</strong>,
                                a sum of <span className="text-lg font-bold">₹ {rentAmount.toLocaleString("en-IN")}</span> towards
                                rent for the month of <strong>{month || "_______"}</strong>.
                            </p>
                            <p>
                                For the residential property located at:<br />
                                <span className="italic">{address || "______________________________________________________"}</span>
                            </p>
                        </div>

                        <div className="flex justify-between items-end pt-12 mt-8">
                            <div className="text-xs text-muted-foreground">
                                Date: {date}
                            </div>
                            <div className="text-center">
                                <div className="h-10 w-32 border-b border-gray-400 mb-2"></div>
                                <div className="text-sm font-semibold">{landlordName || "Landlord"}</div>
                                <div className="text-xs text-muted-foreground">(Signature)</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <p className="text-center text-xs text-muted-foreground mt-4 print:hidden">
                    Preview above. Click "Print Receipt" to download as PDF.
                </p>
            </div>
        </div>
    );
}
