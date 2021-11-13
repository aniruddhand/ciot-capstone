function getDaysRange(timestamp) {
    const date = new Date(timestamp);

    const fromTimestamp = (timestamp - date.getHours()*60*60*1000 - date.getMinutes()*60*1000 - date.getSeconds()*1000);
    const toTimestamp = (fromTimestamp + 23*60*60*1000 + 59*60*1000 + 59*1000);

    return [fromTimestamp, toTimestamp];
}


module.exports = {
    matchesEmailPattern: (email) => {
        return typeof email == 'string' && /^[^@]+@[^@]+$/.test(email);
    },

    isValidCellNumber: (cellPhone) => {
        var cellPhoneNumber = cellPhone;
        if (typeof cellPhoneNumber == 'string') {
            cellPhoneNumber = Number.parseInt(cellPhoneNumber);
    
        } else if (typeof cellPhone != 'number') {
            cellPhoneNumber = undefined;
        }
    
        if (!cellPhoneNumber || cellPhoneNumber === NaN || ("" + cellPhoneNumber).length != 10) {
            return false;
        }

        return true;
    },

    isValidPin: (pin) => {
        var pinNumber = pin;
        if (typeof pinNumber == 'string') {
            pinNumber = Number.parseInt(pin);
    
        } else if (typeof pinNumber != 'number') {
            pinNumber = undefined;
        }
    
        if (!pinNumber || pinNumber === NaN || ("" + pinNumber).length != 4) {
            return false;
        }
    
        return true;
    },

    getEpochRange: (timestamp) => {
        return getDaysRange(timestamp);
    },

    getTodaysEpochRange: () => {
        return getDaysRange(Date.now());
    }
};
