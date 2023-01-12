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

function getLocationStrings(timezone) {
    let formattedString = timezone.replaceAll('_', ' ');

    let locationArray = [];
    formattedString.split('/').forEach( word => {
        locationArray.push(word);
    })

    let string = "";

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

function convertSecsToHHMM(seconds) {
    let totalMinutes = (seconds - (seconds % 60)) / 60;
    let minutes = totalMinutes % 60;
    let hours = Math.floor(totalMinutes / 60)
    
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutes}`
}

let displayOptions = function(targetTimezone) {
    return {
        timeZone: targetTimezone,
        hour12: false,
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }
}

let inputOptions = function(targetTimezone){
    return {
        timeZone: targetTimezone,
        hour12: false,
        weekday: 'long',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    }
}

function convertDate (string, optionsObj) {
    // Converts a date string based on the options
    // YYYY-MM-DD HH:MM:SS +HH:MM or Day Month Year HH:MM +HH:MM

    let timeMs = Date.parse(string);

    let customDate = new Date(timeMs);

    let convertedDate = customDate.toLocaleString('en-AU', optionsObj);

    return convertedDate;
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
        let convertedTimestamp = currentTimestamp.toLocaleString(
            'en-AU', 
            displayOptions(props.timezone)
        );

        setCurrentTime(convertedTimestamp);
    }, [props.timezone, props.currentTime])

    function handleDelete() {
        props.handleDelete(props.id);
    }

    function handleInput(dateString) {
        // Send CustomtimeInput's value & relevant data to parent
        console.log('dateString ' + dateString)
        props.handleInput(
            dateString,
            data.utc_offset,
            data.timezone,
        );
    }

    function convertTime(dateObj) {
        // Convert prop data from DisplayList to local time

        // If no data from DisplayList, create this object
        if (!dateObj || Object.keys(dateObj).length === 0) {
            return {
                convertedTime: '00:00',
            };
        }

        let { 
            date,
            utcOffset,
            timezone,
        } = dateObj;

        let localTimezone = props.timezone;
        let externalDate = `${date} ${utcOffset}`

        // Extract and format information for display
        let [originalDay, originalDate, originalTime] = convertDate(externalDate, inputOptions(timezone)).split(', ');
        let originalTimezone = getLocationStrings(timezone);

        let convertedDateTime = convertDate(externalDate, inputOptions(localTimezone));

        let [convertedDay, convertedDate, convertedTime] = convertedDateTime.split(', ');

        return {
            convertedDay,
            convertedTime,
            convertedDate,
            originalTimezone,
            originalDay,
            originalDate,
            originalTime,
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
                    initTime={displayTime}
                    initDate={displayDate}
                    handleChange={handleInput}
                    data={convertTime(props.dateObj)} />
            </div>
        )
    } else {
        return null;
    }
}

export default Display;