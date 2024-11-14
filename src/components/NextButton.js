import { useQuiz } from "../context/QuizContext";

function NextButton() {
	const { dispatch, answer, index, numQuestions } = useQuiz();
	if (answer === null) return null;

	return (
		<div className="el3">
			{index < numQuestions - 1 && (
				<button
					className="btn btn-ui"
					onClick={() => dispatch({ type: "nextQuestion" })}
				>
					Next
				</button>
			)}

			{index === numQuestions - 1 && (
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
