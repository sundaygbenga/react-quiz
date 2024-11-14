function PrevButton({ dispatch, index }) {
	if (index > 0)
		return (
			<button
				style={{
					float: "left",
				}}
				className="btn btn-ui el1"
				onClick={() => dispatch({ type: "prevQuestion" })}
			>
				Prev
			</button>
		);
}

export default PrevButton;
