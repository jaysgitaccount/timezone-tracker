import Display from "./Display";
import AddDisplay from "./AddDisplay";
import { useEffect, useState } from 'react';

function DisplayList(props) {
    const [timezones, setTimezones] = useState([]);
    const [allTimezones, setAllTimezones] = useState([]);
    const [secondsTimer, setSecondsTimer] = useState(0);
    const [customTimeObj, setCustomTimeObj] = useState({});

    // First, fetch full list of timezones
    useEffect(() => {
        fetch('http://worldtimeapi.org/api/timezone/').then(
            result => result.json()
        ).then(
            resultJSON => setAllTimezones(resultJSON)
    )}, []);
    
    // Then, begin ticking seconds (unified across displays)
    useEffect(() => {
        const timerID = setInterval(() => {
            setSecondsTimer((prev) => prev + 1)
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

    function handleCustomTime(time, utcOffset, timezone) {
        // Receive data from most recently altered input
        // To unify across all Displays
        setCustomTimeObj({
            time,
            utcOffset,
            timezone
        })
    }

    return (
        <div className="DisplayList">
            {timezones.map( item => {
                return <Display
                    id={item.id}
                    key={item.id}
                    timezone={item.location}
                    handleDelete={handleDelete}
                    secondsTimer={secondsTimer}
                    handleCustomTime={handleCustomTime}
                    customTimeObj={customTimeObj} />
                }
            )}
            <AddDisplay handleAdd={handleAdd} timezones={allTimezones} />
        </div>
    )
}

export default DisplayList;