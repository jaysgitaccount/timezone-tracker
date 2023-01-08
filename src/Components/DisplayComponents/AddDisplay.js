function AddDisplay(props) {
    // Fetch list of timezones
    // Add timezones as <option>s
    function handleChange(e) {
        props.handleAdd(e.target.value);
    }

    return (
        <div className="Display">
            <label htmlFor="timezone-select">Select timezone:</label>
            <select name="timezone-select" id="timezone-select" onChange={handleChange}>
                <option value=""></option>
                <option value="Australia/Sydney">Australia/Sydney</option>
                <option value="America/Mexico_City">America/Mexico_City</option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
                <option value="Europe/Madrid">Europe/Madrid</option>

            </select>
        </div>
    )
}

export default AddDisplay;