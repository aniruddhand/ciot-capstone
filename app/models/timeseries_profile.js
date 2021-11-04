const HousholdEconomicSection = {
    // High income
    SECA:'SECA',
    // Mid income
    SECB: 'SECB'
}

// Per Capita Per Day
const PCPDConsumption = {
    SECA: { Mean: 102.1, StdD: 62.8 },
    SECB: { Mean: 95.2, StdD: 56.7 }
}

const ConsumptionBracket = {
    'Blw50': {min: 50, max: 50},
    'Btw50To75': {min: 50, max: 75},
    'Btw75To100': {min: 75, max: 100},
    'Btw100To135': {min: 100, max: 135},
    'Btw135To175': {min: 135, max: 175},
    'Btw175To200': {min: 175, max: 200},
    'Abv200': {min: 200, max: 300}
}

const ConsumptionPercentage = {
    SECA: {
        [ConsumptionBracket.Blw50]: 18,
        [ConsumptionBracket.Btw50To75]: 17.7,
        [ConsumptionBracket.Btw75To100]: 22.2,
        [ConsumptionBracket.Btw100To135]: 18.8,
        [ConsumptionBracket.Btw135To175]: 13.1,
        [ConsumptionBracket.Btw175To200]: 2.8,
        [ConsumptionBracket.Abv200]: 7.4
    },
    SECB: {
        [ConsumptionBracket.Blw50]: 17.7,
        [ConsumptionBracket.Btw50To75]: 19.3,
        [ConsumptionBracket.Btw75To100]: 24.9,
        [ConsumptionBracket.Btw100To135]: 21.9,
        [ConsumptionBracket.Btw135To175]: 9.6,
        [ConsumptionBracket.Btw175To200]: 3.4,
        [ConsumptionBracket.Abv200]: 3.2        
    }
}

const Activity = {
    'Bathing': 'Bathing',
    'WashingCloths': 'WashingCloths',
    'Drinking': 'Drinking',
    'Cooking': 'Cooking',
    'Toilets': 'Toilets',
    'CleaningHouse': 'CleaningHouse',
    'WashingUtensils': 'WashingUtensils',
    'Others': 'Others'
}

const AcitivityConsumptionPercentage = {
    SECA: {
        [Activity.Bathing]: 29,
        [Activity.WashingCloths]: 19.6,
        [Activity.Drinking]: 3.9,
        [Activity.Cooking]: 2.9,
        [Activity.Toilets]: 17,
        [Activity.CleaningHouse]: 8,
        [Activity.WashingUtensils]: 16.4,
        [Activity.Others]: 3.2
    },
    SECB: {
        [Activity.Bathing]: 26.4,
        [Activity.WashingCloths]: 19.3,
        [Activity.Drinking]: 4.2,
        [Activity.Cooking]: 3.1,
        [Activity.Toilets]: 17,
        [Activity.CleaningHouse]: 8,
        [Activity.WashingUtensils]: 16.4,
        [Activity.Others]: 3.2
    }
}

module.exports = {
    HousholdEconomicSection: HousholdEconomicSection,
    PCPDConsumption: PCPDConsumption,
    ConsumptionBracket: ConsumptionBracket,
    ConsumptionPercentage: ConsumptionPercentage,
    Activity: Activity,
    AcitivityConsumptionPercentage: AcitivityConsumptionPercentage
}