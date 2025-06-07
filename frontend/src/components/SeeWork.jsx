import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

export default function SeeWork() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect((_) => {
		if (window.scrollY > 0) setIsScrolled(true);

		const handle_scroll = (_) => {
			if (window.scrollY > 0) setIsScrolled(true);
			else setIsScrolled(false);
		};

		window.addEventListener("scroll", handle_scroll);

		return (_) => window.removeEventListener("scroll", handle_scroll);
	}, []);

	return (
		<div id="work" className="flex items-center gap-4 select-none">
			<p className={`${isScrolled && "opacity-0"}`}>see more</p>

			<div
				className={`flex flex-col text-[var(--color-text-primary)] ${isScrolled && "opacity-0"}`}
			>
				<FaAngleDown />
				<FaAngleDown />
				<FaAngleDown />
			</div>
		</div>
	);
}
