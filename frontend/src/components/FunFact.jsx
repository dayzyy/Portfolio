import { useState, useEffect, useRef } from "react";
import Loading from "./Loading";

const API = "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en";

export default function RandomFact() {
	const [delay, setDelay] = useState(true);
	const [fact, setFact] = useState(null);
	const [text, setText] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showSource, setShowSource] = useState(false);
	const updateTimeout = useRef(null);
	const loadingTimeout = useRef(null);

	const fetch_fact = async (_) => {
		const response = await fetch(API);
		const data = await response.json();
		setFact({ text: Array.from(data.text), source: data.source });
	};

	useEffect((_) => {
		const delayTimeout = setTimeout((_) => setDelay(false), 500);

		const get_fact = async (_) => {
			await fetch_fact();
		};

		const fetchTimeout = setTimeout((_) => get_fact(), 800);

		return (_) => {
			clearTimeout(delayTimeout);
			clearTimeout(fetchTimeout);
			clearTimeout(updateTimeout.current);
			clearTimeout(loadingTimeout.current);
		};
	}, []);

	useEffect(
		(_) => {
			if (!fact || delay) return;

			const timeouts = [];

			fact.text.forEach((letter, index) => {
				timeouts.push(
					setTimeout((_) => {
						setText((prev) => {
							if (index == fact.text.length - 1) {
								timeouts.push(setTimeout((_) => setShowSource(true), 400));
							}
							return [...prev, letter];
						});
					}, index * 15),
				);
			});

			return (_) => timeouts.forEach((t) => clearTimeout(t));
		},
		[fact, delay],
	);

	const handle_click = (_) => {
		clearTimeout(updateTimeout.current);
		clearTimeout(loadingTimeout.current);

		setFact(null);
		setText([]);
		setShowSource(false);
		setLoading(true);

		loadingTimeout.current = setTimeout((_) => setLoading(false), 500);
		updateTimeout.current = setTimeout(async (_) => await fetch_fact(), 900);
	};

	if (delay) return <div className="flex-grow"></div>;
	if (loading) return <Loading />;

	return (
		<div
			id="fun-fact"
			className="mini-program flex-grow flex flex-col gap-32 items-center"
		>
			<h1>Did you know?</h1>
			<div className="min-h-[15rem] text-container flex flex-col items-center gap-8">
				<h2>{text.join("")}</h2>

				{fact && (
					<h2
						className={`transition-opacity duration-300 ${showSource ? "opacity-100" : "opacity-0"}`}
					>
						Source - {fact.source}
					</h2>
				)}
			</div>

			<div className="w-[80%] flex justify-end items-center pb-4">
				<div
					className="w-fit border rounded-md solid p-3 cursor-pointer"
					onClick={handle_click}
				>
					<h1 className="leading-none px-[.1rem]">new</h1>
				</div>
			</div>
		</div>
	);
}
