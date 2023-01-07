function DeleteButton(props) {
    return (
        <button className="delete" onClick={props.onClick}><b>X</b></button>
    )
}

export default DeleteButton;