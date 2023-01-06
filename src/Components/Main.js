import Display from "./DisplayComponents/Display";


function Main() {
    // Iterate through this to create displays with stored info
    const displayArray = [
        'Australia/Sydney'
    ];
    
    function populateList() {
        // For example
        displayArray.map(location => 
            <Display key={location} location={location} />    
        )
    }

    return (
        <section className="Main">
            <h2>Timezones</h2>
            <div className="DisplayList">
                <Display />
                <Display />
            </div>
        </section>
    )
}

export default Main;