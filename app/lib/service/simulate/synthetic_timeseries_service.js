const { AcitivityConsumptionPercentage, Activity, PCPDConsumption } = require("../../../models/timeseries_profile");
const { get } = require("../../../routes/summary");

const stepSizeInMillis = 60 * 1000;

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
}

function wakeUp(timeseries, family, member) {
    const activityPercentage = AcitivityConsumptionPercentage[family.economicSection][Activity.Others];
    const todaysConsumption = ((member.pcpd 
                * getRandomIntInclusive(1, activityPercentage))/100);

    timeseries[member.dayStartTime] = todaysConsumption;
}

function takeBath(timeseries, family, member) {
    const bathingPercentage = AcitivityConsumptionPercentage[family.economicSection][Activity.Bathing];
    const todaysConsumption = ((member.pcpd * bathingPercentage)/100);

    var activityRange = member.getsReadyBtw ? member.getsReadyBtw : family.getsReadyBtw;
    const todaysActivityTime = getRandomIntInclusive(activityRange[0], activityRange[1]);

    timeseries[todaysActivityTime] = todaysConsumption;
}

function eatBreakfast(timeseries, family, member) {
    const activityPercentage = AcitivityConsumptionPercentage[family.economicSection][Activity.Drinking];
    const todaysConsumption = ((member.pcpd * (activityPercentage/7)/100));

    var activityRange = member.breaksfastsBtw ? member.breaksfastsBtw : family.breaksfastsBtw;
    const todaysActivityTime = getRandomIntInclusive(activityRange[0], activityRange[1]);

    timeseries[todaysActivityTime] = todaysConsumption;
}

function eatLunch(timeseries, family, member) {
    const activityPercentage = AcitivityConsumptionPercentage[family.economicSection][Activity.Drinking];
    const todaysConsumption = ((member.pcpd * (activityPercentage/7)/100));

    var activityRange = member.breaksfastsBtw ? member.breaksfastsBtw : family.breaksfastsBtw;
    const todaysActivityTime = getRandomIntInclusive(activityRange[0], activityRange[1]);

    timeseries[todaysActivityTime] = todaysConsumption;
}

function eatDinner(timeseries, family, member) {
    const activityPercentage = AcitivityConsumptionPercentage[family.economicSection][Activity.Drinking];
    const todaysConsumption = ((member.pcpd * (activityPercentage/7)/100));

    var activityRange = member.breaksfastsBtw ? member.breaksfastsBtw : family.breaksfastsBtw;
    const todaysActivityTime = getRandomIntInclusive(activityRange[0], activityRange[1]);

    timeseries[todaysActivityTime] = todaysConsumption;
}

function drinkWater(timeseries, family, member) {
    const activityPercentage = AcitivityConsumptionPercentage[family.economicSection][Activity.Drinking];
    const todaysConsumption = ((member.pcpd * (activityPercentage/7)/100));

    const randomTime1 = getRandomIntInclusive(member.dayStartTime, member.dayEndTime);
    const randomTime2 = getRandomIntInclusive(member.dayStartTime, member.dayEndTime);
    const randomTime3 = getRandomIntInclusive(member.dayStartTime, member.dayEndTime);
    const randomTime4 = getRandomIntInclusive(member.dayStartTime, member.dayEndTime);

    timeseries[randomTime1] = todaysConsumption;
    timeseries[randomTime2] = todaysConsumption;
    timeseries[randomTime3] = todaysConsumption;
    timeseries[randomTime4] = todaysConsumption;
}

function openTap(timeseries, family, member) {
    if (!member.opensTapBtw) {
        return;
    }

    for (var i = member.opensTapBtw[0]; i <= member.opensTapBtw[1]; i += stepSizeInMillis) {
        timeseries[i] = 4;
    }
}

