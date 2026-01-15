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

export function GasFeeEstimator() {
    const [gasPrice, setGasPrice] = useState(20); // Gwei
    const [ethPrice, setEthPrice] = useState(3000); // USD
    const [gasLimit, setGasLimit] = useState(21000); // Standard transfer

    // Logic
    // Fee in ETH = Gas Limit * Gas Price (in Gwei) * 10^-9
    const feeInEth = gasLimit * gasPrice * 0.000000001;
    const feeInUsd = feeInEth * ethPrice;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Network Conditions</CardTitle>
                    <CardDescription>Ethereum Gas Estimator.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Gas Price (Gwei)</Label>
                        <Input type="number" value={gasPrice} onChange={(e) => setGasPrice(Number(e.target.value))} />
                        <div className="flex justify-between text-xs text-muted-foreground pt-1">
                            <span>Slow: 15</span>
                            <span>Standard: 20</span>
                            <span>Fast: 30+</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label>Transaction Type (Gas Limit)</Label>
                        <div className="flex gap-2">
                            <div
                                className={`flex-1 border rounded p-2 text-center text-xs cursor-pointer ${gasLimit === 21000 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                                onClick={() => setGasLimit(21000)}
                            >
                                Transfer
                            </div>
                            <div
                                className={`flex-1 border rounded p-2 text-center text-xs cursor-pointer ${gasLimit === 65000 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                                onClick={() => setGasLimit(65000)}
                            >
                                Token Swap
                            </div>
                            <div
                                className={`flex-1 border rounded p-2 text-center text-xs cursor-pointer ${gasLimit === 150000 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                                onClick={() => setGasLimit(150000)}
                            >
                                Smart Contract
                            </div>
                        </div>
                        <Input type="number" value={gasLimit} onChange={(e) => setGasLimit(Number(e.target.value))} className="mt-2" />
                    </div>

                    <div className="space-y-3">
                        <Label>ETH Price ($)</Label>
                        <Input type="number" value={ethPrice} onChange={(e) => setEthPrice(Number(e.target.value))} />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Estimated Fee</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">Transaction Cost</div>
                            <div className="text-4xl font-bold text-primary">
                                $ {feeInUsd.toFixed(2)}
                            </div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border">
                            <div className="text-xs text-muted-foreground">Cost in ETH</div>
                            <div className="font-semibold">{feeInEth.toFixed(6)} ETH</div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                            *Actual fees fluctuate with network congestion.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
