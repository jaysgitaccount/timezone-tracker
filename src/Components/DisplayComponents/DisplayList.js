import Display from "./Display";
import AddDisplay from "./AddDisplay";
import { useEffect, useState } from 'react';

function DisplayList(props) {
    const [timezones, setTimezones] = useState([]);
    const [allTimezones, setAllTimezones] = useState([]);
    const [secondsTimer, setSecondsTimer] = useState(0);

    useEffect(() => {
        fetch('http://worldtimeapi.org/api/timezone/').then(
            result => result.json()
        ).then(
            resultJSON => setAllTimezones(resultJSON)
    )}, []);

    useEffect(() => {
        const timerID = setInterval(() => {
            setSecondsTimer((prev) => prev + 1)
        }, 1000);
        return () => {
            clearInterval(timerID);
        }
    }, []);

    function handleAdd(timezone) {
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

    return (
        <div className="DisplayList">
            {timezones.map( item => {
                return <Display
                    id={item.id}
                    key={item.id}
                    timezone={item.location}
                    handleDelete={handleDelete}
                    secondsTimer={secondsTimer} />
                }
            )}
            <AddDisplay handleAdd={handleAdd} timezones={allTimezones} />
        </div>
    )
}

export default DisplayList;