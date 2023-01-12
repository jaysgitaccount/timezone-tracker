import Display from "./Display";
import AddDisplay from "./AddDisplay";
import { useEffect, useState } from 'react';

function DisplayList(props) {
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
            {timezones.map( item => {
                return <Display
                    id={item.id}
                    key={item.id}
                    timezone={item.location}
                    handleDelete={handleDelete}
                    handleInput={handleInput}
                    dateObj={dateObj}
                    currentTime={currentTime} />
                }
            )}
            <AddDisplay handleAdd={handleAdd} timezones={allTimezones} />
        </div>
    )
}

export default DisplayList;