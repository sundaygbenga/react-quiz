import { useQuiz } from "../context/QuizContext";

function PrevButton() {
	const { dispatch, index } = useQuiz();
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
