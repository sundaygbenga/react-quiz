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
import { useQuiz } from "../context/QuizContext.jsx";

export default function App() {
	const { theme, status } = useQuiz();

	// console.log(questions[1]);
	// console.log(points);

	return (
		<div className="app" style={theme}>
			<Header />

			<Main>
				{status === "loading" && <Loader />}
				{status === "error" && <Error />}
				{status === "ready" && <StartScreen />}

				{status === "active" && (
					<>
						<Progress />
						<Question />
						<Footer>
							<PrevButton />
							<Timer />
							<NextButton />
						</Footer>
					</>
				)}

				{status === "finished" && <FinishScreen />}
			</Main>
		</div>
	);
}
