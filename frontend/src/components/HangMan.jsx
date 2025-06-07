import { useState, useEffect, useRef } from "react";
import Loading from "./Loading";

import { FaRegHeart } from "react-icons/fa";

export default function HangMan() {
	const words = [
		{
			word: "pencil",
			description: "Used for writing or drawing, usually with an eraser.",
		},
		{ word: "bottle", description: "A container for holding liquids." },
		{ word: "jacket", description: "Clothing you wear to keep warm." },
		{
			word: "window",
			description: "A glass opening in a wall to let in light.",
		},
		{
			word: "basket",
			description: "Used to carry or store things, often woven.",
		},
		{ word: "button", description: "Used to fasten clothes." },
		{ word: "rocket", description: "A vehicle that travels into space." },
		{ word: "circle", description: "A round shape with no corners." },
		{ word: "guitar", description: "A musical instrument with strings." },
		{ word: "spoon", description: "Used to eat soup or cereal." },
		{ word: "planet", description: "Orbits a star, like Earth or Mars." },
		{ word: "ladder", description: "Used to climb up to higher places." },
		{ word: "broom", description: "Used to sweep the floor." },
		{ word: "flower", description: "A colorful plant that blooms." },
		{ word: "camera", description: "Used to take pictures." },
		{
			word: "pillow",
			description: "You rest your head on this when sleeping.",
		},
		{ word: "cookie", description: "A sweet baked snack." },
		{ word: "banana", description: "A yellow fruit you peel." },
		{
			word: "ticket",
			description: "You need this to get into a movie or bus.",
		},
		{ word: "rabbit", description: "A small animal with long ears." },
	];

	const lastWordIndex = useRef(null);
	const [word, setWord] = useState(null);
	const guessed_letters = useRef([]);
	const [unGuessedLetters, setUnGuessesLetters] = useState([]);
	const available_letters = useRef(Array.from("abcdefghijklmnopqrstuvwxyz"));
	const [lastGuess, setLastGuess] = useState(null);
	const [lives, setLives] = useState(5);

	const [correctGuess, setCorrectGuess] = useState(false);
	const [wrongGuess, setWrongGuess] = useState(false);
	const correctGuessTimer = useRef(null);
	const wrongGuessTimer = useRef(null);

	const [gameOver, setGameOver] = useState(null);
	const [newGame, setNewGame] = useState(0);
	const [loading, setLoading] = useState(false);
	const loadingTimer = useRef(null);
	const [showResult, setShowResult] = useState(false);
	const [growResult, setGrowResult] = useState(false);
	const [delay, setDelay] = useState(true);

	const check_game_over = (_) => {
		const word_letters = new Set(word.word);
		const guessed_set = new Set(guessed_letters.current);

		const all_guessed = [...word_letters].every((letter) =>
			guessed_set.has(letter),
		);

		if (all_guessed) setGameOver("win");
	};

	useEffect((_) => {
		return (_) => clearTimeout(loadingTimer.current);
	}, []);

	useEffect(
		(_) => {
			const timeout = setTimeout((_) => setDelay(false), 500);

			let random_index = Math.floor(Math.random() * words.length);
			while (random_index == lastWordIndex.current) {
				random_index = Math.floor(Math.random() * words.length);
			}
			lastWordIndex.current = random_index;
			setWord(words[random_index]);
			setUnGuessesLetters(Array.from(words[random_index].word));

			return (_) => clearTimeout(timeout);
		},
		[newGame],
	);

	useEffect(
		(_) => {
			if (lives != 0) return;

			setGameOver("loss");
			const timeout = setTimeout(
				(_) => (guessed_letters.current = Array.from(word.word)),
				500,
			);

			return (_) => clearTimeout(timeout);
		},
		[lives],
	);

	useEffect(
		(_) => {
			if (!gameOver) return;

			const timeout1 = setTimeout((_) => setShowResult(true), 500);
			const timeout2 = setTimeout((_) => setGrowResult(true), 600);

			return (_) => {
				clearTimeout(timeout1);
				clearTimeout(timeout2);
			};
		},
		[gameOver],
	);

	useEffect(
		(_) => {
			if (!lastGuess || !available_letters.current.includes(lastGuess)) return;

			if (Array.from(word.word).includes(lastGuess)) {
				guessed_letters.current.push(lastGuess);
				setUnGuessesLetters((prev) =>
					prev.filter((letter) => letter != lastGuess),
				);

				clearTimeout(correctGuessTimer.current);
				setCorrectGuess(true);
				correctGuessTimer.current = setTimeout(
					(_) => setCorrectGuess(false),
					300,
				);
			} else {
				clearTimeout(wrongGuessTimer.current);
				setWrongGuess(true);
				wrongGuessTimer.current = setTimeout((_) => setWrongGuess(false), 300);
				setLives((prev) => prev - 1);
			}

			available_letters.current = available_letters.current.filter(
				(letter) => letter != lastGuess,
			);

			check_game_over();

			return (_) => {
				clearTimeout(correctGuessTimer.current);
				clearTimeout(wrongGuessTimer.current);
			};
		},
		[lastGuess],
	);

	const restart_game = (_) => {
		setLoading(true);

		lastWordIndex.current = null;
		guessed_letters.current = [];
		available_letters.current = Array.from("abcdefghijklmnopqrstuvwxyz");
		setLastGuess(null);
		setLives(5);
		setCorrectGuess(false);
		setWrongGuess(false);
		setGameOver(null);
		setShowResult(false);
		setGrowResult(false);

		loadingTimer.current = setTimeout((_) => {
			setNewGame((prev) => prev + 1);
			setLoading(false);
		}, 500);
	};

	if (delay) return <div className="flex-grow"></div>;
	if (!word || loading) return <Loading />;

	return (
		<div
			id="hangman"
			className="mini-program flex-grow flex flex-col justify-around items-center"
		>
			<div
				className={`w-full h-[5rem] flex justify-around items-center transition-opacity duration-200 ${gameOver ? "opacity-0" : ""}`}
			>
				<div className={`w-[3rem] h-[3rem]`}></div>

				{!showResult && (
					<div
						className={`w-[5rem] h-[5rem] grid place-items-center transition-shadow duration-500 ${wrongGuess ? "wrong-guess" : ""}`}
					>
						{lastGuess && (
							<h1
								className={`last-guess transition-opacity duration-500 ${wrongGuess ? "opacity-100" : "opacity-0"}`}
							>
								{lastGuess}
							</h1>
						)}
					</div>
				)}

				{showResult && (
					<h1
						className={`scale-0 transition-transform duration-300 ${growResult ? "scale-100" : ""}`}
					>
						{gameOver == "win" ? "You have won!" : "You have lost!"}
					</h1>
				)}

				<div className="w-fit flex items-center gap-2">
					<h1>{lives}</h1>
					<FaRegHeart className="text-[1.7rem]" />
				</div>
			</div>

			<div className="w-full flex flex-wrap gap-12 items-end justify-around">
				<div
					className={`w-fit word flex gap-4 justify-center p-4 transition-shadow duration-300 ${gameOver == "win" ? "correct-guess" : ""}`}
				>
					{Array.from(word.word).map((letter, index) => {
						return (
							<div
								key={`letter ${index}`}
								className={`w-[2rem] sm:w-[3rem] flex justify-center px-4 items-center border-b-2
					transition-shadow duration-300
					${gameOver == "win" ? "!border-b-0" : ""}
					${correctGuess && letter == lastGuess ? "correct-guess" : ""}
					${showResult && unGuessedLetters.includes(letter) ? "wrong-guess" : ""}
					`}
							>
								<h1
									className={`transition-opacity duration-300 ${guessed_letters.current.includes(letter) ? "opacity-100" : "opacity-0"}`}
								>
									{letter}
								</h1>
							</div>
						);
					})}
				</div>

				<h1 className="pb-2">{word.description}</h1>
			</div>

			<div className="flex justify-center w-full">
				<div className="flex max-w-[30rem] flex flex-wrap justify-center gap-2">
					{available_letters.current.map((letter) => {
						return (
							<div
								key={letter}
								className="w-[3rem] h-[3rem] border rounded-md cursor-pointer grid place-items-center  hover:bg-[#373737]"
								onClick={!gameOver ? (_) => setLastGuess(letter) : null}
							>
								<h1>{letter}</h1>
							</div>
						);
					})}
				</div>

				<div
					className="md:absolute right-7 self-end w-fit border rounded-md solid p-3 cursor-pointer"
					onClick={restart_game}
				>
					<h1 className="leading-none px-[.1rem]">restart</h1>
				</div>
			</div>
		</div>
	);
}
