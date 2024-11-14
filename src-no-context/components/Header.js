import ToggleTheme from "./ToggleTheme";

function Header() {
	const x = 23;
	return (
		<header className="app-header">
			<img src="logo512.png" alt="React logo" />
			<h1>The React Quiz</h1>
			<ToggleTheme />
		</header>
	);
}

export default Header;
