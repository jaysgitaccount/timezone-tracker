import { useState, useEffect } from 'react';
import Clock from "./Clock";
import DigitalTime from "./DigitalTime";
import CurrentDate from "./CurrentDate";
import Timezone from "./Timezone"
import DST from "./DST";
import TimezoneAbbr from "./TimezoneAbbr"
import UTCOffset from "./UTCOffset"
import DeleteButton from "./DeleteButton";

/* Take in epoch time state and return strings for display */
function extractStrings(timeState) {
    let datetime = new Date(timeState);
    
    let [day, date] = [
        datetime.toDateString().substring(0, 3),
        datetime.toDateString().substring(4)
    ]
    let time = datetime.toTimeString().split(' ')[0];
    return [day, date, time];
}

function Display(props) {
    let url = `http://worldtimeapi.org/api/timezone/${props.timezone}`

    const [data, setData] = useState({});
    const [currentTime, setCurrentTime] = useState('');

    function handleDelete() {
        props.handleDelete(props.id);
    }

    useEffect(() => {
        if (props.timezone) {
            fetch(url).then(
                result => result.json()
            ).then(
                resultJSON => setData(resultJSON)
            )
        }
    }, [props.timezone, url]);

    useEffect(()=> {
        // After data is fetched, set epoch time state
        let currentDateTime = new Date(Date.parse(data.datetime));
        setCurrentTime(currentDateTime.getTime())
    }, [data])

    // Tick seconds on every parent update
    useEffect(() => {
        setCurrentTime(currentTime => currentTime + 1000);
    }, [props.secondsTimer]);

    /* To avoid errors, check if data is truthy AND has a value
       Otherwise, display will try to render with an empty object
       (which is truthy) */
    if (data && data.datetime) {
        let dayDateTime = extractStrings(currentTime);
        let [displayDay, displayDate, displayTime] = [
            dayDateTime[0],
            dayDateTime[1],
            dayDateTime[2]
        ]
        let timezone = data.timezone;
        let dst = data.dst;
        let abbr = data.abbreviation;
        let utc = data.utc_offset;
        return (
            <div className="Display">
                <DeleteButton onClick={handleDelete}/>
                <Timezone timezone={timezone}/>
                <div>
                    <TimezoneAbbr abbr={abbr} />
                    <UTCOffset utc={utc} />
                </div>
                <DST dst={dst} />
                <Clock time={displayTime} />
                <DigitalTime time={displayTime} />
                <CurrentDate day={displayDay} date={displayDate}/>

            </div>
        )
    } else {
        return null;
    }
}

export default Display;