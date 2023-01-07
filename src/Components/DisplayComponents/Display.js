import React, { useState, useEffect } from 'react';
import Clock from "./Clock";
import DigitalTime from "./DigitalTime";
import CurrentDate from "./CurrentDate";
import Timezone from "./Timezone"
import DST from "./DST";
import TimezoneAbbr from "./TimezoneAbbr"
import UTCOffset from "./UTCOffset"
import DeleteButton from "./DeleteButton";

function Display(props) {
    let url = `http://worldtimeapi.org/api/timezone/${props.timezone}`
    let date;
    let time;
    let timezone;
    let dst;
    let abbr;
    let utc;
    const [data, setData] = useState();

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
    }, []);

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
            <Clock time={time}/>
            <DigitalTime time={time}/>
            <DST dst={dst}/>
        </div>
    )
}

export default Display;