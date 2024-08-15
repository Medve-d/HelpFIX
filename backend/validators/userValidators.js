const validator = require('validator');

const isValidPhoneNumber = (phoneNumber) => {
    return validator.isMobilePhone(phoneNumber, 'any');
};

const isValidAge = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= 18;
};

module.exports = {
    isValidPhoneNumber,
    isValidAge
};
