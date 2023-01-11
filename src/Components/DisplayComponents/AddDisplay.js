function AddDisplay(props) {
    function handleChange(e) {
        props.handleAdd(e.target.value);
    }
    
    // Format names for option list
    function getLocationStrings(timezone) {
        let formattedString = timezone.replaceAll('_', ' ');
        let locationArray = [];
        
        formattedString.split('/').forEach( word => {
            locationArray.push(word);
        })
    
        let string = "";
    
        locationArray.forEach( (word, index) => {
            if (index === 0) {
                string += word;
            } else {
                string += ', ';
                string += word;
            }
        })
    
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