import { useEffect, useState } from "react";

function CustomTimeInput(props) {
    const [value, setValue] = useState(props.data);
    const [label, setLabel] = useState(['Pick a time','', ''])

    useEffect(() => {
        if (Object.keys(props.data).length <= 1) {
            // If no time conversion, use initial values
            setValue(props.data.initialValue)
            setLabel(['Pick a time:', '', '']);
        } else {
            setValue(props.data.convertedTime);
            setLabel([
                props.data.originalTime,
                props.data.externalTimezone,
                props.data.dayResult
            ]);
        }
    }, [props.data])
    
    function handleChange(e) {
        props.handleChange(e.target.value);
    }
    return (
        <div className="CustomTimeInput">
            <label htmlFor="custom-time">
                    When it's <span>{label[0]}</span> in <span>{label[1]}</span>, the time here is
            </label>
            <input type="time" id="date" name="date"
                   value={value}
                   onChange={handleChange}></input>
            <div className="day-result">
                <p>{label[2]}</p>
            </div>
        </div>
    )
}

export default CustomTimeInput;