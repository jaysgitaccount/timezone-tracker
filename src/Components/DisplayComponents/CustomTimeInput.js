import { useEffect, useState } from "react";

function CustomTimeInput(props) {
    const [label, setLabel] = useState(['Pick a time',''])

    useEffect(() => {
        let data = props.data;

        // If no time conversion received
        if (Object.keys(data).length <= 1) {
            setLabel([
                <>
                Pick a time: 
                </>,
                <>
                </>
            ]);
        } else {
            setLabel([
                <>
                When it's <span>{data.originalTime}</span> in <span>{data.externalTimezone}</span>, the time here is
                </>,
                <>
                {data.dayResult}
                </>
            ]);
        }
    }, [props.data])

    function handleChange(e) {
        props.handleChange(e.target.value);
    }

    return (
        <div className="CustomTimeInput">
            <label htmlFor="custom-time">
                {label[0]}
            </label>
            <input type="time"
                id="date"
                name="date"
                value={props.data.convertedTime}
                onChange={handleChange}></input>
            <div className="day-result">
                {label[1]}
            </div>
        </div>
    )
}

export default CustomTimeInput;