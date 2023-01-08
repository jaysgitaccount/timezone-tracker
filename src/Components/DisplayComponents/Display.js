import { useState, useEffect } from 'react';
import Clock from "./Clock";
import DigitalTime from "./DigitalTime";
import CurrentDate from "./CurrentDate";
import Timezone from "./Timezone"
import DST from "./DST";
import TimezoneAbbr from "./TimezoneAbbr"
import UTCOffset from "./UTCOffset"
import DeleteButton from "./DeleteButton";

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

let sampleData = {
    "abbreviation": "AEDST",
    "client_ip": "180.150.64.176",
    "datetime": "2023-01-06T15:05:39.460749+11:00",
    "day_of_week": 5,
    "day_of_year": 6,
    "dst": true,
    "dst_from": "2022-10-01T16:00:00+00:00",
    "dst_offset": 3600,
    "dst_until": "2023-04-01T16:00:00+00:00",
    "raw_offset": 36000,
    "timezone": "Australiaa/Sydney",
    "unixtime": 1672977939,
    "utc_datetime": "2023-01-06T04:05:39.460749+00:00",
    "utc_offset": "+11:00",
    "week_number": 1
}

let initialState = {};

function Display(props) {
    let url = `http://worldtimeapi.org/api/timezone/${props.timezone}`
    let date;
    let time;
    let timezone;
    let dst;
    let abbr;
    let utc;
    const [data, setData] = useState({});

    function handleDelete() {
        console.log(props.id)
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


    
    // OLD RETURN STATEMENT:

    // return (
    //     <div className="Display">
    //         <DeleteButton onClick={handleDelete}/>
    //         <Timezone timezone={timezone}/>
    //         <div>
    //             <TimezoneAbbr abbr={abbr} />
    //             <UTCOffset utc={utc} />
    //         </div>
    //         <CurrentDate date={date}/>
    //         <Clock time={time} />
    //         <DigitalTime time={time} />
    //         <DST dst={dst} />
    //     </div>
    // )

    /* To avoid errors, check if data is truthy AND has a value
       Otherwise, display will try to render with an empty object
       (which is truthy) */
    if (data && data.datetime) {
        date = data.datetime.substring(0, 10)
        time = data.datetime.substring(11, 19);
        timezone = data.timezone;
        dst = data.dst;
        abbr = data.abbreviation;
        utc = data.utc_offset;

        return (
        <div className="Display">
            <DeleteButton onClick={handleDelete}/>
            <Timezone timezone={timezone}/>
            <div>
                <TimezoneAbbr abbr={abbr} />
                <UTCOffset utc={utc} />
            </div>
            <CurrentDate date={date}/>
            <Clock time={time} />
            <DigitalTime time={time} />
            <DST dst={dst} />
        </div>
        )
    } else {
        return null;
    }
}

export default Display;