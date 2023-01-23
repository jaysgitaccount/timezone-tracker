import getLocationStrings from "./Utils/getLocationStrings";

function AddDisplay(props) {
    function handleChange(e) {
        props.handleAdd(e.target.value);
    }

    function handleSearch(e) {
        if(props.timezones.includes(e.target.value)) {
            handleChange(e);
            // Clear field after adding
            e.target.value = '';
        }
    }

    return (
        <>    
            <label htmlFor="timezone-search">Search timezones:</label>
            <input list="timezone-search-list" name="timezone-search" id="timezone-search" onChange={handleSearch}></input>

            <datalist id="timezone-search-list">
                {props.timezones.map( (item, index) =>
                        <option key={`${item}${index}`} value={item}>{getLocationStrings(item)}</option>
                    )}
            </datalist>
        </>
    )
}

export default AddDisplay;