import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function ListItem(props) {
    const ref = useRef(null);

    useEffect(() => {
        if (props.focus) {
            // Set focus so the dropdown list cycling works
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
            <button
                key={props.value}
                type="button"
                id={props.name}
                value={props.value}
                role={props.role}
                onClick={handleInput}
            >
                {props.name}
            </button>
        </motion.li>
    )
}

export default ListItem;