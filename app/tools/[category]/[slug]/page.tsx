import { notFound } from "next/navigation";
import Link from "next/link";
import { toolsData } from "@/lib/toolsData";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Batch 1
import { SipCalculator } from "@/components/calculators/SipCalculator";
import { GstCalculator } from "@/components/calculators/GstCalculator";
import { EmiCalculator } from "@/components/calculators/EmiCalculator";

// Batch 2
import { LumpsumCalculator } from "@/components/calculators/LumpsumCalculator";
import { FdCalculator } from "@/components/calculators/FdCalculator";
import { PpfCalculator } from "@/components/calculators/PpfCalculator";

// Batch 3
import { SimpleInterestCalculator } from "@/components/calculators/SimpleInterestCalculator";
import { CompoundInterestCalculator } from "@/components/calculators/CompoundInterestCalculator";
import { CagrCalculator } from "@/components/calculators/CagrCalculator";

// Batch 4
import { StepUpSipCalculator } from "@/components/calculators/StepUpSipCalculator";
import { SipVsLumpsumCalculator } from "@/components/calculators/SipVsLumpsumCalculator";
import { GoalPlanner } from "@/components/calculators/GoalPlanner";

// Batch 5
import { RuleOf72Calculator } from "@/components/calculators/RuleOf72Calculator";
import { CostOfDelayCalculator } from "@/components/calculators/CostOfDelayCalculator";
import { RdCalculator } from "@/components/calculators/RdCalculator";

// Batch 6
import { XirrCalculator } from "@/components/calculators/XirrCalculator";
import { HraCalculator } from "@/components/calculators/HraCalculator";
import { GratuityCalculator } from "@/components/calculators/GratuityCalculator";

// Batch 7 (Banking)
import { LoanPrepaymentCalculator } from "@/components/calculators/LoanPrepaymentCalculator";
import { LoanEligibilityCalculator } from "@/components/calculators/LoanEligibilityCalculator";
import { LoanComparisonCalculator } from "@/components/calculators/LoanComparisonCalculator";

// Batch 8 (Tax & Schemes)
import { SsyCalculator } from "@/components/calculators/SsyCalculator";
import { KvpCalculator } from "@/components/calculators/KvpCalculator";
import { NscCalculator } from "@/components/calculators/NscCalculator";
import { TdsCalculator } from "@/components/calculators/TdsCalculator";

// Batch 9 (Tax Completion)
import { IncomeTaxCalculator } from "@/components/calculators/IncomeTaxCalculator";
import { CapitalGainsCalculator } from "@/components/calculators/CapitalGainsCalculator";
import { RentReceiptGenerator } from "@/components/calculators/RentReceiptGenerator";

// Batch 10 (Business Math)
import { MarginVsMarkupCalculator } from "@/components/calculators/MarginVsMarkupCalculator";
import { RoiCalculator } from "@/components/calculators/RoiCalculator";
import { BreakEvenPointCalculator } from "@/components/calculators/BreakEvenPointCalculator";

// Batch 11 (Business Completion)
import { FreelanceRateCalculator } from "@/components/calculators/FreelanceRateCalculator";
import { DiscountCalculator } from "@/components/calculators/DiscountCalculator";

// Batch 12 (Retirement)
import { EpfCalculator } from "@/components/calculators/EpfCalculator";
import { NpsCalculator } from "@/components/calculators/NpsCalculator";
import { RetirementCorpusCalculator } from "@/components/calculators/RetirementCorpusCalculator";
import { InflationCalculator } from "@/components/calculators/InflationCalculator";

// Batch 13 (Retirement Completion)
import { SwpCalculator } from "@/components/calculators/SwpCalculator";
import { ApyCalculator } from "@/components/calculators/ApyCalculator";
import { ScssCalculator } from "@/components/calculators/ScssCalculator";
import { PmvvyCalculator } from "@/components/calculators/PmvvyCalculator";
import { FireCalculator } from "@/components/calculators/FireCalculator";

// Batch 14 (Stock Market - Part 1)
import { BrokerageCalculator } from "@/components/calculators/BrokerageCalculator";
import { StockAverageCalculator } from "@/components/calculators/StockAverageCalculator";
import { PivotPointCalculator } from "@/components/calculators/PivotPointCalculator";

