function DST(props) {
    return (
        <div className={`DST ${props.dst && 'active'}`}>
            DST {props.dst ? `active (+${props.offset})` : 'inactive'}
        </div>
    )
}

export default DST;