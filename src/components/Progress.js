import { useQuiz } from "../context/QuizContext";

function Progress() {
	const { index, numQuestions, points, maxPossiblePoints, answer } = useQuiz();

	return (
		<header className="progress">
			<progress max={numQuestions} value={index + Number(answer !== null)} />
			<p>
				Question{" "}
				<strong>
					{index + 1} / {numQuestions}
				</strong>
			</p>
			<p>
				<strong>
					{points} / {maxPossiblePoints}
				</strong>{" "}
				points
			</p>
		</header>
	);
}

export default Progress;