// Batch 15 (Stock Market Completion)
import { FibonacciRetracementCalculator } from "@/components/calculators/FibonacciRetracementCalculator";
import { DividendYieldCalculator } from "@/components/calculators/DividendYieldCalculator";
import { PeRatioCalculator } from "@/components/calculators/PeRatioCalculator";
import { PositionSizeCalculator } from "@/components/calculators/PositionSizeCalculator";

// Batch 16 (Real Estate - Part 1)
import { RentVsBuyCalculator } from "@/components/calculators/RentVsBuyCalculator";
import { RentalYieldCalculator } from "@/components/calculators/RentalYieldCalculator";
import { HomeAffordabilityCalculator } from "@/components/calculators/HomeAffordabilityCalculator";
import { PropertyRegistrationChargesCalculator } from "@/components/calculators/PropertyRegistrationChargesCalculator";

// Batch 17 (Real Estate Completion)
import { CapitalGainsPropertyCalculator } from "@/components/calculators/CapitalGainsPropertyCalculator";
import { PreEmiCalculator } from "@/components/calculators/PreEmiCalculator";
import { HouseFlippingCalculator } from "@/components/calculators/HouseFlippingCalculator";

// Batch 18 (Insurance - Part 1)
import { HlvCalculator } from "@/components/calculators/HlvCalculator";
import { HealthInsurancePremiumEstimator } from "@/components/calculators/HealthInsurancePremiumEstimator";
import { NcbCalculator } from "@/components/calculators/NcbCalculator";

// Batch 19 (Insurance Completion)
import { TermVsEndowmentCalculator } from "@/components/calculators/TermVsEndowmentCalculator";
import { MotorInsuranceIdvCalculator } from "@/components/calculators/MotorInsuranceIdvCalculator";
import { SmokingCostCalculator } from "@/components/calculators/SmokingCostCalculator";

// Batch 20 (Crypto - Part 1)
import { CryptoProfitLossCalculator } from "@/components/calculators/CryptoProfitLossCalculator";
import { CryptoSipCalculator } from "@/components/calculators/CryptoSipCalculator";
import { CurrencyConverter } from "@/components/calculators/CurrencyConverter";

// Batch 21 (Crypto - Completion)
import { ForexPipCalculator } from "@/components/calculators/ForexPipCalculator";
import { GasFeeEstimator } from "@/components/calculators/GasFeeEstimator";
import { ImpermanentLossCalculator } from "@/components/calculators/ImpermanentLossCalculator";

// Batch 22 (Personal Finance - Part 1)
import { Budget503020Calculator } from "@/components/calculators/Budget503020Calculator";
import { EmergencyFundCalculator } from "@/components/calculators/EmergencyFundCalculator";
import { NetWorthCalculator } from "@/components/calculators/NetWorthCalculator";

// Batch 23 (Personal Finance - Completion)
import { FinancialFreedomCalculator } from "@/components/calculators/FinancialFreedomCalculator";
import { CostOfLivingCalculator } from "@/components/calculators/CostOfLivingCalculator";
import { WeddingBudgetPlanner } from "@/components/calculators/WeddingBudgetPlanner";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export async function generateMetadata({ params }: { params: Promise<{ category: string, slug: string }> }) {
    const { category, slug } = await params;
    const cluster = toolsData.find((c) => c.slug === category);
    const tool = cluster?.tools.find((t) => t.slug === slug);

    if (!tool) return { title: "Tool Not Found" };

    return {
        title: `${tool.name} - Business Tools`,
        description: tool.description,
    };
}

