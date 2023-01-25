import { useState, useEffect } from 'react';
import getLocationStrings from '../../Utils/getLocationStrings';
import convertDate from '../../Utils/convertDate';
import convertSecsToHHMM from '../../Utils/convertSecsToHHMM';

import Clock from "./Clock";
import DigitalTime from "./DigitalTime";
import CurrentDate from "./CurrentDate";
import Timezone from "./Timezone"
import DST from "./DST";
import TimezoneAbbr from "./TimezoneAbbr"
import UTCOffset from "./UTCOffset"
import DeleteButton from "./DeleteButton";
import CustomTimeInput from './CustomTimeInput';

let displayOptions = function(targetTimezone) {
    return {
        timeZone: targetTimezone,
        hourCycle: 'h23',
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
        hourCycle: 'h23',
        weekday: 'long',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
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

    useEffect(() => {
        fetch(url).then(
            result => result.json()
        ).then(
            // Store data in state
            resultJSON => setData(resultJSON)
        )
    }, [props.timezone, url]);

    
    useEffect(() => {
        // To standardise time ticking, convert time from parent
        let convertedTimestamp = convertDate(props.currentTime, displayOptions(props.timezone))

        setCurrentTime(convertedTimestamp);
    }, [props.timezone, props.currentTime])

    function handleDelete() {
        props.handleDelete(props.id);
    }

    function handleInput(dateString) {
        // Send CustomtimeInput's value & relevant data to parent
        props.handleInput(
            dateString,
            data.utc_offset,
            data.timezone,
        );
    }

    /**
     * @param {object} dateObj received from parent, contains the most recently updated Display's time/date input
     * @returns Object with data for CustomTimeInput to display
     */
    function convertTime(dateObj) {
        // If no data from DisplayList, create this object
        if (!dateObj || Object.keys(dateObj).length === 0) {
            // If we have initial date/time, use those.
            let initialDateTime = data.datetime;
            let convertedInitDate = convertDate(initialDateTime, inputOptions(props.timezone)).split(', ');

            let date = convertedInitDate[1];
            let time = convertedInitDate[2];

            return {
                // Initialise the value of the controlled components
                convertedTime: time,
                convertedDate: date
            };
        }

        let { 
            date,
            utcOffset,
            timezone,
        } = dateObj;

        let localTimezone = props.timezone;
        let externalDate = `${date}${utcOffset}`

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

    if (data && data.datetime) {
        // If data has been fetched, initialise display components
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
            <>
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
            </>
        )
    } else {
        return (
            // Show loader
            <>
                <div className='loader'></div>
            </>
        )
    }
}

export default Display;