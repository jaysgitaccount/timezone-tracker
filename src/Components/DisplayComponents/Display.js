import { useState, useEffect } from 'react';
import Clock from "./Clock";
import DigitalTime from "./DigitalTime";
import CurrentDate from "./CurrentDate";
import Timezone from "./Timezone"
import DST from "./DST";
import TimezoneAbbr from "./TimezoneAbbr"
import UTCOffset from "./UTCOffset"
import DeleteButton from "./DeleteButton";
import CustomTimeInput from './CustomTimeInput';

let ISOHandler = (function() {
    // Format: 2023-01-11T04:39:38.763Z
    function getHMS(string) {
        return string.split('T').pop().split('.')[0];
    }

    function getDate(string) {
        return string.split('T')[0];
    }

    return {
        getHMS,
        getDate,
    }
})();

let DateTimeConverter = (function() {
    function offsetMsTime(timeMs, offsetMs) {
        // Take time in ms and return time in ms with offset applied
        return timeMs + offsetMs;
    }

    function convertTimeDay(timeInMs) {
        // Compare a converted time in ms against 00:00
        // To determine the actual time and what day it is now

        let maxMsInDay =  24*3600*1000;
        let dayResult = "";
        let calculatedTimeMs;

        if (timeInMs < 0) {
            // If timeUTC is negative, it's the previous day
            // Subtract it from 12AM to get yesterday's time
            calculatedTimeMs = maxMsInDay - (timeInMs * -1)
            dayResult = 'previous'
        } else if (timeInMs >= maxMsInDay) {
            // If time is greater than total # of seconds in one day,
            // Get time from the next day's 12AM
            calculatedTimeMs = timeInMs - maxMsInDay;
            dayResult = 'next'
        } else {
            calculatedTimeMs = timeInMs;
        }
        
        return {
            calculatedTimeMs,
            dayResult
        }
    }

    function convertHMSToMs(string) {
        // Take HH:MM:SS string, or +HH:MM (UTC offset)
        // Account for negative UTC offsets
        let prefix = string[0] === '+' || string[0] === '-'
                        ? string[0]
                        : '';
        
        let [hours, minutes, seconds] = string.split(':');

        // Convert individual values to ms;
        let hoursMs = hours * 60 * 60 * 1000;
        let minutesMs = minutes * 60 * 1000;
        let secondsMs = seconds ? seconds * 1000
                                : 0;

        return Number(`${prefix}${hoursMs + minutesMs + secondsMs}`);
    }

    function convertMsToHMS(value) {
        let secondsTotal = Math.floor(value / 1000);
        let seconds = secondsTotal % 60;
        let minutesTotal = (secondsTotal - seconds) / 60;
        let minutes = minutesTotal % 60;
        let hours = (minutesTotal - minutes) / 60;

        hours = formatTime(hours);
        minutes = formatTime(minutes);
        seconds = formatTime(seconds);

        return `${hours}:${minutes}:${seconds}`
    }

    function formatTime(value) {
        // Check if a time value, e.g. HH or MM, needs a 0 added
        // To fit the correct format
        if (value < 10) {
            return `0${value}`
        } else {
            return value;
        }
    }

    function convertSecondsToMs(value) {
        return value * 1000;
    }

    return {
        offsetMsTime,
        convertHMSToMs,
        convertMsToHMS,
        convertTimeDay,
        convertSecondsToMs
    }
})();

/* Take in epoch time state and return strings for display */
function getTimeStrings(timeState) {
    let datetime = new Date(timeState);
    
    let [day, date] = [
        datetime.toDateString().substring(0, 3),
        datetime.toDateString().substring(4)
    ]

    let time = datetime.toTimeString().split(' ')[0];

    return [day, date, time];
}


/* Reformat timezone location for display */
function getLocationStrings(timezone) {
    let formattedString = timezone.replaceAll('_', ' ');

    let locationArray = [];
    formattedString.split('/').forEach( word => {
        locationArray.push(word);
    })

    let string = "";

    // Need to reverse the order of words (do for loop i--)
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

function convertToMs(customTime) {
    // Calculates the number of seconds that a time is from 12AM, or 00:00
    // Takes format 'HH:MM'
    // Also accounts for negative UTC offsets '-HH:MM'
    let prefix = '';
    let timeString = customTime;

    if (customTime[0] === '-') {
        prefix = customTime[0];
        timeString = customTime.substring(1, (customTime.length));
    }

    let [hours, minutes] = timeString.split(':');
    let milliseconds = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);

    return Number(`${prefix}${milliseconds}`);
}

function convertToHours(millisecondsTime) {
    let secondsTime = Math.floor(millisecondsTime / 1000);
    let totalMinutes = (secondsTime - (secondsTime % 60)) / 60;
    let minutes = totalMinutes % 60;
    let hours = Math.floor(totalMinutes / 60)
    
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutes}`
}

function convertSecsToHHMM(seconds) {
    let totalMinutes = (seconds - (seconds % 60)) / 60;
    let minutes = totalMinutes % 60;
    let hours = Math.floor(totalMinutes / 60)
    
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutes}`
}

