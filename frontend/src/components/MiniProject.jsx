import { useRef } from "react";

export default function MiniProject({
	icon,
	description,
	on_click,
	mobile_screen,
}) {
	const timeoutRef = useRef(null);

	const handle_hover = (state) => {
		if (state) {
			timeoutRef.current = setTimeout((_) => {
				document.getElementById(description).classList.add("block");
				document.getElementById(description).classList.remove("hidden");
			}, 100);
		} else {
			clearTimeout(timeoutRef.current);

			document.getElementById(description).classList.add("hidden");
			document.getElementById(description).classList.remove("block");
		}
	};

	if (mobile_screen)
		return (
			<div
				className={`mini-project flex-shrink-0 w-[3rem] h-[3rem] bg-[var(--color-bg-program)] rounded-xl flex items-center justify-center cursor-pointer`}
				onClick={on_click}
				id={`${description} box`}
			>
				<i className="text-[var(--color-icon-program)] text-[150%]">{icon}</i>
			</div>
		);
	else
		return (
			<div className="mini-project-wrapper w-[3rem] h-[3rem] flex justify-end">
				<div
					className="mini-project flex-shrink-0 w-full h-full bg-[var(--color-bg-program)] rounded-xl flex items-center justify-end px-[.75rem] cursor-pointer"
					onMouseEnter={(_) => handle_hover(true)}
					onMouseLeave={(_) => handle_hover(false)}
					onClick={on_click}
				>
					<p className="hidden whitespace-nowrap opacity-0" id={description}>
						{description}
					</p>

					<i className="text-[var(--color-icon-program)] text-[150%]">{icon}</i>
				</div>
			</div>
		);
}
