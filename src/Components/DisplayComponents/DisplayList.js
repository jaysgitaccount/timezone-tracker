import Display from "./Display";
import AddDisplay from "./AddDisplay";
import { useEffect, useState, useRef, forwardRef } from 'react';
import React from "react";

const DisplayRef = forwardRef((props, ref) => {
    return (
        <div className='Display' ref={ref}>
            <Display {...props} />
        </div>
    )
})

const AddDisplayRef = forwardRef((props, ref) => {
    return (
        <div className='Display' ref={ref}>
            <AddDisplay {...props} />
        </div>
    )
})

function DisplayList() {
    const [timezones, setTimezones] = useState([]);
    const [allTimezones, setAllTimezones] = useState([]);
    const [dateObj, setDateObj] = useState({});
    const [currentTime, setCurrentTime] = useState(new Date());
    const itemRefs = useRef([]);
    const addDisplayRef = useRef(null);
    
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

    // When timezones changes, adjust length of itemRefs
    // Then, add the AddDisplay ref to the array
    useEffect(() => {
        let newItemArray = itemRefs.current.slice(0, timezones.length);
        newItemArray = newItemArray.concat(addDisplayRef.current);

        itemRefs.current = newItemArray;
    }, [timezones])

    function handleAdd(timezone) {
        // Store added timezone in state array with unique id
        if (timezone !== '') {
            let newItem = {
                location: timezone,
                id: `${timezone}${Math.round((Math.random()*1000))/100}`,
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
            {timezones.map( (item, i) => {
                return <DisplayRef
                ref={el => itemRefs.current[i] = el}
                id={item.id}
                key={item.id}
                timezone={item.location}
                handleDelete={handleDelete}
                handleInput={handleInput}
                dateObj={dateObj}
                currentTime={currentTime} />
            })}
            <AddDisplayRef
                ref={addDisplayRef}
                handleAdd={handleAdd}
                timezones={allTimezones} />
        </div>
    )
}

export default DisplayList;