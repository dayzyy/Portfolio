import { useState, useEffect } from "react";

export default function Theme() {
	const [mounted, setMounted] = useState(false);
	const [theme, setTheme] = useState(() => {
		try {
			const saved_theme = JSON.parse(localStorage.getItem('theme'))

			if (typeof saved_theme === 'string') {
				const theme_obj = themes.find(t => t.name === saved_theme)
				return theme_obj || {name: "retro", color: "#C2410C"}
			}
			if (typeof saved_theme === 'object' && saved_theme != null && saved_theme.name && saved_theme.color) {
				return saved_theme
			}
		} catch(error) {
			return {name: "retro", color: "#C2410C"}
		}
	});

	const [themeName, setThemeName] = useState(theme.name)
	const [toggled, setToggled] = useState(false);
	const [isActive, setIsActive] = useState(false);

	const themes = [
		{ name: "retro", color: "#C2410C" },
		{ name: "original", color: "#64748B" },
		{ name: "light", color: "#E2E8F0" },
		{ name: "forest", color: "#2D6A4F" },
		{ name: "dark", color: "#1E293B" },
		{ name: "solarized", color: "#268BD2" },
		{ name: "neon", color: "#F472B6" },
	];

	const toggle_theme = (_) => {
		setTheme((prev) => {
			const last_index = themes.findIndex((t) => t.name == prev.name);
			return themes[last_index != themes.length - 1 ? last_index + 1 : 0];
		});
		setToggled(true);
	};

	useEffect((_) => {
		const timeout = setTimeout((_) => {
			setMounted(true);
		}, 5000);

		return (_) => clearTimeout(timeout);
	}, []);

	useEffect(
		(_) => {
			//set theme
			document.documentElement.setAttribute("data-theme", theme.name);
			localStorage.setItem("theme", JSON.stringify(theme));
		},
		[theme],
	);

	useEffect((_) => {
		setTimeout((_) => {
			setIsActive(true);
		}, 3000);
	}, []);

	useEffect(
		(_) => {
			if (!toggled) return;

			const timeout = setTimeout((_) => {
				setThemeName(theme.name);
				setToggled(false);
			}, 500);

			return (_) => clearTimeout(timeout);
		},
		[toggled],
	);

	return (
		<div className="theme-box flex gap-8">
			<div
				className="relative rounded-full w-[1rem] h-[1rem] grid place-items-center cursor-pointer"
				onClick={toggle_theme}
			>
				{themes.map((t) => {
					return (
						<div
							key={t.name}
							className={`theme-circle 
					    ${theme.name == t.name ? "show-theme" : "hide-theme"}
					    ${isActive ? "active" : ""}
					   `}
							style={{ backgroundColor: t.color }}
						></div>
					);
				})}
			</div>

			<p
				onClick={toggle_theme}
				className={`cursor-pointer select-none 
			  ${!mounted ? "" : toggled ? "opacity-0" : "opacity-100"}
			  ${!mounted ? "theme-name-animate" : ""}
			 `}
			>
				"{themeName}"
			</p>
		</div>
	);
}
