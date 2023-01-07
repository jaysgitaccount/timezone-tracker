import ClockHand from "./ClockHand";

function Clock(props) {
    let time = props.time;

    //let time = '16:27:38';

    let [hour, minute, second] = time.split(':');

    function calcHourPos() {
        let hourValue;

        if (hour > 12) {
            hourValue = hour - 12;
        } else if (hour === 12) {
            hourValue = 0;
        } else {
            hourValue = hour;
        }

        return ((hourValue/12) * 360) + ((360/12) * (minute/60));
    }

    function calcMinutePos() {
        return ((minute/60) * 360) + ((360/60) * (second/60));
    }

    function calcSecondPos() {
        return second/60 * 360;
    }

    return (
        <div className="Clock">
            <ClockHand classes={'second'} rotation={calcSecondPos()} />
            <ClockHand classes={'minute'} rotation={calcMinutePos()} />
            <ClockHand classes={'hour'} rotation={calcHourPos()} />
            <div className="pivot center-absolute"></div>
        </div>
    )
}

export default Clock;