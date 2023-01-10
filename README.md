# timezone-tracker
My first React project! I used `create-react-app` to set it up.

What I intend for this project is to create a convenient way for people who aren't thinking that hard about timezone differences to be able to track the difference in time between locations. This includes whether a location is experience DST or not. I've always had problems understanding the time in America or Europe vs my current location, so I'm hoping to clear up some confusion for myself, and also learn React while I'm at it!

My goals for this project:
- Familiarize myself with ReactJS
- Learn how to build a working analog clock interface for web
- Practice clean and modular code, using composition
- Maybe learn a bit more about how timezones work
- Practice the 'Thinking in React' steps to approach making a React app

## React notes
- I learned that when using `setState()` based on the previous value of a state, you want to reference that state within an arrow function callback so that React makes sure you have the latest version of that state. `setState( previous => previous + 1 )`
- State arrays should be treated as "immutable", so no `push`,`pop`, or any modification of the current array; you have to create a copy or return a new version to `setState`.
- Actually really enjoying using React, to me it makes sense and was not as difficult to pick up as I thought it would be (although I'm still finding it complex to use!)
- Tried to use the "lifting state" technique whenever relevant. It's an interesting technique!

## Timezone notes
- So far, I've learned that getting epoch time from `data.datetime` within `Display.js` is actually giving me a value that's affected by DST, which is technically incorrect! However, as this is the display time, I'm ok with it, because I expect users to be "thinking" in the current time of that specific timezone, not the standard UTC time.
- I think I'll implement the custom time conversion as additional components to the bottom of the display, and I won't replace the current display. Just for ease (I don't think users will want their custom input date/time to tick upwards).
- I want to see if I can implement a converter for each card from one date/time to another. This is hard! The API doesn't cover this use case.
    - Create input components on `Display` that send UTC time/date to parent
    - Create a converter function
    - Lift the state of all custom date/time inputs to `DisplayList`
    - Feed the converted values as props to each `Display` ("controlled input")
    - Due to the calculations being based off each child's state, I think the conversion will need to be done on the child, which may or may not still technically be a controlled input setup
- Below I am leaving my pesudo code for a function that converts both date and time for all displays, taking DST into account. It hasn't been tested yet, and this feature is more of a "stretch goal".
    // Convert an epoch time/UTC to this timezone's equivalent
    function convertDateTime(customTime, utcOffset) {
        // consider converting to work in seconds instead of ms (divide by 1000, math round whatever)

        // utcOffset.split(0,3), convert to number to get UTC offset
        // multiply this by 3600*1000 to get ms to add/remove from epoch
        // return convertedTime

        // to get the DST days
        // we need to find out what # day of the month DSTStart/End is e.g. first Sunday of August
        // then we need to get those dates as epoch time for the custom input year
        // then check if customTime is between the DST dates
        // if so, indicate this maybe? and set input value to the date/time WITH DST applied (use data.dst_offset)
    }