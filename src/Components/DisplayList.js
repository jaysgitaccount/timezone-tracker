import Display from "./DisplayComponents/Display";
import AddDisplay from "./DisplayComponents/AddDisplay";
import { useEffect, useState } from 'react';
import { LayoutGroup, AnimatePresence, motion } from "framer-motion";

function DisplayList() {
    const [timezones, setTimezones] = useState([]);
    const [allTimezones, setAllTimezones] = useState([]);
    const [dateObj, setDateObj] = useState({});
    const [currentTime, setCurrentTime] = useState(new Date());
    
    // First, fetch full list of timezones
    useEffect(() => {
        fetch('https://worldtimeapi.org/api/timezone/').then(
            result => result.json()
        ).then(
            resultJSON => setAllTimezones(resultJSON)
    )}, []);
    
    // Begin sending time to all displays
    useEffect(() => {
        const timerID = setInterval(() => {
            // Every second, get the current time in UTC
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timerID);
        }
    }, []);

    function handleAdd(timezone) {
        // Store added timezone in state array with unique id
        if (timezone !== '') {
            let newItem = {
                location: timezone,
                id: `${timezone}${Math.round((Math.random()*1000))/100}`
            }
            setTimezones(timezones.concat(newItem));
        }
    }
    
    function handleDelete(id) {
        let newArray = timezones.filter(item =>
            item.id !== id
        )
        setTimezones(newArray);
    }

    function handleInput(date, utcOffset, timezone) {
        // Store data from most recently altered Display input
        setDateObj({
            date,
            utcOffset,
            timezone
        })
    }

    return (
        <div className="DisplayList">
            <LayoutGroup>
                <AnimatePresence>
                    {timezones.map((item) => {
                        return <motion.div
                            key={item.id}
                            className="Display"
                            initial={{opacity:0, transform: 'scale(0%)'}}
                            animate={{opacity:1, transform: 'scale(100%)'}}
                            exit={{opacity:0, transform: 'scale(0%)'}}
                            transition={{duration: 0.3}}
                            layout
                        >
                            <Display
                                    id={item.id}
                                    timezone={item.location}
                                    handleDelete={handleDelete}
                                    handleInput={handleInput}
                                    dateObj={dateObj}
                                    currentTime={currentTime}
                                />
                        </motion.div>
                    })}
                    <motion.div
                        key={'AddDisplay'}
                        className="Display overflow-hidden relative"
                        initial={{opacity:0, transform: 'scale(0%)'}}
                        animate={{opacity:1, transform: 'scale(100%)'}}
                        exit={{opacity:0}}
                        transition={{duration: 0.3}}
                        layout
                    >
                        <AddDisplay
                            handleAdd={handleAdd}
                            timezones={allTimezones}
                        />
                    </motion.div>
                </AnimatePresence>
            </LayoutGroup>
        </div>
    )
}

export default DisplayList;