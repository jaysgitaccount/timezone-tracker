import { useRef, useEffect, useState, useCallback } from "react";
import getLocationStrings from "./Utils/getLocationStrings";
import { LayoutGroup, motion } from "framer-motion";

// const cornerVariants = {
//     initial: {
//         borderR
//     }
// }

function AddDisplay(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const timezoneValues = useRef({});
    const dropdown = useRef(null)

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
    }, [timezoneValues.current])
    
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
            }, 150)
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
        console.log(e)
    }

    return (
        <>
            <div className="label-wrapper">
                <label htmlFor="timezone-search">Search timezones</label>
                <motion.span
                        className="arrow"
                        animate={{
                            rotate: isOpen ? 180 : 0,
                        }}
                        transition={{ type: 'spring', mass: 2}}
                ></motion.span>
            </div>
            <LayoutGroup>
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
                            outline: 'none',
                            borderColor: isFocused ? 'var(--main-color)' : 'var(--mustard-yellow)',
                            backgroundColor: isOpen ? 'var(--mustard-yellow)' : '',
                            borderBottomLeftRadius: isOpen ? '0px' : 'var(--border-radius-L)',
                            borderBottomRightRadius: isOpen ? '0px' : 'var(--border-radius-L)',
                        }}
                    />
                </div>
                
                <motion.div
                    className="dropdown-wrapper"
                    animate={{
                        height: isOpen ? 200 : 0,
                        opacity: isOpen ? 1 : 0,
                        borderRadius: 'var(--border-radius-L)',
                        borderTopLeftRadius: '0px',
                        borderTopRightRadius: '0px',
                    }}
                    style={{
                        border: isOpen ? '2px solid var(--main-color)' : ''
                    }}
                >
                    <motion.ul
                        className="dropdown"
                        style={{ display: isOpen ? 'block' : 'none'}}
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
                </motion.div>
            </LayoutGroup>
        </>
        
    )
}

export default AddDisplay;

                {/* <motion.span
                    className="arrow"
                    animate={{ 
                        rotate: isOpen ? 180 : 0,
                        opacity: isOpen ? 1 : 0,
                    }}
                ></motion.span> */}