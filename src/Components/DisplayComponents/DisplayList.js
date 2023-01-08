import Display from "./Display";
import AddDisplay from "./AddDisplay";
import { useEffect, useState } from 'react';

// Need to find a way to generate ID dynamically
const initialState = [
    {
        location: 'Australia/Sydney',
        id: 'Australia/Sydney10'
    },
]

function DisplayList(props) {
    const [timezones, setTimezones] = useState([]);
    const [allTimezones, setAllTimezones] = useState([]);

    useEffect(() => {
        fetch('http://worldtimeapi.org/api/timezone/').then(
            result => result.json()
        ).then(
            resultJSON => setAllTimezones(resultJSON)
    )}, []);

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
                    handleDelete={handleDelete} />
                }
            )}
            <AddDisplay handleAdd={handleAdd} timezones={allTimezones} />
        </div>
    )
}

export default DisplayList;