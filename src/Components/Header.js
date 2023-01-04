function Header() {
    let title = "What Time Is It?"

    return (
        <header>
            <h1>
                {title}
            </h1>
            <div>
                <p>Have you ever found yourself thinking, "I wish I knew what time it was in (insert country here)"?</p>
                <p>Well, now you don't have to! With this webpage, you can add and compare timezones to your heart's content.</p>
            </div>
        </header>
    )
}

export default Header;