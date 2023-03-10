import { useRef, useEffect, useState, useCallback } from "react";
import getLocationStrings from "../../Utils/getLocationStrings";
import Combobox from "./Combobox";

function AddDisplay(props) {
    // Array with current filtered entries from timezoneValues
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    // Array from object with value:name pairs
    const timezoneValues = useRef([]);


    const handleSubmit = useCallback((value) => {
        props.handleAdd(value);
    }, [props])

    // After receiving full list of timezones, set up values
    useEffect(() => {
        let timezonePairs = {};
        props.timezones.forEach(item => {
            timezonePairs[item] = getLocationStrings(item);
        });
        // Convert object to array and store in ref
        timezoneValues.current = Object.entries(timezonePairs);
    }, [props.timezones])

    // Then initialise filteredOptions
    useEffect(() => {
        setFilteredOptions(timezoneValues.current);
    }, [props.timezones])
    
    // When search value changes, show filters based on input
    useEffect(() => {
        if (searchValue.length > 0) {
            let lowercaseValue = searchValue.toLocaleLowerCase();
            // If there is any input, search 
            let allPossibleMatches = timezoneValues.current;

            // Check both value and name for matches
            // In case input is "Sydney, Austr..."
            let matches = allPossibleMatches.filter(([value, name]) => 
                value.toLocaleLowerCase().includes(lowercaseValue) || name.toLocaleLowerCase().includes(lowercaseValue)
            )

            setFilteredOptions(matches);
        } else if (searchValue.length === 0) {
            // If search field is empty
            setFilteredOptions(timezoneValues.current);
        }
    }, [searchValue])

    // On search input, check for matches
    useEffect(() => {
        let lowercaseValue = searchValue.toLocaleLowerCase();
        let allPossibleMatches = timezoneValues.current;

        // Check both value and name for matches
        // In case input is "Sydney, Austr..."
        let match = allPossibleMatches.filter(([value, name]) => 
            value.toLocaleLowerCase() === lowercaseValue || name.toLocaleLowerCase() === lowercaseValue
        )

        if (match.length > 0) {
            // Get value from array item
            let value = match[0][0];
            handleSubmit(value);
            // Clear input
            setSearchValue('');
        }
    }, [searchValue, handleSubmit])

    function handleEnter(focusedIndex) {
        // Receive index from pressing enter on focused list item, set state
        let submittedValue = filteredOptions[focusedIndex][0];
        setSearchValue(submittedValue);
    }

    function handleSearch(e) {
        // Receive search input event, set state
        setSearchValue(e.target.value);
    }

    function handleInput(e) {
        // Receive click event, set state
        setSearchValue(e.target.value);
    }

    function clearSearchValue() {
        // Pressing ESC clears search value
        setSearchValue('');
    }
    
    return (
        <Combobox
            handleSearch={handleSearch}
            handleInput={handleInput}
            handleEnter={handleEnter}
            clearSearchValue={clearSearchValue}
            searchValue={searchValue}
            filteredOptions={filteredOptions}
        />
    )
}

export default AddDisplay;