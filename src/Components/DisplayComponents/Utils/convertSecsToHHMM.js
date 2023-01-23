/**
 * Converts a time in seconds to hours and minutes
 * @param {number} seconds an amount in seconds
 * @returns string in format 'HH:MM'
 */
function convertSecsToHHMM(seconds) {
    let totalMinutes = (seconds - (seconds % 60)) / 60;
    let minutes = totalMinutes % 60;
    let hours = Math.floor(totalMinutes / 60)
    
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutes}`
}

export default convertSecsToHHMM;