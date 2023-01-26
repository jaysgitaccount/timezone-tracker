import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function ListItem(props) {
    const ref = useRef(null);

    useEffect(() => {
        if (props.focus) {
            // We need to set focus so the dropdown list cycling works
            ref.current?.focus();
        }
    }, [props.focus])

    function handleInput(e) {
        props.handleInput(e);
    }
    
    return (
        <motion.li
            ref={ref}
            whileHover={props.whileHover}
            style={ props.focus ? props.whileFocus : '' }
            tabIndex={props.tabIndex}
            role="none"
        >
            <input
                key={props.value}
                type="radio"
                id={props.name}
                value={props.value}
                role={props.role}
                onClick={handleInput}
            />
            <label
                htmlFor={props.value}
                value={props.value}
            >
                {props.name}
            </label>
        </motion.li>
    )
}

export default ListItem;