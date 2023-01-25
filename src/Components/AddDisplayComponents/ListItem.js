import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function ListItem(props) {
    const ref = useRef(null);

    useEffect(() => {
        if (props.focus) {
            ref.current?.focus();
        }
    }, [props.focus])

    return (
        <motion.li
            ref={ref}
            whileHover={props.whileHover}
            whileFocus={props.whileFocus}
            tabIndex={props.tabIndex}
            role={props.role}
        >
            <input
                key={props.value}
                type="radio"
                id={props.name}
                value={props.value}
                onClick={props.handleInput}
            />
            <label
                htmlFor={props.value}
            >
                {props.name}
            </label>
        </motion.li>
    )
}

export default ListItem;