function NextButton({ dispatch, answer, index, numQuestion }) {
	if (answer === null) return null;
	return (
		<div className="el3">
			{index < numQuestion - 1 && (
				<button
					className="btn btn-ui"
					onClick={() => dispatch({ type: "nextQuestion" })}
				>
					Next
				</button>
			)}

			{index === numQuestion - 1 && (
				<button
					className="btn btn-ui"
					onClick={() => dispatch({ type: "finish" })}
				>
					Finish
				</button>
			)}
		</div>
	);
}

export default NextButton;
