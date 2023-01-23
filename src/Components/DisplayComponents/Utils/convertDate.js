/**
 * Uses Date.toLocaleString() to convert/reformat date, configured by options
 * @param {string} string YYYY-MM-DD HH:MM:SS +HH:MM or Day Month Year HH:MM +HH:MM
 * @param {object} optionsObj created from inputOptions or displayOptions
 * @returns date string e.g. 'Saturday, 14/01/2023, 12:16'
 */
function convertDate (string, optionsObj) {
    // Converting to ms and back gives us commas in the result
    let timeMs = Date.parse(string);
    let customDate = new Date(timeMs);
    let convertedDate = customDate.toLocaleString('en-AU', optionsObj);

    return convertedDate;
}

export default convertDate;