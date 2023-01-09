function AddDisplay(props) {
    function handleChange(e) {
        props.handleAdd(e.target.value);
    }

    return (
        <div className="Display">
            <label htmlFor="timezone-select">Select timezone:</label>
            <select name="timezone-select" id="timezone-select" onChange={handleChange}>
                <option value=""></option>
                {
                    props.timezones.map( (item, index) =>
                        <option key={`${item}${index}`} value={item}>{item}</option>
                    )
                }
            </select>
        </div>
    )
}

export default AddDisplay;