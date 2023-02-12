export const formatDate = (date) => {
    return date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
};

export const isValidDateStr = (str) => {
    var dateReg = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
    return str.match(dateReg);
};