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
import { Plus, Trash2 } from "lucide-react";

export function StockAverageCalculator() {
    const [entries, setEntries] = useState([{ price: 100, qty: 10 }, { price: 90, qty: 10 }]);

    const addEntry = () => {
        setEntries([...entries, { price: 0, qty: 0 }]);
    };

    const removeEntry = (index: number) => {
        const newEntries = entries.filter((_, i) => i !== index);
        setEntries(newEntries);
    };

    const updateEntry = (index: number, field: "price" | "qty", value: string) => {
        const newEntries = [...entries];
        // @ts-ignore
        newEntries[index][field] = Number(value);
        setEntries(newEntries);
    };

    const totalQty = entries.reduce((acc, curr) => acc + curr.qty, 0);
    const totalAmount = entries.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
    const averagePrice = totalQty > 0 ? totalAmount / totalQty : 0;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Stock Holdings</CardTitle>
                    <CardDescription>Add multiple buy entries.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {entries.map((entry, index) => (
                        <div key={index} className="flex gap-4 items-end">
                            <div className="flex-1">
                                <Label className="text-xs">Price (₹)</Label>
                                <Input
                                    type="number"
                                    value={entry.price}
                                    onChange={(e) => updateEntry(index, "price", e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <Label className="text-xs">Quantity</Label>
                                <Input
                                    type="number"
                                    value={entry.qty}
                                    onChange={(e) => updateEntry(index, "qty", e.target.value)}
                                />
                            </div>
                            {entries.length > 1 && (
                                <Button variant="ghost" size="icon" onClick={() => removeEntry(index)} className="text-destructive">
                                    <Trash2 size={16} />
                                </Button>
                            )}
                        </div>
                    ))}

                    <Button variant="outline" onClick={addEntry} className="w-full border-dashed">
                        <Plus size={16} className="mr-2" /> Add More Shares
                    </Button>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Average Price</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">Effective Average Price</div>
                            <div className="text-4xl font-bold text-primary">
                                ₹ {averagePrice.toFixed(2)}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 bg-background p-4 rounded border">
                            <div>
                                <div className="text-xs text-muted-foreground">Total Quantity</div>
                                <div className="font-semibold">{totalQty}</div>
                            </div>
                            <div>
                                <div className="text-xs text-muted-foreground">Total Invested</div>
                                <div className="font-semibold">₹ {totalAmount.toLocaleString("en-IN")}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
