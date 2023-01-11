# timezone-tracker
My first React project! I used `create-react-app` to set it up.

This single-page web application uses data from [World Time API](https://worldtimeapi.org/) to display and convert data between info cards that show timezone information for available locations.

I only used ReactJS and World Time API for this project. All other logic was written by me (although I was tempted to use MomentJS towards the end).

[LIVE DEMO](https://thriving-syrniki-5daa84.netlify.app/)

## Pre-project notes
What I intend for this project is to create a convenient way for people who aren't thinking that hard about timezone differences to be able to track the difference in time between locations. This includes whether a location is experience DST or not. I've always had problems understanding the time in America or Europe vs my current location, so I'm hoping to clear up some confusion for myself, and also learn React while I'm at it!

I also intend to host this project on Netlify, which I haven't used before.

My goals for this project:
- Familiarize myself with ReactJS
- Learn how to build a working analog clock interface for web
- Practice clean and modular code, using composition
- Maybe learn a bit more about how timezones work
- Practice the 'Thinking in React' steps to approach making a React app
- Deploy my first Netlify website

## React notes
- I learned that when using `setState()` based on the previous value of a state, you want to reference that state within an arrow function callback so that React makes sure you have the latest version of that state. `setState( previous => previous + 1 )`
- State arrays should be treated as "immutable", so no `push`,`pop`, or any modification of the current array; you have to create a copy or return a new version to `setState`.
- Actually really enjoying using React, to me it makes sense and was not as difficult to pick up as I thought it would be (although I'm still finding it complex to use!)
- Learned how to use fragments
- Tried to use the "lifting state" technique whenever relevant. It's an interesting technique!
- For this project, I used functional components only, because I felt like it would be good to practice them.
- I need to figure out how to optimise values that don't change every second. Right now, it seems like all data is being recalculated on re-render.

## Timezone notes
- So far, I've learned that getting epoch time from `data.datetime` within `Display.js` is actually giving me a value that's affected by DST, which is technically incorrect! However, as this is the display time, I'm ok with it, because I expect users to be "thinking" in the current time of that specific timezone, not the standard UTC time.
- I think I'll implement the custom time conversion as additional components to the bottom of the display, and I won't replace the current display. Just for ease (I don't think users will want their custom input date/time to tick upwards).
- I want to see if I can implement a converter for each card from one date AND time to another. This is hard! The API doesn't cover this use case.
    - Create input components on `Display` that send UTC time/date to parent
    - Create a converter function
    - Lift the state of all custom date/time inputs to `DisplayList`
    - Feed the converted values as props to each `Display` ("controlled input")
    - Due to the calculations being based off each child's state, I think the conversion will need to be done on the child, which may or may not still technically be a controlled input setup
    - For now, I'm excluding this from the "final" product, as it's more of a stretch goal.
- Appending 'Z' on the end of an ISO date/time string and then doing `new Date(isoString)` will actually automatically convert that time to "Zulu" which means UTC offset of 00:00. I didn't know this!