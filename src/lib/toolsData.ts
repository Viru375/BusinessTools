export interface Tool {
    id: number;
    slug: string;
    name: string;
    description: string;
    category: string;
    path: string;
}

export interface Cluster {
    name: string;
    slug: string;
    tools: Tool[];
}

export const toolsData: Cluster[] = [
    {
        name: "Investment & Wealth",
        slug: "investment-wealth",
        tools: [
            { id: 1, slug: "sip-calculator", name: "SIP Calculator", description: "Calculate returns on your Systematic Investment Plan.", category: "investment-wealth", path: "/tools/investment-wealth/sip-calculator" },
            { id: 2, slug: "lumpsum-calculator", name: "Lumpsum Calculator", description: "Calculate returns on your one-time investment.", category: "investment-wealth", path: "/tools/investment-wealth/lumpsum-calculator" },
            { id: 3, slug: "step-up-sip-calculator", name: "Step-Up SIP Calculator", description: "Calculate returns with an annually increasing SIP.", category: "investment-wealth", path: "/tools/investment-wealth/step-up-sip-calculator" },
            { id: 4, slug: "sip-vs-lumpsum-calculator", name: "SIP vs. Lumpsum Calculator", description: "Compare returns between SIP and Lumpsum investments.", category: "investment-wealth", path: "/tools/investment-wealth/sip-vs-lumpsum-calculator" },
            { id: 5, slug: "mutual-fund-returns-calculator", name: "Mutual Fund Returns Calculator", description: "Estimate the returns on your mutual fund investments.", category: "investment-wealth", path: "/tools/investment-wealth/mutual-fund-returns-calculator" },
            { id: 6, slug: "cagr-calculator", name: "CAGR Calculator", description: "Calculate the Compound Annual Growth Rate of an investment.", category: "investment-wealth", path: "/tools/investment-wealth/cagr-calculator" },
            { id: 7, slug: "xirr-calculator", name: "XIRR Calculator", description: "Calculate Extended Internal Rate of Return for SIPs.", category: "investment-wealth", path: "/tools/investment-wealth/xirr-calculator" },
            { id: 8, slug: "goal-planner", name: "Goal Planner", description: "Plan your investments to reach a specific financial goal.", category: "investment-wealth", path: "/tools/investment-wealth/goal-planner" },
            { id: 9, slug: "rule-of-72-calculator", name: "Rule of 72 Calculator", description: "Estimate how long it will take to double your money.", category: "investment-wealth", path: "/tools/investment-wealth/rule-of-72-calculator" },
            { id: 10, slug: "cost-of-delay-calculator", name: "Cost of Delay Calculator", description: "See how much delaying your investment costs you.", category: "investment-wealth", path: "/tools/investment-wealth/cost-of-delay-calculator" },
        ],
    },
    {
        name: "Banking & Loans",
        slug: "banking-loans",
        tools: [
            { id: 11, slug: "home-loan-emi-calculator", name: "Home Loan EMI Calculator", description: "Calculate your Home Loan Equated Monthly Installment.", category: "banking-loans", path: "/tools/banking-loans/home-loan-emi-calculator" },
            { id: 12, slug: "car-loan-emi-calculator", name: "Car Loan EMI Calculator", description: "Calculate your Car Loan EMI.", category: "banking-loans", path: "/tools/banking-loans/car-loan-emi-calculator" },
            { id: 13, slug: "personal-loan-emi-calculator", name: "Personal Loan EMI Calculator", description: "Calculate your Personal Loan EMI.", category: "banking-loans", path: "/tools/banking-loans/personal-loan-emi-calculator" },
            { id: 14, slug: "loan-prepayment-calculator", name: "Loan Prepayment Calculator", description: "Calculate savings by prepaying your loan.", category: "banking-loans", path: "/tools/banking-loans/loan-prepayment-calculator" },
            { id: 15, slug: "loan-eligibility-calculator", name: "Loan Eligibility Calculator", description: "Check how much loan you are eligible for.", category: "banking-loans", path: "/tools/banking-loans/loan-eligibility-calculator" },
            { id: 16, slug: "loan-comparison-calculator", name: "Loan Comparison Calculator", description: "Compare two loan offers to find the best one.", category: "banking-loans", path: "/tools/banking-loans/loan-comparison-calculator" },
            { id: 17, slug: "fd-calculator", name: "FD Calculator", description: "Calculate returns on Fixed Deposits.", category: "banking-loans", path: "/tools/banking-loans/fd-calculator" },
            { id: 18, slug: "rd-calculator", name: "RD Calculator", description: "Calculate returns on Recurring Deposits.", category: "banking-loans", path: "/tools/banking-loans/rd-calculator" },
            { id: 19, slug: "simple-interest-calculator", name: "Simple Interest Calculator", description: "Calculate simple interest on your principal.", category: "banking-loans", path: "/tools/banking-loans/simple-interest-calculator" },
            { id: 20, slug: "compound-interest-calculator", name: "Compound Interest Calculator", description: "Calculate compound interest on your investment.", category: "banking-loans", path: "/tools/banking-loans/compound-interest-calculator" },
        ],
    },
    {
        name: "Tax & Government Schemes",
        slug: "tax-government-schemes",
        tools: [
            { id: 21, slug: "income-tax-calculator", name: "Income Tax Calculator", description: "Calculate your income tax (Old vs New Regime).", category: "tax-government-schemes", path: "/tools/tax-government-schemes/income-tax-calculator" },
            { id: 22, slug: "hra-calculator", name: "HRA Calculator", description: "Calculate House Rent Allowance exemption.", category: "tax-government-schemes", path: "/tools/tax-government-schemes/hra-calculator" },
            { id: 23, slug: "rent-receipt-generator", name: "Rent Receipt Generator", description: "Generate rent receipts to claim HRA.", category: "tax-government-schemes", path: "/tools/tax-government-schemes/rent-receipt-generator" },
            { id: 24, slug: "gst-calculator", name: "GST Calculator", description: "Calculate GST exclusive or inclusive amounts.", category: "tax-government-schemes", path: "/tools/tax-government-schemes/gst-calculator" },
            { id: 25, slug: "tds-calculator", name: "TDS Calculator", description: "Calculate Tax Deducted at Source.", category: "tax-government-schemes", path: "/tools/tax-government-schemes/tds-calculator" },
            { id: 26, slug: "capital-gains-calculator", name: "Capital Gains Calculator", description: "Calculate LTCG and STCG tax.", category: "tax-government-schemes", path: "/tools/tax-government-schemes/capital-gains-calculator" },
            { id: 27, slug: "gratuity-calculator", name: "Gratuity Calculator", description: "Calculate the gratuity amount you are eligible for.", category: "tax-government-schemes", path: "/tools/tax-government-schemes/gratuity-calculator" },
            { id: 28, slug: "ssy-calculator", name: "SSY Calculator", description: "Calculate returns under Sukanya Samriddhi Yojana.", category: "tax-government-schemes", path: "/tools/tax-government-schemes/ssy-calculator" },
            { id: 29, slug: "kvp-calculator", name: "KVP Calculator", description: "Calculate returns under Kisan Vikas Patra.", category: "tax-government-schemes", path: "/tools/tax-government-schemes/kvp-calculator" },
            { id: 30, slug: "nsc-calculator", name: "NSC Calculator", description: "Calculate returns under National Savings Certificate.", category: "tax-government-schemes", path: "/tools/tax-government-schemes/nsc-calculator" },
        ],
    },
    {
        name: "Retirement Planning",
        slug: "retirement-planning",
        tools: [
            { id: 31, slug: "ppf-calculator", name: "PPF Calculator", description: "Calculate returns on Public Provident Fund.", category: "retirement-planning", path: "/tools/retirement-planning/ppf-calculator" },
            { id: 32, slug: "epf-calculator", name: "EPF Calculator", description: "Calculate returns on Employee Provident Fund.", category: "retirement-planning", path: "/tools/retirement-planning/epf-calculator" },
            { id: 33, slug: "nps-calculator", name: "NPS Calculator", description: "Calculate returns on National Pension System.", category: "retirement-planning", path: "/tools/retirement-planning/nps-calculator" },
            { id: 34, slug: "retirement-corpus-calculator", name: "Retirement Corpus Calculator", description: "Estimate the corpus needed for your retirement.", category: "retirement-planning", path: "/tools/retirement-planning/retirement-corpus-calculator" },
            { id: 35, slug: "inflation-calculator", name: "Inflation Calculator", description: "Calculate the future value of money due to inflation.", category: "retirement-planning", path: "/tools/retirement-planning/inflation-calculator" },
            { id: 36, slug: "swp-calculator", name: "SWP Calculator", description: "Calculate Systematic Withdrawal Plan returns.", category: "retirement-planning", path: "/tools/retirement-planning/swp-calculator" },
            { id: 37, slug: "apy-calculator", name: "APY Calculator", description: "Calculate pension under Atal Pension Yojana.", category: "retirement-planning", path: "/tools/retirement-planning/apy-calculator" },
            { id: 38, slug: "scss-calculator", name: "SCSS Calculator", description: "Calculate returns under Senior Citizen Savings Scheme.", category: "retirement-planning", path: "/tools/retirement-planning/scss-calculator" },
            { id: 39, slug: "pmvvy-calculator", name: "PMVVY Calculator", description: "Calculate returns under PM Vaya Vandana Yojana.", category: "retirement-planning", path: "/tools/retirement-planning/pmvvy-calculator" },
            { id: 40, slug: "fire-calculator", name: "FIRE Calculator", description: "Plan for Financial Independence, Retire Early.", category: "retirement-planning", path: "/tools/retirement-planning/fire-calculator" },
        ],
    },
    {
        name: "Stock Market & Trading",
        slug: "stock-market-trading",
        tools: [
            { id: 41, slug: "brokerage-calculator", name: "Brokerage Calculator", description: "Calculate brokerage and other charges on trades.", category: "stock-market-trading", path: "/tools/stock-market-trading/brokerage-calculator" },
            { id: 42, slug: "stock-average-calculator", name: "Stock Average Calculator", description: "Calculate average price of stock holdings.", category: "stock-market-trading", path: "/tools/stock-market-trading/stock-average-calculator" },
            { id: 43, slug: "pivot-point-calculator", name: "Pivot Point Calculator", description: "Calculate pivot points for trading supports/resistances.", category: "stock-market-trading", path: "/tools/stock-market-trading/pivot-point-calculator" },
            { id: 44, slug: "fibonacci-retracement-calculator", name: "Fibonacci Retracement Calculator", description: "Calculate Fibonacci retracement levels.", category: "stock-market-trading", path: "/tools/stock-market-trading/fibonacci-retracement-calculator" },
            { id: 45, slug: "dividend-yield-calculator", name: "Dividend Yield Calculator", description: "Calculate dividend yield of a stock.", category: "stock-market-trading", path: "/tools/stock-market-trading/dividend-yield-calculator" },
            { id: 46, slug: "pe-ratio-calculator", name: "P/E Ratio Calculator", description: "Calculate Price-to-Earnings ratio.", category: "stock-market-trading", path: "/tools/stock-market-trading/pe-ratio-calculator" },
            { id: 47, slug: "position-size-calculator", name: "Position Size Calculator", description: "Calculate appropriate position size for risk management.", category: "stock-market-trading", path: "/tools/stock-market-trading/position-size-calculator" },
        ],
    },
    {
        name: "Business & Utility",
        slug: "business-utility",
        tools: [
            { id: 48, slug: "margin-vs-markup-calculator", name: "Margin vs Markup Calculator", description: "Understand the difference between margin and markup.", category: "business-utility", path: "/tools/business-utility/margin-vs-markup-calculator" },
            { id: 49, slug: "roi-calculator", name: "ROI Calculator", description: "Calculate Return on Investment.", category: "business-utility", path: "/tools/business-utility/roi-calculator" },
            { id: 50, slug: "break-even-point-calculator", name: "Break-Even Point Calculator", description: "Calculate the point where costs and revenues are equal.", category: "business-utility", path: "/tools/business-utility/break-even-point-calculator" },
            { id: 51, slug: "freelance-rate-calculator", name: "Freelance Rate Calculator", description: "Estimate what you should charge as a freelancer.", category: "business-utility", path: "/tools/business-utility/freelance-rate-calculator" },
            { id: 52, slug: "discount-calculator", name: "Discount Calculator", description: "Calculate final price after discount.", category: "business-utility", path: "/tools/business-utility/discount-calculator" },
        ],
    },
    {
        name: "Real Estate & Property",
        slug: "real-estate-property",
        tools: [
            { id: 53, slug: "rent-vs-buy-calculator", name: "Rent vs Buy Calculator", description: "Decide whether renting or buying is better financially.", category: "real-estate-property", path: "/tools/real-estate-property/rent-vs-buy-calculator" },
            { id: 54, slug: "rental-yield-calculator", name: "Rental Yield Calculator", description: "Calculate the yield from your rental property.", category: "real-estate-property", path: "/tools/real-estate-property/rental-yield-calculator" },
            { id: 55, slug: "home-affordability-calculator", name: "Home Affordability Calculator", description: "Estimate how much home you can afford.", category: "real-estate-property", path: "/tools/real-estate-property/home-affordability-calculator" },
            { id: 56, slug: "property-registration-charges-calculator", name: "Property Registration Charges", description: "Estimate registration charges and stamp duty.", category: "real-estate-property", path: "/tools/real-estate-property/property-registration-charges-calculator" },
            { id: 57, slug: "capital-gains-on-property", name: "Capital Gains on Property", description: "Calculate capital gains tax on property sale.", category: "real-estate-property", path: "/tools/real-estate-property/capital-gains-on-property" },
            { id: 58, slug: "pre-emi-calculator", name: "Pre-EMI Calculator", description: "Calculate interest to be paid on under-construction property loan.", category: "real-estate-property", path: "/tools/real-estate-property/pre-emi-calculator" },
            { id: 59, slug: "house-flipping-calculator", name: "House Flipping Calculator", description: "Estimate profits from buying and flipping houses.", category: "real-estate-property", path: "/tools/real-estate-property/house-flipping-calculator" },
        ],
    },
    {
        name: "Insurance",
        slug: "insurance",
        tools: [
            { id: 60, slug: "hlv-calculator", name: "Human Life Value (HLV) Calculator", description: "Calculate the insurance cover you actually need.", category: "insurance", path: "/tools/insurance/hlv-calculator" },
            { id: 61, slug: "health-insurance-premium-estimator", name: "Health Insurance Premium Estimator", description: "Estimate health insurance premiums.", category: "insurance", path: "/tools/insurance/health-insurance-premium-estimator" },
            { id: 62, slug: "ncb-calculator", name: "No Claim Bonus (NCB) Calculator", description: "Calculate No Claim Bonus on your insurance.", category: "insurance", path: "/tools/insurance/ncb-calculator" },
            { id: 63, slug: "term-vs-endowment-plan", name: "Term vs Endowment Plan", description: "Compare Term Insurance with Endowment Plans.", category: "insurance", path: "/tools/insurance/term-vs-endowment-plan" },
            { id: 64, slug: "motor-insurance-idv-calculator", name: "Motor Insurance (IDV) Calculator", description: "Calculate Insured Declared Value for vehicle insurance.", category: "insurance", path: "/tools/insurance/motor-insurance-idv-calculator" },
            { id: 65, slug: "smoking-cost-calculator", name: "Smoking Cost Calculator", description: "Calculate the financial cost of smoking over time.", category: "insurance", path: "/tools/insurance/smoking-cost-calculator" },
        ],
    },
    {
        name: "Crypto & Forex",
        slug: "crypto-forex",
        tools: [
            { id: 66, slug: "crypto-profit-loss-calculator", name: "Crypto Profit/Loss Calculator", description: "Calculate profit or loss on crypto trades.", category: "crypto-forex", path: "/tools/crypto-forex/crypto-profit-loss-calculator" },
            { id: 67, slug: "crypto-sip-calculator", name: "Crypto SIP Calculator", description: "Calculate returns on Crypto SIPs.", category: "crypto-forex", path: "/tools/crypto-forex/crypto-sip-calculator" },
            { id: 68, slug: "currency-converter", name: "Currency Converter", description: "Convert between different currencies.", category: "crypto-forex", path: "/tools/crypto-forex/currency-converter" },
            { id: 69, slug: "forex-pip-calculator", name: "Forex Pip Calculator", description: "Calculate the value of a pip in forex trading.", category: "crypto-forex", path: "/tools/crypto-forex/forex-pip-calculator" },
            { id: 70, slug: "gas-fee-estimator", name: "Gas Fee Estimator", description: "Estimate blockchain gas fees.", category: "crypto-forex", path: "/tools/crypto-forex/gas-fee-estimator" },
            { id: 71, slug: "impermanent-loss-calculator", name: "Impermanent Loss Calculator", description: "Calculate potential impermanent loss in liquidity pools.", category: "crypto-forex", path: "/tools/crypto-forex/impermanent-loss-calculator" },
        ],
    },
    {
        name: "Personal Finance",
        slug: "personal-finance",
        tools: [
            { id: 72, slug: "50-30-20-rule-calculator", name: "50/30/20 Rule Calculator", description: "Budget your income using the 50/30/20 rule.", category: "personal-finance", path: "/tools/personal-finance/50-30-20-rule-calculator" },
            { id: 73, slug: "emergency-fund-calculator", name: "Emergency Fund Calculator", description: "Calculate how much you need for emergencies.", category: "personal-finance", path: "/tools/personal-finance/emergency-fund-calculator" },
            { id: 74, slug: "net-worth-calculator", name: "Net Worth Calculator", description: "Calculate your total Net Worth.", category: "personal-finance", path: "/tools/personal-finance/net-worth-calculator" },
            { id: 75, slug: "financial-freedom-calculator", name: "Financial Freedom Calculator", description: "Calculate when you can achieve financial freedom.", category: "personal-finance", path: "/tools/personal-finance/financial-freedom-calculator" },
            { id: 76, slug: "cost-of-living-comparator", name: "Cost of Living Comparator", description: "Compare cost of living between two cities.", category: "personal-finance", path: "/tools/personal-finance/cost-of-living-comparator" },
            { id: 77, slug: "wedding-budget-planner", name: "Wedding Budget Planner", description: "Plan and track your wedding expenses.", category: "personal-finance", path: "/tools/personal-finance/wedding-budget-planner" },
        ],
    },
];