const options = function (timezone, isHour12) {
    return {
        timeZone: timezone,
        hour12: isHour12,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }
}

function Display(props) {
    const [data, setData] = useState({});
    const [currentTime, setCurrentTime] = useState('');

    let url = `https://worldtimeapi.org/api/timezone/${props.timezone}`
    let displayDay = '';
    let displayDate = '';
    let displayTime = '';
    let timezone = '';
    let abbr = '';
    let utc = '';
    let dst = '';
    let dstOffset = '';

    // Fetch data and store in state
    useEffect(() => {
        fetch(url).then(
            result => result.json()
        ).then(
            resultJSON => setData(resultJSON)
        )
    }, [props.timezone, url]);

    // On receiving current time from parent,
    // Convert to current time string and set state
    useEffect(() => {
        let currentTimestamp = props.currentTime;
        let convertedTimestamp = currentTimestamp.toLocaleString('en-AU', options(props.timezone, false));
        setCurrentTime(convertedTimestamp);
        console.log(convertedTimestamp)
    }, [props.timezone, props.currentTime])

    function convertTimezones (customTimeObj) {
        // Accepts an object and processes data for child to display
        // YYYY-MM-DD HH:MM:SS +HH:MM or Day Month Year HH:MM +HH:MM
        // Timezone offset string in UTC-04:00 :
        // This accepts both Jun and June, 01 and 1

        let time = '1 June 2017 08:38:00 -4:00'
        let timeMs = Date.parse(time);
 
        let customDate = new Date(timeMs);
        // The new Date automatically displays it as Sydney time
        console.log(customDate)

        let convertedDate = customDate.toLocaleString('en-AU', options);
        console.log(convertedDate)

        return convertedDate;
    }

    function handleDelete() {
        props.handleDelete(props.id);
    }

    function handleCustomTimeInput(customTime) {
        // Send CustomtimeInput's value & relevant data to parent
        props.handleCustomTime(
            customTime,
            data.utc_offset,
            data.timezone,
        );
    }

    function convertTime(customTimeObj) {
        // Convert prop data from DisplayList to local time

        // If no data from DisplayList, create this object
        if (!customTimeObj || Object.keys(customTimeObj).length === 0) {
            return {
                convertedTime: '00:00'
            };
        }

        let { 
            time,
            utcOffset,
            timezone,
        } = customTimeObj;
        let localUTCOffset = convertToMs(data.utc_offset);
        let externalUTCOffset = convertToMs(utcOffset);
        let externalTimezone = getLocationStrings(timezone);
        let originalTime = time;

        // Convert HH:MM to seconds (relative to 12AM)
        let secondsExternalTime = convertToMs(time);

        // Apply UTC offsets to this time
        let timeUTC = secondsExternalTime + (localUTCOffset - externalUTCOffset);

        // Use this to calculate the new time,
        // Relative to midnight of the local timezone
        let calculatedTime;
        let maxMsInDay =  24*3600*1000;
        let dayResult = "";

        if (timeUTC < 0) {
            // If timeUTC is negative, it's the previous day
            // Subtract it from 12AM to get yesterday's time
            calculatedTime = maxMsInDay - (timeUTC * -1)
            dayResult = 'the previous day'
        } else if (timeUTC >= maxMsInDay) {
            // If time is greater than total # of seconds in one day,
            // Get time from the next day's 12AM
            calculatedTime = timeUTC - maxMsInDay;
            dayResult = 'the next day'
        } else {
            calculatedTime = timeUTC;
        }

        // Now, convert this back to 24H
        let convertedTime = convertToHours(calculatedTime);

        return {
            convertedTime,
            dayResult,
            externalTimezone,
            originalTime
        }
    }

    // If data has been fetched, initialise display components
    if (data && data.datetime) {
        ([displayDay, displayDate, displayTime] = [
            currentTime.split(', ')[0],
            currentTime.split(', ')[1],
            currentTime.split(', ')[2]
        ])
        timezone = getLocationStrings(data.timezone);
        abbr = data.abbreviation;
        utc = data.utc_offset;
        dst = data.dst;
        dstOffset = convertSecsToHHMM(data.dst_offset);


        return (
            <div className="Display">
                <Clock time={displayTime} />
                <DigitalTime time={displayTime} />
                <DeleteButton onClick={handleDelete}/>
                <Timezone timezone={timezone}/>
                <div>
                    <TimezoneAbbr abbr={abbr} />
                    <UTCOffset utc={utc} />
                </div>
                
                <CurrentDate day={displayDay}
                    date={displayDate} />
                <DST dst={dst} offset={dstOffset} />
                <CustomTimeInput
                    handleChange={handleCustomTimeInput}
                    data={convertTime(props.customTimeObj)} />
            </div>
        )
    } else {
        return null;
    }
}

export default Display;