import { useRef, useEffect, useState } from "react";
import getLocationStrings from "./Utils/getLocationStrings";
import { motion } from "framer-motion";

function AddDisplay(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const searchbar = useRef(null);
    // Takes list of options as props
    // Add to dropdown ul as li
    // Returns functional custom search input with autocomplete dropdown
    // Features: prompts keyboard on mobile, shows dropdown list, can click on dropdown to submit or finish typing to submit
    // On click, shows dropdown list
    // On type, begins filtering according to substring
    // There's already list options available, can I feed them into here
    // I think I can use input but NOT datalist as it is broken on Firefox Android

    // When state isOpen, flip arrow & show menu. If !isOpen, reverse arrow/close

    useEffect(() => {
        setFilteredOptions(props.timezones);
    }, [props.timezones])

    useEffect(() => {
        let timerId;

        if (isFocused) {
            setIsOpen(true);
        } else if (!isFocused) {
            timerId = setTimeout(() => {
                setIsOpen(false)
            }, 100)
        }

        return () => {
            clearTimeout(timerId);
        }
    }, [isFocused])

    function handleFocusIn(event) {
        setIsFocused(true);
        console.log("handle focus in")
    }

    function handleFocusOut(e) {
        console.log("handle focus out")
        console.log(e);
        setIsFocused(false);
    }

    function handleSubmit(value) {
        props.handleAdd(value);
    }

    function handleSearch(e) {
        // User types into bar, search list for matches
        console.log(e)
        let value = e.target.value;

        let filteredArray = props.timezones.filter( item => {
            if (item.includes(value)) {
                return item;
            }
        })
        setFilteredOptions(filteredArray);

        // If bar value is an option on the list, submit
        if (props.timezones.includes(value)) {
            // Reset fields after submitting
            handleSubmit(value);
            searchbar.value = "";
            setFilteredOptions(props.timezones);
        }
    }

    function handleInput(event) {
        handleSearch(event);
    }

    return (
        <>
            <label htmlFor="timezone-search">Search timezones:</label>
            <div className="search-wrapper">
                <motion.input
                    ref={searchbar}
                    type="text"
                    className="search"
                    onFocus={handleFocusIn}
                    onBlur={handleFocusOut}
                    onChange={handleSearch}
                    style={{
                        backgroundColor: isOpen ? 'var(--pale-green)' : 'none'
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
                {filteredOptions.map((item) =>
                    <li key={item}>
                        <input
                            key={item}
                            type="radio"
                            id={item}
                            value={item}
                            onClick={handleInput} />
                        <label htmlFor={item}>{getLocationStrings(item)}</label>
                    </li>
                )}
            </motion.ul>
        </>
    )
}

export default AddDisplay;