function Timezone(props) {
    let formattedString = props.timezone.replaceAll('_', ' ');
    let [country, city] = formattedString.split('/');

    return (
        <h3>
            {city + ', ' + country}
        </h3>
    )
}

export default Timezone;