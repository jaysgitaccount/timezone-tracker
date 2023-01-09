import { useEffect, useState } from "react";

function CustomTimeInput(props) {
    const [value, setValue] = useState(undefined);
    const [label, setLabel] = useState(['Pick a time', ''])

    useEffect(() => {
        if (Object.keys(props.data).length == 0) {
            setValue(undefined);
            setLabel(['Pick a time:', '']);
        } else {
            setValue(props.data.convertedTime);
            setLabel([`When it's ${props.data.originalTime} in 
                      ${props.data.externalTimezone}, the time here is`,
                      `${props.data.dayResult}`]);
        }
    }, [props.data])
    
    function handleChange(e) {
        props.handleChange(e.target.value);
    }
    return (
        <div className="CustomTimeInput">
            <label htmlFor="custom-time">{label[0]}</label>
            <input type="time" id="date" name="date"
                   value={value}
                   onChange={handleChange}></input>
            <p>{label[1]}</p>
        </div>
    )
}

export default CustomTimeInput;