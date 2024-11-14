function Progress({ index, numQuestion, points, maxPoint, answer }) {
	return (
		<header className="progress">
			<progress max={numQuestion} value={index + Number(answer !== null)} />
			<p>
				Question{" "}
				<strong>
					{index + 1} / {numQuestion}
				</strong>
			</p>
			<p>
				<strong>
					{points} / {maxPoint}
				</strong>{" "}
				points
			</p>
		</header>
	);
}

export default Progress;
