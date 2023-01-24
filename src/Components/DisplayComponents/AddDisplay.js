import { useRef, useEffect, useState, useCallback } from "react";
import getLocationStrings from "./Utils/getLocationStrings";
import { motion } from "framer-motion";

function AddDisplay(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const timezoneValues = useRef({});

    const handleSubmit = useCallback((value) => {
        props.handleAdd(value);
    }, [props])

    // After receiving full list of timezones, set up values
    useEffect(() => {
        // Ideally this means you only have to do the string calculations once, at the start
        let timezonePairs = {};
        props.timezones.forEach(item => {
            timezonePairs[item] = getLocationStrings(item);
        });
        timezoneValues.current = timezonePairs;
    }, [props.timezones])

    // Then initialise filteredOptions
    useEffect(() => {
        setFilteredOptions(timezoneValues.current);
    }, [timezoneValues])
    
    // When search value changes, show filters based on input
    useEffect(() => {
        if (searchValue.length > 0) {
            // If there is any input, search 
            let allPossibleMatches = Object.entries(timezoneValues.current);

            // Check both value and name for matches
            // In case input is "Sydney, Austr..."
            let matches = allPossibleMatches.filter(([value, name]) => 
                value.includes(searchValue) || name.includes(searchValue)
            )

            setFilteredOptions(Object.fromEntries(matches));
        } else if (searchValue.length === 0) {
            // If search field is empty
            setFilteredOptions(timezoneValues.current);
        }
    }, [searchValue])

    // On search input, check for matches
    useEffect(() => {
        let allPossibleMatches = Object.entries(timezoneValues.current);

        // Check both value and name for matches
        // In case input is "Sydney, Austr..."
        let match = allPossibleMatches.filter(([value, name]) => 
            value === searchValue || name === searchValue
        )

        if (match.length > 0) {
            let value = match[0][0];
            handleSubmit(value);
            // Clear input
            setSearchValue('');
        }
    }, [searchValue, handleSubmit])

    // On focus, trigger menu change
    useEffect(() => {
        let timerId;

        if (isFocused) {
            setIsOpen(true);
        } else if (!isFocused) {
            // If no delay, input won't send
            timerId = setTimeout(() => {
                setIsOpen(false)
            }, 100)
        }

        return () => {
            clearTimeout(timerId);
        }
    }, [isFocused])

    function handleFocusIn(e) {
        setIsFocused(true);
    }

    function handleFocusOut(e) {
        setIsFocused(false);
    }

    function handleSearch(e) {
        // Store input as state
        setSearchValue(e.target.value);
    }

    function handleInput(e) {
        handleSearch(e);
    }

    return (
        <>
            <label htmlFor="timezone-search">Search timezones:</label>
            <div className="search-wrapper">
                <motion.input
                    type="search"
                    className="search"
                    autoComplete="off"
                    value={searchValue}
                    onFocus={handleFocusIn}
                    onBlur={handleFocusOut}
                    onChange={handleSearch}
                    style={{
                        backgroundColor: isOpen ? 'var(--pale-green)' : ''
                    }}
                />
                <motion.span
                    className="arrow"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                ></motion.span>
            </div>
            <motion.ul
                className="dropdown"
                animate={{ height: isOpen ? 270 : 0 }}
            >
                {
                    Object.entries(filteredOptions).map(([value, name]) =>
                        <li key={value}>
                            <input
                                key={value}
                                type="radio"
                                id={value}
                                value={value}
                                onClick={handleInput} />
                            <label htmlFor={value}>{name}</label>
                        </li>
                    )
                }
            </motion.ul>
        </>
    )
}

export default AddDisplay;