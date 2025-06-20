import { useEffect, useState } from "react";
import Logo from "./components/Logo.jsx";
import CV from "./components/CV.jsx";
import Information from "./components/Information.jsx";
import Skills from "./components/Skills.jsx";
import SeeWork from "./components/SeeWork.jsx";
import Projects from "./components/Projects.jsx";
import Theme from "./components/Theme.jsx";
import Language from "./components/Language.jsx";
import ToggleScroll from "./components/ToggleScroll.jsx";
import ListItem from "./components/ListItem.jsx";
import MagicBar from "./components/MagicBar.jsx";
import Interested from "./components/Interested.jsx";

import { useResolution } from "./contexts/ResolutionContext.jsx";

export default function App() {
	const {windowWidth} = useResolution()

	useEffect((_) => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.style.animation = "slide-x .5s ease forwards";
				}
			});
		});

		const elements_to_animate = document.querySelectorAll(
			".slide-in-view-left, .slide-in-view-right",
		);
		elements_to_animate.forEach((entry) => observer.observe(entry));

		return (_) => {
			elements_to_animate.forEach((entry) => observer.unobserve(entry));
		};
	}, []);

	return (
		<main className="bg-[var(--color-bg)] smooth-scroll">
			<div className="section min-h-screen w-screen p-4 md:p-8 flex flex-col">
				<header className="flex-grow-0 flex justify-between items-center">
					<Logo />
					<CV />
				</header>

				<section className="flex-grow grid place-items-center">
					<div className="flex flex-col gap-4 w-full md:w-[600px]">
						<div id="intro" className="flex items-center justify-between">
							<div className="flex flex-col gap-0">
								<p className="trim text-[var(--color-text-greet)] select-none">hi, i am</p>
								<h1 className="trim">Luka Mania</h1>
								<h3 className="trim text-[var(--color-text-secondary)] select-none">
									Web Developer
								</h3>
							</div>

							<Information />
						</div>

						<p
							id="about"
							className="text-[var(--color-text-paragraph)] leading-snug"
						>
							A passionate web developer with a focus on creating intuitive,
							user-friendly digital experiences. I specialize in front-end
							development with React, and I’m always eager to explore new
							technologies and innovative design solutions. My goal is to build
							functional and visually appealing websites that not only meet user
							needs but also deliver exceptional performance.
						</p>
					</div>
				</section>

				{windowWidth > 768 &&
					<section className="flex-grow flex md:justify-center">
						<div id="skills" className="flex flex-col gap-4 select-none">
							<h1>Languages and frameworks im proficient in</h1>
							<Skills />
						</div>
					</section>
				}

				<section className="w-full flex items-center justify-between pl-8">
					<Theme />
					<SeeWork />
				</section>
			</div>

			{windowWidth < 768 &&
				<div className="section min-h-screen w-screen p-4">
					<div className="flex flex-col gap-[3rem]">
						<div className="flex justify-end">
							<ToggleScroll/>
						</div>

						<div id="skills" className="flex flex-col gap-4 select-none">
							<h1>Technologies i use</h1>
							<Skills />
						</div>
					</div>
				</div>
			}

			<div className="section min-h-screen w-screen p-4 md:px-12 bg-[var(--color-bg-card)] grid place-items-center">
				<section className="w-full h-full flex flex-col gap-12 md:gap-0">
					{windowWidth > 768 && <ToggleScroll />}

					<div className="flex-grow flex">
						<div className="flex-grow w-full flex flex-col justify-around">
							<div className="flex flex-col justify-center gap-6">
								<h1 className="slide-in-view-left">
									{" "}
									I am bilingual. I fluently speak...
								</h1>

								<div className="flex flex-col gap-3 md:gap-6">
									<Language language="Georgian" description="Native" />
									<Language
										language="English"
										description="Have been persistenly studying it since childhood"
									/>
									<Language
										language="Russian"
										description="Watched a lot of SpongeBob in russian growing up"
									/>
								</div>
							</div>

							<div className="flex flex-col justify-center gap-6">
								<h1 className="slide-in-view-right"> I also have</h1>

								<div className="flex flex-col gap-4">
									<ListItem text="80-90wpm" />
									<ListItem text="Chess elo of 1600 online" />
									<ListItem text="5 siblings:D" />
									<ListItem text="An evil dog" />
								</div>
							</div>

							{windowWidth < 768 && <MagicBar mobile_screen={true} />}
						</div>

						{!(windowWidth < 768) && <MagicBar mobile_screen={false} />}
					</div>
				</section>
			</div>

			<Projects />

			<div className="section min-h-screen w-screen bg-[var(--color-bg-card)] p-4 grid place-items-center">
				<section className="w-full flex flex-col items-center gap-32">
					<Interested />
				</section>
			</div>
		</main>
	);
}
