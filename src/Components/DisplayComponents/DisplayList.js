import Display from "./Display";
import AddDisplay from "./AddDisplay";
import { useEffect, useState } from 'react';
import { Reorder, AnimatePresence, addScaleCorrector } from "framer-motion";

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
        <Reorder.Group className="DisplayList"
            as="div"
            values={timezones}
        >
            <AnimatePresence>

                {timezones.map( (item) => {
                    return <Reorder.Item key={item.id+item.id} dragListener={false}
                    className="Display" 
                    initial={{opacity:0, transform: 'scale(0%)'}}
                    animate={{opacity:1, transform: 'scale(100%)'}}
                    exit={{opacity:0, transform: 'scale(0%)'}}
                    transition={{duration: 0.3}}>
                        <Display
                                id={item.id}
                                timezone={item.location}
                                handleDelete={handleDelete}
                                handleInput={handleInput}
                                dateObj={dateObj}
                                currentTime={currentTime}
                            />
                    </Reorder.Item>
                })} 

                <Reorder.Item key={'AddDisplay'} dragListener={false}className="Display" 
                        initial={{opacity:0, transform: 'scale(0%)'}}
                        animate={{opacity:1, transform: 'scale(100%)'}}
                        exit={{opacity:0}}
                        transition={{duration: 0.3}}>
                        <AddDisplay
                            handleAdd={handleAdd}
                            timezones={allTimezones}
                        />
                </Reorder.Item>

            </AnimatePresence>
        </Reorder.Group>
    )
}

export default DisplayList;