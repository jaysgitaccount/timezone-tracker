import Clock from "./Clock";
import DigitalTime from "./DigitalTime";
import CurrentDate from "./CurrentDate";
import Timezone from "./Timezone"
import DST from "./DST";
import TimezoneAbbr from "./TimezoneAbbr"
import UTCOffset from "./UTCOffset"

let sampleData = {
    "abbreviation": "AEDT",
    "client_ip": "180.150.64.176",
    "datetime": "2023-01-05T19:07:56.567716+11:00",
    "day_of_week": 4,
    "day_of_year": 5,
    "dst": true,
    "dst_from": "2022-10-01T16:00:00+00:00",
    "dst_offset": 3600,
    "dst_until": "2023-04-01T16:00:00+00:00",
    "raw_offset": 36000,
    "timezone": "Australia/Sydney",
    "unixtime": 1672906076,
    "utc_datetime": "2023-01-05T08:07:56.567716+00:00",
    "utc_offset": "+11:00",
    "week_number": 1
  }

function Display(props) {
    let data = sampleData;

    let date = data.datetime.substring(0, 10)
    let time = data.datetime.substring(11, 19);
    let timezone = data.timezone;
    let dst = data.dst;
    let abbr = data.abbreviation;
    let utc = data.utc_offset;

    return (
        <article className="Display">
            <Timezone timezone={timezone}/>
            <div>
                <TimezoneAbbr abbr={abbr} />
                <UTCOffset utc={utc} />
            </div>
            <CurrentDate date={date}/>
            <Clock time={time}/>
            <DigitalTime time={time}/>
            <DST dst={dst}/>
        </article>
    )
}

export default Display;