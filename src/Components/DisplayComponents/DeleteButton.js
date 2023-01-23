function DeleteButton(props) {
    return (
        <button className="delete" onClick={props.onClick}>
            <div className="one">
                <div className="two"></div>
            </div>
        </button>
    )
}

export default DeleteButton;