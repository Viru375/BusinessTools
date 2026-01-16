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

export function WeddingBudgetPlanner() {
    const [guests, setGuests] = useState(200);
    const [costPerPlate, setCostPerPlate] = useState(1500);
    const [venue, setVenue] = useState(200000);
    const [decor, setDecor] = useState(150000);
    const [attire, setAttire] = useState(100000); // Bride + Groom
    const [jewelry, setJewelry] = useState(300000);
    const [photography, setPhotography] = useState(50000);
    const [others, setOthers] = useState(100000); // Logistics, Gifts etc.

    const foodCost = guests * costPerPlate;
    const totalCost = foodCost + venue + decor + attire + jewelry + photography + others;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Expense Categories</CardTitle>
                    <CardDescription>Plan your big day.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>Guests</Label><Input type="number" value={guests} onChange={(e) => setGuests(Number(e.target.value))} /></div>
                        <div className="space-y-2"><Label>Cost/Plate</Label><Input type="number" value={costPerPlate} onChange={(e) => setCostPerPlate(Number(e.target.value))} /></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>Venue</Label><Input type="number" value={venue} onChange={(e) => setVenue(Number(e.target.value))} /></div>
                        <div className="space-y-2"><Label>Decor/Music</Label><Input type="number" value={decor} onChange={(e) => setDecor(Number(e.target.value))} /></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>Attire/Makeup</Label><Input type="number" value={attire} onChange={(e) => setAttire(Number(e.target.value))} /></div>
                        <div className="space-y-2"><Label>Jewelry</Label><Input type="number" value={jewelry} onChange={(e) => setJewelry(Number(e.target.value))} /></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>Photo/Video</Label><Input type="number" value={photography} onChange={(e) => setPhotography(Number(e.target.value))} /></div>
                        <div className="space-y-2"><Label>Logistics/Misc</Label><Input type="number" value={others} onChange={(e) => setOthers(Number(e.target.value))} /></div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader><CardTitle className="text-center text-primary">Total Budget</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div>
                            <div className="text-sm text-muted-foreground">Estimated Cost</div>
                            <div className="text-4xl font-bold text-primary">
                                ₹ {Math.round(totalCost).toLocaleString("en-IN")}
                            </div>
                        </div>

                        <div className="p-4 bg-background rounded-lg border text-sm text-left grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground">Food & Venue</span>
                                <span className="font-semibold">{Math.round(((foodCost + venue) / totalCost) * 100)}%</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground">Others</span>
                                <span className="font-semibold">{Math.round(((totalCost - foodCost - venue) / totalCost) * 100)}%</span>
                            </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                            Did you know? Food and Venue typically consume 40-50% of an Indian wedding budget.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
