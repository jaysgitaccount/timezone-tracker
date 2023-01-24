import { useEffect, useState } from "react";
import reformatDate from "./Utils/reformatDate";

function CustomTimeInput(props) {
    // Receive initial state from date and time of parent
    const [timeInput, setTimeInput] = useState(props.data.convertedTime)
    const [dateInput, setDateInput] = useState(reformatDate(props.data.convertedDate))
    const [label, setLabel] = useState(['Pick a time',''])

    useEffect(() => {
        let data = props.data;
        
        if (Object.keys(data).length <= 2) {
            // If full object is not received
            setLabel([
                <>
                Pick a time and date to convert: 
                </>,
                <>
                </>
            ]);
        } else if (props.data.convertedDate === undefined || props.data.convertedTime === undefined) {
            // If invalid date/time is entered
            setLabel([
                <>
                Please enter a valid {
                    props.data.convertedDate === undefined
                        ? 'date'
                        : 'time'
                }: 
                </>,
                <>
                </>
            ]);
        } else if (props.data) {
            setLabel([
                <>
                <span>{data.originalTime}</span> on <span>{data.originalDay}, {data.originalDate}</span>
                <br />
                in <span>{data.originalTimezone}</span> would be
                </>,
                <>
                on <span>{data.convertedDay}</span>,
                </>
            ]);
        }
    }, [props.data])

    function handleTimeChange(e) {
        setTimeInput(e.target.value)
        sendDateTime(dateInput, e.target.value);
    }

    function handleDateChange(e) {
        setDateInput(e.target.value)
        sendDateTime(e.target.value, timeInput);
    }

    function sendDateTime(date, time) {
        let string = `${date}T${time}`

        props.handleChange(string);
    }

    return (
        <div className="CustomTimeInput">
            <label htmlFor="time">
                {label[0]}
            </label>
            <input type="time"
                id="time"
                name="time"
                value={props.data.convertedTime}
                onChange={handleTimeChange}
                required></input>
            <label htmlFor="date">
                {label[1]}
            </label>
            <input type="date"
                id="date"
                name="date"
                value={reformatDate(props.data.convertedDate)}
                onChange={handleDateChange}
                required></input>
        </div>
    )
}

export default CustomTimeInput;