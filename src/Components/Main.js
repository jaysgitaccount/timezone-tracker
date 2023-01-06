import Display from "./DisplayComponents/Display";


function Main() {
    return (
        <div className="Main">
            <section className="DisplayList">
            <h2>Main</h2>
                <div className="main">
                    <Display />
                    <div>vs</div>
                    <Display />
                </div>
            </section>
            <section className="DisplayList">
                <h2>Secondary</h2>
                <div className="secondary">
                    <Display />
                    <Display />
                    <Display />
                    <Display />
                    <Display />
                    <Display />
                    <Display />
                </div>
            </section>
        </div>
    )
}

export default Main;