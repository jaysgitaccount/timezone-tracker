function Timezone(props) {
    let formattedString = props.timezone.replaceAll('_', ' ');
    let [country, city] = formattedString.split('/');
    
    function getTimezone() {
        let string = "";
        if (city !== undefined) {
            string += `${city}, `
        }
        if (country !== undefined) {
            string += `${country}`
        }
        return string;
    }
    return (
        <h3>
            {getTimezone()}
        </h3>
    )
}

export default Timezone;