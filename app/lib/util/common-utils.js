// const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)\|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
    }
};
