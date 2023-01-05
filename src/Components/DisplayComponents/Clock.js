import ClockHand from "./ClockHand";

function Clock(props) {
    return (
        <div className="Clock">
            <ClockHand classes={'minute'} />
            <ClockHand classes={'hour'} />
            <div className="pivot center-absolute"></div>
        </div>
    )
}

export default Clock;