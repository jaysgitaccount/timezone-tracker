function AddDisplay(props) {
    function handleChange(e) {
        props.handleAdd(e.target.value);
    }

    /* Reformat timezone location for display */
    function getLocationStrings(timezone) {
        let formattedString = timezone.replaceAll('_', ' ');
        let [country, city] = formattedString.split('/');

        let string = "";
        if (city !== undefined) {
            string += `${city}, `
        }
        if (country !== undefined) {
            string += `${country}`
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