function performCommonActivity(timeseries, family, member, activity, activityTimeRange) {
    var ranges = activityTimeRange;
    if (!activityTimeRange[0].length) {
        ranges = [activityTimeRange];
    }

    // This the percentage allotted by Govt. bodies
    const activityPercentage = AcitivityConsumptionPercentage[family.economicSection][activity];

    // Assuming that activity is distributed evenly amongst all the ranges
    const perActivityConsumption = (((member.pcpd * activityPercentage)/100)/ranges.length);

    ranges.forEach(range => {
        const timeWithinARange = getRandomIntInclusive(range[0], range[1]);
        timeseries[timeWithinARange] = perActivityConsumption;    
    });
}

function fixTodaysWakeupAndSleepTime(family, member) {
    var dayStartRange = member.dayStartsBtw ? member.dayStartsBtw : family.dayStartsBtw;
    var dayEndRange = member.dayEndsBtw ? member.dayEndsBtw : family.dayEndsBtw;

    member.dayStartTime = getRandomIntInclusive(dayStartRange[0], dayStartRange[1]);
    member.dayEndTime = getRandomIntInclusive(dayEndRange[0], dayEndRange[1]);
}

function fixTodaysConsumptionVolume(family, member) {
    const pcpd = PCPDConsumption[family.economicSection];
    const memConsumptionBracket = member.paConsumptionBracket ? member.paConsumptionBracket
                                    : family.paConsumptionBracket;

    if (memConsumptionBracket.max >= pcpd.Mean) {
        member.pcpd = getRandomIntInclusive(memConsumptionBracket.max, pcpd.Mean);
    } else {
        member.pcpd = getRandomIntInclusive(pcpd.Mean, memConsumptionBracket.max);
    }
}

function generateWaterTankData(thingName, timestamp, level, family) {
    const timeseries = {};

    for (var i = 0; i < family.members.length; i++) {
        const member = family.members[i];
        
        fixTodaysWakeupAndSleepTime(family, member);
        fixTodaysConsumptionVolume(family, member);

        wakeUp(timeseries, family, member);
        takeBath(timeseries, family, member);
        eatBreakfast(timeseries, family, member);
        eatLunch(timeseries, family, member);
        eatDinner(timeseries, family, member);
        drinkWater(timeseries, family, member);
        openTap(timeseries, family, member);

        performCommonActivity(timeseries, family, member, Activity.Cooking, family.foodIsCookedBtw);
        performCommonActivity(timeseries, family, member, Activity.WashingCloths, family.washClothsBtw);
        performCommonActivity(timeseries, family, member, Activity.WashingUtensils, family.utensilsAreWashedBtw);
        performCommonActivity(timeseries, family, member, Activity.CleaningHouse, family.houseIsCleanedBtw);
    }

    var currentLevel = Number.parseInt(level);
    const sortedTimestamps = Object.keys(timeseries).sort();

    const dayInMillis = 24*60*60*1000;

    var sortedTimeseries = [];

    for (var i = timestamp; i < timestamp + dayInMillis; i += stepSizeInMillis) {
        for (var j = 0; j < sortedTimestamps.length; j++) {
            const sortedTimestamp = Number.parseInt(sortedTimestamps[j]);

            if (sortedTimestamp >= i && sortedTimestamp < (i + stepSizeInMillis)) {
                currentLevel -= timeseries[sortedTimestamp];
            }
        }

        const date = new Date(i);
        sortedTimeseries.push({'thingName': thingName, 'timestamp': i,  'volume': Math.ceil(currentLevel)});
    }

    return sortedTimeseries;
}

function generateSumpTankData(timestamp, currentWaterLevel, sumptankProfile) {
}

module.exports = {
    synthesizeWaterTankTimeseries: function(thingName, timestamp, currentWaterLevel, familyProfile) {
        return generateWaterTankData(thingName, timestamp, currentWaterLevel, familyProfile);
    },

    synthesizeSumpTankTimeseries: function(timestamp, currentWaterLevel, sumpProfile) {
    }
}