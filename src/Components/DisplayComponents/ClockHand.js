function ClockHand(props) {
    return (
        /* Rotate the wrapper */
        <div className="clock-hand-wrapper" style={
            {transform: `rotate(${props.rotation}deg)`}
        }>
            <div className={`ClockHand center-absolute ${props.classes}`}>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default ClockHand;