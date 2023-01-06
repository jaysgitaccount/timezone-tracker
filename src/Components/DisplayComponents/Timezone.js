function Timezone(props) {
    let [country, city] = props.timezone.split('/');

    return (
        <h3>
            {city + ', ' + country}
        </h3>
    )
}

export default Timezone;