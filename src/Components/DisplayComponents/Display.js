import { useState, useEffect } from 'react';
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
    const [data, setData] = useState({});

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