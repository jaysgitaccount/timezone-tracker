import { useEffect, useState } from "react";

function reformatDate(date) {
    if (date) {
        // Takes a date string DD/MM/YYYY and returns YYYY-MM-DD
        let split = date.split('/');
        let result = `${split[2]}-${split[1]}-${split[0]}`;

        return result;
    }
}

function CustomTimeInput(props) {
    // Receive initial state from date and time of parent
    const [timeInput, setTimeInput] = useState(undefined)
    const [dateInput, setDateInput] = useState(undefined)

    const [label, setLabel] = useState(['Pick a time',''])

    useEffect(() => {
        let data = props.data;

        // If no time conversion received
        if (Object.keys(data).length <= 1) {
            setLabel([
                <>
                Pick a time and date: 
                </>,
                <>
                </>
            ]);
        } else if (props.data) {
            setLabel([
                <>
                When it's <span>{data.originalTime}</span> on <span>{data.originalDay}, {data.originalDate}</span> in <span>{data.originalTimezone}</span>, the time here is
                </>,
                <>
                on <span>{data.convertedDay},</span>
                </>
            ]);
        }
    }, [props.data])

    function handleTimeChange(e) {
        setTimeInput(prev => e.target.value)
        sendDateTime();
    }

    function handleDateChange(e) {
        setDateInput(prev => e.target.value)
        sendDateTime();
    }

    function sendDateTime() {
        // Only send date and time when an input is changed, not on mount
        let date = dateInput === undefined
                    ? props.initDate
                    : dateInput
        let time = timeInput === undefined
                    ? props.initTime
                    : timeInput

        let string = `${date} ${time}`

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
                onChange={handleTimeChange}></input>
            <label htmlFor="date">
                {label[1]}
            </label>
            <input type="date"
                id="date"
                name="date"
                value={reformatDate(props.data.convertedDate)}
                onChange={handleDateChange}></input>
            
        </div>
    )
}

export default CustomTimeInput;