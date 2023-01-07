import Display from "./Display";
import AddDisplay from "./AddDisplay";
import { useState } from 'react';

// Need to find a way to generate ID dynamically
const initialState = [
    {
        location: 'Australia/Sydney',
        id: 'Australia/Sydney10'
    },
]

function DisplayList(props) {
    const [timezones, setTimezones] = useState(initialState);

    function handleAdd(timezone) {
        // Get value from display's input
        // Assign item key as 'locale' + index
        // setTimezones(timezones.concat('value'))
        //console.log(value)
        console.log(timezone)
        if (timezone !== '') {
            let newItem = {
                location: timezone,
                id: `${timezone}${Math.round((Math.random()*1000))/100}`
            }
            setTimezones(timezones.concat(newItem));
        }
    }
    
    function handleDelete(id) {
        console.log('DELETE ' + id)
        let newArray = timezones.filter(item =>
            item.id !== id
        )
        console.log(newArray);
        setTimezones(newArray);
    }

    return (
        <div className="DisplayList">
            {timezones.map((item, index) => {
                return <Display
                    id={item.id}
                    key={item.id}
                    timezone={item.location}
                    handleDelete={handleDelete} />
                }
            )}
            <AddDisplay handleAdd={handleAdd} />
        </div>
    )
}

export default DisplayList;