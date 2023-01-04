import Clock from "./Clock";
import DigitalTime from "./DigitalTime";

function SecondaryDisplay(props) {
    return (
        <div className="SecondaryDisplay">
            <h3>Title</h3>
            <Clock />
            <DigitalTime />
        </div>
    )
}

export default SecondaryDisplay;