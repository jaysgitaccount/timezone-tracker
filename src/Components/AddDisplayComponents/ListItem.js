import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function ListItem(props) {
    const ref = useRef(null);

    useEffect(() => {
        if (props.focus) {
            ref.current?.focus();
        }
    }, [props.focus])

    function handleInput(e) {
        props.handleInput(e.target.value);
    }
    
    return (
        <motion.li
            ref={ref}
            whileHover={props.whileHover}
            whileFocus={props.whileFocus}
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
                role="none"
                
            >
                {props.name}
            </label>
        </motion.li>
    )
}

export default ListItem;