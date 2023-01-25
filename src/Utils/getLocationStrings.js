/**
 * Reformats timezone names for display
 * @param {string} timezone from API, e.g. 'Australia/Sydney'
 * @returns string in reverse order e.g. 'Sydney, Australia'
 */
function getLocationStrings(timezone) {
    let formattedString = timezone.replaceAll('_', ' ');

    let locationArray = [];
    formattedString.split('/').forEach( word => {
        locationArray.push(word);
    })

    let string = "";

    locationArray.reverse();

    locationArray.forEach( (word, index) => {
        if (index === 0) {
            string += word;
        } else {
            string += ', ';
            string += word;
        }
    })

    return string;
}

export default getLocationStrings;