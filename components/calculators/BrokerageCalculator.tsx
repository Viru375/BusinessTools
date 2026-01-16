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

export function BrokerageCalculator() {
    const [buyPrice, setBuyPrice] = useState(100);
    const [sellPrice, setSellPrice] = useState(110);
    const [quantity, setQuantity] = useState(100);
    const [exchange, setExchange] = useState("NSE");
    const [type, setType] = useState("Delivery"); // Delivery, Intraday

    // Standard Zerodha/Groww like charges (Approximate)
    // Delivery: 0 Brokerage (or 20 flat), STT 0.1% on Buy+Sell
    // Intraday: 0.03% or 20, STT 0.025% on Sell

    // Note: These change often. Using standand representative values.

    const turnover = (buyPrice + sellPrice) * quantity;
    const grossProfit = (sellPrice - buyPrice) * quantity;

    let brokerage = 0;
    let stt = 0;
    let exchangeTxnCharge = 0; // NSE: 0.00325%
    let sebiCharges = 0; // 10 per crore
    let stampDuty = 0; // 0.015% on buy
    let gst = 0; // 18% on (Brokerage + transaction charges)

    if (type === "Delivery") {
        // Brokerage: 0 (Discount brokers)
        brokerage = 0;
        // STT: 0.1% on Both
        stt = turnover * 0.001;
        // Exchange Txn
        exchangeTxnCharge = turnover * 0.0000325;
        // Stamp Duty: 0.015% on Buy
        stampDuty = (buyPrice * quantity) * 0.00015;
    } else {
        // Intraday
        // Brokerage: 0.03% or 20 whichever lower per executed order.
        const bBuy = Math.min(20, (buyPrice * quantity) * 0.0003);
        const bSell = Math.min(20, (sellPrice * quantity) * 0.0003);
        brokerage = bBuy + bSell;

        // STT: 0.025% on Sell only
        stt = (sellPrice * quantity) * 0.00025;

        // Exchange Txn
        exchangeTxnCharge = turnover * 0.0000325;

        // Stamp Duty: 0.003% on Buy
        stampDuty = (buyPrice * quantity) * 0.00003;
    }

    // SEBI: 10 per crore = 0.0001%
    sebiCharges = turnover * 0.000001;

    // GST
    gst = (brokerage + exchangeTxnCharge + sebiCharges) * 0.18;

    const totalTax = brokerage + stt + exchangeTxnCharge + sebiCharges + stampDuty + gst;
    const netProfit = grossProfit - totalTax;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Trade Details</CardTitle>
                    <CardDescription>Estimate Brokerage & Taxes.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Type</Label>
                            <Select value={type} onValueChange={setType}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Delivery">Delivery (Equity)</SelectItem>
                                    <SelectItem value="Intraday">Intraday (Equity)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Exchange</Label>
                            <Select value={exchange} onValueChange={setExchange}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="NSE">NSE</SelectItem>
                                    <SelectItem value="BSE">BSE</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Buy Price</Label>
                            <Input type="number" value={buyPrice} onChange={(e) => setBuyPrice(Number(e.target.value))} />
                        </div>
                        <div>
                            <Label>Sell Price</Label>
                            <Input type="number" value={sellPrice} onChange={(e) => setSellPrice(Number(e.target.value))} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label>Quantity</Label>
                        <Input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">P&L Summary</CardTitle></CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-6 text-center mb-6">
                            <div>
                                <div className="text-sm text-muted-foreground">Net Profit</div>
                                <div className={`text-2xl font-bold ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                                    {netProfit.toLocaleString("en-IN", { style: 'currency', currency: 'INR' })}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Total Taxes</div>
                                <div className="text-2xl font-bold text-red-500">
                                    {totalTax.toLocaleString("en-IN", { style: 'currency', currency: 'INR' })}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm bg-background p-4 rounded border">
                            <div className="flex justify-between"><span>Brokerage</span><span>₹ {brokerage.toFixed(2)}</span></div>
                            <div className="flex justify-between"><span>STT</span><span>₹ {stt.toFixed(2)}</span></div>
                            <div className="flex justify-between"><span>Exchange Txn</span><span>₹ {exchangeTxnCharge.toFixed(2)}</span></div>
                            <div className="flex justify-between"><span>GST</span><span>₹ {gst.toFixed(2)}</span></div>
                            <div className="flex justify-between"><span>Stamp Duty</span><span>₹ {stampDuty.toFixed(2)}</span></div>
                            <div className="border-t my-2 pt-2 font-semibold flex justify-between"><span>Breakeven</span><span>₹ {((totalTax / quantity) + buyPrice).toFixed(2)}</span></div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
