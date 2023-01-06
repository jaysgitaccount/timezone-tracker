function DeleteButton(props) {
    function handleClick(e) {
        // Trigger delete display
        console.log('delete');
    }

    return (
        <button className="delete" onClick={handleClick}><b>X</b></button>
    )
}

export default DeleteButton;