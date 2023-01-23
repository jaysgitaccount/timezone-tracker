/**
 * Reformats date to valid date input value
 * @param {string} date format: DD/MM/YYYY
 * @returns YYYY-MM-DD
 */
function reformatDate(date) {
    if (date) {
        let split = date.split('/');
        let result = `${split[2]}-${split[1]}-${split[0]}`;

        return result;
    }
}

export default reformatDate;