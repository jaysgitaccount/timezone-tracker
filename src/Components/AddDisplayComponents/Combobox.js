import { useRef, useState, useEffect } from "react";
import { LayoutGroup, motion } from "framer-motion";
import ListItem from "./ListItem";
import useCyclingFocus from "../../Hooks/useCyclingFocus";

function Combobox(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const listRef = useRef(null);
    const [focusedIndex] = useCyclingFocus(listRef.current, props.filteredOptions.length);
    const searchRef = useRef(null);

    // On focus change, trigger menu open/close
    useEffect(() => {
        if (isFocused) {
            setIsOpen(true);
        } else if (!isFocused) {
            setIsOpen(false)
        }
    }, [isFocused])

    function handleFocusIn() {
        setIsFocused(true);
    }

    function handleFocusOut() {
        setIsFocused(false);
    }

    function handleSearch(e) {
        // Receive search event, send to parent
        props.handleSearch(e);
    }

    function handleInput(e) {
        // Receive list item event, send to parent, close menu
        props.handleInput(e);
        setIsOpen(false);
    }

    function focusSearchRef() {
        // Set focus to search bar so user can type
        searchRef.current.focus();
    }

    function handleKeyPress(e) {
        const ENTER_KEY_CODE = 13;
        const ESCAPE_KEY_CODE = 27;

        switch (e.keyCode) {
            case ENTER_KEY_CODE:
                // Submit focused input value 
                props.handleEnter(focusedIndex);
                break;
            case ESCAPE_KEY_CODE:
                // Clear searchValue
                props.clearSearchValue();
                break;
            default:
                // If user types, focus search input
                focusSearchRef();
                return;
        }
    }

    return (
        <div
            ref={listRef}
            onFocus={handleFocusIn}
            onBlur={handleFocusOut}
            onKeyDown={handleKeyPress}
        >
            <div className="label-wrapper">
                <label htmlFor="timezone-search">
                    Search timezones
                </label>
                <motion.span
                    className="arrow"
                    animate={{
                        rotate: isOpen ? 180 : 0,
                    }}
                    transition={{ type: 'spring', mass: 0.4 }}
                ></motion.span>
            </div>
            <LayoutGroup>
                <div className="search-wrapper">
                    <motion.input
                        id="timezone-search"
                        type="search"
                        className="search"
                        ref={searchRef}
                        autoComplete="off"
                        value={props.searchValue}
                        onChange={handleSearch}
                        style={{
                            outline: 'none',
                            borderColor: isFocused ? 'var(--main-color)' : 'var(--mustard-yellow)',
                            backgroundColor: isOpen ? 'var(--mustard-yellow)' : '',
                            borderBottomLeftRadius: isOpen ? '0px' : 'var(--border-radius-L)',
                            borderBottomRightRadius: isOpen ? '0px' : 'var(--border-radius-L)',
                        }}
                        tabIndex={0}
                        role="combobox"
                        aria-autocomplete="list"
                        aria-controls="dropdown"
                        aria-expanded={ isOpen ? 'true' : 'false' }
                        aria-activedescendant={
                            props.filteredOptions[focusedIndex]
                                ? props.filteredOptions[focusedIndex][1]
                                : ''
                        }
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
                    role="none"
                    tabIndex='-1'
                >
                    <motion.ul
                        id="dropdown"
                        className="dropdown"
                        style={{ display: isOpen ? 'block' : 'none'}}
                        role="listbox"
                        aria-label="dropdown"
                        tabIndex='-1'
                    >
                        {props.filteredOptions.map(
                            ([value, name], i) =>
                                <ListItem
                                    key={value}
                                    value={value}
                                    name={name}
                                    handleInput={handleInput}
                                    whileHover={{
                                        backgroundColor: 'var(--mustard-yellow)',
                                        outline: '1px solid var(--light-brown)'
                                    }}
                                    whileFocus={{
                                        backgroundColor: 'var(--mustard-yellow)',
                                        outline: '1px solid var(--light-brown)'
                                    }}
                                    tabIndex='-1'
                                    role="option"
                                    focus={focusedIndex === i}
                                >
                                </ListItem>
                        )}
                    </motion.ul>
                </motion.div>
            </LayoutGroup>
        </div>
    )
}

export default Combobox;