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

        locationArray.reverse();
        
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

    function handleSearch(e) {
        if(props.timezones.includes(e.target.value)) {
            handleChange(e);
            // Clear field after adding
            e.target.value = '';
        }
    }

    return (
        <div className="Display">    
            <label htmlFor="timezone-search">Search timezones:</label>
            <input list="timezone-search-list" name="timezone-search" id="timezone-search" onChange={handleSearch}></input>

            <datalist id="timezone-search-list">
                {props.timezones.map( (item, index) =>
                        <option key={`${item}${index}`} value={item}>{getLocationStrings(item)}</option>
                    )}
            </datalist>
        </div>
    )
}

export default AddDisplay;