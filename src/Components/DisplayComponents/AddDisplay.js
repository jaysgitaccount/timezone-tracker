function AddDisplay(props) {
    function handleChange(e) {
        props.handleAdd(e.target.value);
    }
    
/* Reformat timezone location for display */
function getLocationStrings(timezone) {
    let formattedString = timezone.replaceAll('_', ' ');
    let [region3, region2, region1] = formattedString.split('/');

    // Account for how some locations have 3 parts and others have 2
    let string = "";
    if (region1 !== undefined) {
        string += `${region1}, `
    }
    if (region2 !== undefined) {
        string += `${region2}`
    }
    if (region3 !== undefined) {
        string += `, ${region3}`
    }

    return string;
}

    return (
        <div className="Display">
            <label htmlFor="timezone-select">Select timezone:</label>
            <select name="timezone-select" id="timezone-select" onChange={handleChange}>
                <option value=""></option>
                {
                    props.timezones.map( (item, index) =>
                        <option key={`${item}${index}`} value={item}>{getLocationStrings(item)}</option>
                    )
                }
            </select>
        </div>
    )
}

export default AddDisplay;