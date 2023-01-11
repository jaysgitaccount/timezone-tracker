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
    let [region3, region2, region1] = formattedString.split('/');

    // Account for how some locations have 3 parts and others have 2
    let string = "";
    if (region1 !== undefined) {
        string += `${region1}, `
    }
    if (region2 !== undefined) {
        string += `${region2}`
    }
    if (region3 !== undefined) {
        string += `, ${region3}`
    }

    return string;
}

function convertToSeconds(customTime) {
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
    let seconds = (hours * 60 * 60) + (minutes * 60);

    return Number(`${prefix}${seconds}`);
}

function convertToHours(secondsTime) {
    // We don't need seconds, so we're discarding them
    let totalMinutes = (secondsTime - (secondsTime % 60)) / 60;
    let minutes = totalMinutes % 60;
    let hours = Math.floor(totalMinutes / 60)
    
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutes}`
}

function Display(props) {
    let url = `https://worldtimeapi.org/api/timezone/${props.timezone}`

    const [data, setData] = useState({});
    const [currentTime, setCurrentTime] = useState('');

    // Fetch data and store in state
    useEffect(() => {
        fetch(url).then(
            result => result.json()
        ).then(
            resultJSON => setData(resultJSON)
        )
    }, [props.timezone, url]);

    // After data is fetched, extract epoch time as state
    useEffect(()=> {
        if (Object.keys(data).length > 0) {
            let isoTime = data.datetime.substring(0,19);
            let currentDateTime = new Date(isoTime);
            setCurrentTime(currentDateTime.getTime())
        }
    }, [data])

    // Tick seconds on every parent update
    useEffect(() => {
        setCurrentTime(currentTime => currentTime + 1000);
    }, [props.secondsTimer]);

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
        let localUTCOffset = convertToSeconds(data.utc_offset);
        let externalUTCOffset = convertToSeconds(utcOffset);
        let externalTimezone = getLocationStrings(timezone);
        let originalTime = time;

        // Convert HH:MM to seconds (relative to 12AM)
        let secondsExternalTime = convertToSeconds(time);

        // Apply UTC offsets to this time
        let timeUTC = secondsExternalTime + (localUTCOffset - externalUTCOffset);

        // Use this to calculate the new time,
        // Relative to midnight of the local timezone
        let calculatedTime;
        let maxSecsInDay =  24*3600;
        let dayResult = "";

        if (timeUTC < 0) {
            // If timeUTC is negative, it's the previous day
            // Subtract it from 12AM to get yesterday's time
            calculatedTime = maxSecsInDay - (timeUTC * -1)
            dayResult = 'the previous day'
        } else if (timeUTC >= maxSecsInDay) {
            // If time is greater than total # of seconds in one day,
            // Get time from the next day's 12AM
            calculatedTime = timeUTC - maxSecsInDay;
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
        let dayDateTime = getTimeStrings(currentTime);
        let [displayDay, displayDate, displayTime] = [
            dayDateTime[0],
            dayDateTime[1],
            dayDateTime[2]
        ]
        let timezone = getLocationStrings(data.timezone);
        let dst = data.dst;
        let dstOffset = convertToHours(data.dst_offset);
        let abbr = data.abbreviation;
        let utc = data.utc_offset;
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