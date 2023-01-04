import MainDisplay from "./DisplayComponents/MainDisplay";
import SecondaryDisplay from "./DisplayComponents/SecondaryDisplay";

function Main() {
    return (
        <div className="Main">
            <div className="DisplayList">
            <h2>Main</h2>
                <div class="main">
                    <MainDisplay />
                    <div>vs</div>
                    <MainDisplay />
                </div>
            </div>
            <div className="DisplayList">
                <div class="secondary">
                    <SecondaryDisplay />
                    <SecondaryDisplay />
                    <SecondaryDisplay />
                    <SecondaryDisplay />
                    <SecondaryDisplay />
                    <SecondaryDisplay />
                    <SecondaryDisplay />
                </div>
            </div>
        </div>
    )
}

export default Main;