export default async function ToolPage({ params }: { params: Promise<{ category: string, slug: string }> }) {
    const { category, slug } = await params;
    const cluster = toolsData.find((c) => c.slug === category);
    const tool = cluster?.tools.find((t) => t.slug === slug);

    if (!cluster || !tool) {
        notFound();
    }

    // Determine which component to render
    let ToolComponent;

    if (slug === "sip-calculator") {
        ToolComponent = SipCalculator;
    } else if (slug === "gst-calculator") {
        ToolComponent = GstCalculator;
    } else if (slug === "home-loan-emi-calculator" || slug === "car-loan-emi-calculator" || slug === "personal-loan-emi-calculator" || slug === "loan-comparison-calculator") {
        ToolComponent = EmiCalculator; // Maps to common EMI component
        if (slug === "loan-comparison-calculator") ToolComponent = null; // Specific comparison logic not built yet, don't confuse user with vanilla EMI
    } else if (slug === "lumpsum-calculator" || slug === "mutual-fund-returns-calculator") {
        ToolComponent = LumpsumCalculator;
    } else if (slug === "fd-calculator") {
        ToolComponent = FdCalculator;
    } else if (slug === "ppf-calculator") {
        ToolComponent = PpfCalculator;
    } else if (slug === "simple-interest-calculator") {
        ToolComponent = SimpleInterestCalculator;
    } else if (slug === "compound-interest-calculator") {
        ToolComponent = CompoundInterestCalculator;
    } else if (slug === "cagr-calculator") {
        ToolComponent = CagrCalculator;
    } else if (slug === "step-up-sip-calculator") {
        ToolComponent = StepUpSipCalculator;
    } else if (slug === "sip-vs-lumpsum-calculator") {
        ToolComponent = SipVsLumpsumCalculator;
    } else if (slug === "goal-planner") {
        ToolComponent = GoalPlanner;
    } else if (slug === "rule-of-72-calculator") {
        ToolComponent = RuleOf72Calculator;
    } else if (slug === "cost-of-delay-calculator") {
        ToolComponent = CostOfDelayCalculator;
    } else if (slug === "rd-calculator") {
        ToolComponent = RdCalculator;
    } else if (slug === "xirr-calculator") {
        ToolComponent = XirrCalculator;
    } else if (slug === "hra-calculator") {
        ToolComponent = HraCalculator;
    } else if (slug === "gratuity-calculator") {
        ToolComponent = GratuityCalculator;
    } else if (slug === "ssy-calculator") {
        ToolComponent = SsyCalculator;
    } else if (slug === "kvp-calculator") {
        ToolComponent = KvpCalculator;
    } else if (slug === "nsc-calculator") {
        ToolComponent = NscCalculator;
    } else if (slug === "tds-calculator") {
        ToolComponent = TdsCalculator;
    } else if (slug === "income-tax-calculator") {
        ToolComponent = IncomeTaxCalculator;
    } else if (slug === "capital-gains-calculator") {
        ToolComponent = CapitalGainsCalculator;
    } else if (slug === "rent-receipt-generator") {
        ToolComponent = RentReceiptGenerator;
    } else if (slug === "margin-vs-markup-calculator") {
        ToolComponent = MarginVsMarkupCalculator;
    } else if (slug === "roi-calculator") {
        ToolComponent = RoiCalculator;
    } else if (slug === "break-even-point-calculator") {
        ToolComponent = BreakEvenPointCalculator;
    } else if (slug === "freelance-rate-calculator") {
        ToolComponent = FreelanceRateCalculator;
    } else if (slug === "discount-calculator") {
        ToolComponent = DiscountCalculator;
    } else if (slug === "epf-calculator") {
        ToolComponent = EpfCalculator;
    } else if (slug === "nps-calculator") {
        ToolComponent = NpsCalculator;
    } else if (slug === "retirement-corpus-calculator") {
        ToolComponent = RetirementCorpusCalculator;
    } else if (slug === "inflation-calculator") {
        ToolComponent = InflationCalculator;
    } else if (slug === "swp-calculator") {
        ToolComponent = SwpCalculator;
    } else if (slug === "apy-calculator") {
        ToolComponent = ApyCalculator;
    } else if (slug === "scss-calculator") {
        ToolComponent = ScssCalculator;
    } else if (slug === "pmvvy-calculator") {
        ToolComponent = PmvvyCalculator;
    } else if (slug === "fire-calculator") {
        ToolComponent = FireCalculator;
    } else if (slug === "brokerage-calculator") {
        ToolComponent = BrokerageCalculator;
    } else if (slug === "stock-average-calculator") {
        ToolComponent = StockAverageCalculator;
    } else if (slug === "pivot-point-calculator") {
        ToolComponent = PivotPointCalculator;
    } else if (slug === "fibonacci-retracement-calculator") {
        ToolComponent = FibonacciRetracementCalculator;
    } else if (slug === "dividend-yield-calculator") {
        ToolComponent = DividendYieldCalculator;
    } else if (slug === "pe-ratio-calculator") {
        ToolComponent = PeRatioCalculator;
    } else if (slug === "position-size-calculator") {
        ToolComponent = PositionSizeCalculator;
    } else if (slug === "rent-vs-buy-calculator") {
        ToolComponent = RentVsBuyCalculator;
    } else if (slug === "rental-yield-calculator") {
        ToolComponent = RentalYieldCalculator;
    } else if (slug === "home-affordability-calculator") {
        ToolComponent = HomeAffordabilityCalculator;
    } else if (slug === "property-registration-charges-calculator") {
        ToolComponent = PropertyRegistrationChargesCalculator;
    } else if (slug === "capital-gains-on-property") {
        ToolComponent = CapitalGainsPropertyCalculator;
    } else if (slug === "pre-emi-calculator") {
        ToolComponent = PreEmiCalculator;
    } else if (slug === "house-flipping-calculator") {
        ToolComponent = HouseFlippingCalculator;
    } else if (slug === "hlv-calculator") {
        ToolComponent = HlvCalculator;
    } else if (slug === "health-insurance-premium-estimator") {
        ToolComponent = HealthInsurancePremiumEstimator;
    } else if (slug === "ncb-calculator") {
        ToolComponent = NcbCalculator;
    } else if (slug === "term-vs-endowment-plan") {
        ToolComponent = TermVsEndowmentCalculator;
    } else if (slug === "motor-insurance-idv-calculator") {
        ToolComponent = MotorInsuranceIdvCalculator;
    } else if (slug === "smoking-cost-calculator") {
        ToolComponent = SmokingCostCalculator;
    } else if (slug === "crypto-profit-loss-calculator") {
        ToolComponent = CryptoProfitLossCalculator;
    } else if (slug === "crypto-sip-calculator") {
        ToolComponent = CryptoSipCalculator;
    } else if (slug === "currency-converter") {
        ToolComponent = CurrencyConverter;
    } else if (slug === "forex-pip-calculator") {
        ToolComponent = ForexPipCalculator;
    } else if (slug === "gas-fee-estimator") {
        ToolComponent = GasFeeEstimator;
    } else if (slug === "impermanent-loss-calculator") {
        ToolComponent = ImpermanentLossCalculator;
    } else if (slug === "50-30-20-rule-calculator") {
        ToolComponent = Budget503020Calculator;
    } else if (slug === "emergency-fund-calculator") {
        ToolComponent = EmergencyFundCalculator;
    } else if (slug === "net-worth-calculator") {
        ToolComponent = NetWorthCalculator;
    } else if (slug === "financial-freedom-calculator") {
        ToolComponent = FinancialFreedomCalculator;
    } else if (slug === "cost-of-living-comparator") {
        ToolComponent = CostOfLivingCalculator;
    } else if (slug === "wedding-budget-planner") {
        ToolComponent = WeddingBudgetPlanner;
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/" className="hover:underline">Home</Link>
                    <span>/</span>
                    <Link href={`/tools/${cluster.slug}`} className="hover:underline">{cluster.name}</Link>
                    <span>/</span>
                    <span className="text-foreground font-medium">{tool.name}</span>
                </div>

                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight text-primary mt-2">{tool.name}</h1>
                    <Link href={`/tools/${cluster.slug}`}>
                        <Button variant="outline" size="sm">Back</Button>
                    </Link>
                </div>
                <p className="text-muted-foreground">{tool.description}</p>
            </div>

            <div className="py-6">
                {ToolComponent ? (
                    <ToolComponent />
                ) : (
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center space-y-4 max-w-lg">
                            <div className="bg-primary/10 text-primary rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center text-3xl font-bold">
                                !
                            </div>
                            <h2 className="text-2xl font-semibold">Under Development</h2>
                            <p className="text-muted-foreground">
                                We are working hard to bring you the <strong>{tool.name}</strong>.
                                Please check back soon!
                            </p>
                            <div className="pt-4">
                                <Link href="/">
                                    <Button>Explore Other Tools</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
