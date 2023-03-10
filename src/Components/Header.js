function Header() {
    let title = "What Time Is It?"

    return (
        <header>
            <h1>
                {title}
            </h1>
            <div>
                <p>
                    Have you ever found yourself thinking, <i>"I wish I knew what time it was in <span>(insert country here)</span>, so I know when I can <span>(insert time-dependent activity here)</span>"</i>? Well, now you don't have to! Using this timezone tracker, you can add and compare timezones to your heart's content.
                </p>
                <p>
                    To get started, simply <span>select a timezone</span> from the list below.
                </p>
            </div>
        </header>
    )
}

export default Header;