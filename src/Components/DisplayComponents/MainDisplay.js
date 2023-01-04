import Clock from "./Clock";
import DigitalTime from "./DigitalTime";

function MainDisplay(props) {
    return (
        <div className="MainDisplay">
            <h3>Title</h3>
            <Clock />
            <DigitalTime />
        </div>
    )
}

export default MainDisplay;