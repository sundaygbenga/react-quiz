import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";
import NextButton from "./NextButton.js";
import PrevButton from "./PrevButton.js";
import Progress from "./Progress.js";
import FinishScreen from "./FinishScreen.js";
import Footer from "./Footer.js";
import Timer from "./Timer.js";

const SECS_PER_QUESTION = 20;

const initialState = {
	questions: [],

	//Application status: 'loading', 'error', 'ready', 'active', 'finished'
	status: "loading",
	index: 0,
	answer: null,
	points: 0,
	highscore: 0,
	secondsRemaining: null,
};

function reducer(state, action) {
	switch (action.type) {
		case "dataRecieved":
			return { ...state, questions: action.payload, status: "ready" };
		case "dataFailed":
			return { ...state, status: "error" };
		case "start":
			return {
				...state,
				status: "active",
				secondsRemaining: state.questions.length * SECS_PER_QUESTION,
			};
		case "newAnswer":
			const question = state.questions.at(state.index);

			return {
				...state,
				answer: action.payload,
				points:
					action.payload === question.correctOption
						? state.points + question.points
						: state.points,
			};
		case "nextQuestion":
			const answered = state.answer !== null;
			return {
				...state,
				index: state.index + 1,
				answer: answered ? null : state.answer,
			};
		case "prevQuestion":
			return { ...state, index: state.index - 1 };
		case "finish":
			return {
				...state,
				status: "finished",
				highscore:
					state.points > state.highscore ? state.points : state.highscore,
			};
		case "restartQuiz":
			return {
				...initialState,
				questions: state.questions,
				status: "ready",
			};
		case "tick":
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status: state.secondsRemaining === 0 ? "finished" : state.status,
			};

		default:
			throw new Error("Action unknown");
	}
}

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const {
		questions,
		status,
		index,
		answer,
		points,
		highscore,
		secondsRemaining,
		theme,
	} = state;

	const numQuestions = questions.length;
	const maxPossiblePoints = questions.reduce(
		(prev, cur) => prev + cur.points,
		0
	);
	// console.log(questions[1]);
	// console.log(points);

	useEffect(function () {
		fetch("http://localhost:9000/questions")
			.then((res) => res.json())
			.then((data) => dispatch({ type: "dataRecieved", payload: data }))
			.catch((err) => dispatch({ type: "dataFailed" }));
	}, []);

	return (
		<div className="app" style={theme}>
			<Header />

			<Main>
				{status === "loading" && <Loader />}
				{status === "error" && <Error />}
				{status === "ready" && (
					<StartScreen numQuestions={numQuestions} dispatch={dispatch} />
				)}

				{status === "active" && (
					<>
						<Progress
							index={index}
							numQuestion={numQuestions}
							points={points}
							answer={answer}
							maxPoint={maxPossiblePoints}
						/>
						<Question
							question={questions[index]}
							dispatch={dispatch}
							answer={answer}
						/>
						<Footer>
							<PrevButton dispatch={dispatch} index={index} />
							<Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
							<NextButton
								dispatch={dispatch}
								answer={answer}
								index={index}
								numQuestion={numQuestions}
							/>
						</Footer>
					</>
				)}

				{status === "finished" && (
					<FinishScreen
						points={points}
						maxPossiblePoints={maxPossiblePoints}
						highscore={highscore}
						dispatch={dispatch}
					/>
				)}
			</Main>
		</div>
	);
}
