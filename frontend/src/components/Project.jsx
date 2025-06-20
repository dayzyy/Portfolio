import { useEffect, useRef, useState } from "react";
import ImageGallery from "./ImageGallery.jsx";

import { observe, unobserve } from "../utils/sectionObserver.js";
import { useResolution } from "../contexts/ResolutionContext.jsx";

import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import DropDowns from "./DropDowns.jsx";

export default function Project({ project }) {
	const [inFocus, setInFocus] = useState(0);
	const [showGallery, setShowGallery] = useState(false);
	const changeFocusTimer = useRef(null);
	const sectionRef = useRef(null);
	const [isVisible, setIsVisible] = useState(false)
	const {windowWidth} = useResolution()

	const reset_interval = () => {
		clearInterval(changeFocusTimer.current)
		 changeFocusTimer.current = setInterval((_) => {
			setInFocus((prev) =>
				prev !== project.screenshots.names.length - 1 ? prev + 1 : 0
			);
		}, 1300);
	}

	const handle_click_image = (index) => {
		if (inFocus != index) {
			setInFocus(index);
			reset_interval()
		} else {
			setShowGallery(true);
		}
	};

	const handle_click_arrow = (event, to) => {
		event.stopPropagation();
		setInFocus((prev) => prev + to);
		reset_interval()
	};

	useEffect(() => {
		const element = sectionRef.current
		observe(element, setIsVisible)
		return () => unobserve(element)
	}, [])

	useEffect(() => {
		if (showGallery || !isVisible) return;

		 changeFocusTimer.current = setInterval((_) => {
			setInFocus((prev) =>
				prev !== project.screenshots.names.length - 1 ? prev + 1 : 0
			);
		}, 1300);

		return (_) => clearInterval(changeFocusTimer.current);
	}, [showGallery, isVisible]);

	useEffect((_) => {
		if (!isVisible) clearInterval(changeFocusTimer.current)
	}, [isVisible]);

	return (
		<section ref={sectionRef} id={project.name} className="section w-[100dvw] h-[100dvh] flex flex-col md:flex-row md:gap-12 p-4">
			{showGallery && (
				<ImageGallery
					images={project.screenshots}
					focused_image={inFocus}
					toggle_off={(_) => setShowGallery(false)}
					vp_mobile={(windowWidth < 768)}
				/>
			)}

			{(windowWidth < 768) && <h1 className="large text-[var(--color-icon-lang)]">{project.name}</h1>}

			<DropDowns vpMobile={(windowWidth < 768)} project={project}/>

			<div className="flex-grow flex flex-col gap-4 items-start mt-5">
				{!(windowWidth < 768) && <h1 className="large text-[var(--color-icon-lang)]">{project.name}</h1>}

				{!showGallery && // Display screenshots only when the gallery is toggled off
					<>
						<div className={`screenshots relative w-full overflow-x-hidden flex flex-col items-center self-center overflow-x-hidden
							${((windowWidth < 768) && !project.suitableForMobile) ? 'h-fit' : 'h-0 flex-grow'}`}>
							{project.screenshots.names.map((screen, index) => {
								return (
									<img
										key={screen}
										className={`${(windowWidth < 768) ? 'max-h-full' : 'max-h-full'} rounded cursor-pointer
									${
											inFocus == index
												? "show-screen border border-rounded border-[var(--color-bg-card)]"
												: index < inFocus
													? "hide-screen-left"
													: "hide-screen-right"
										}`}
										style={
											index == inFocus + 1
												? { zIndex: index * 200 }
												: { zIndex: index * 10 }
										}
										src={`screenshots/${project.screenshots.dir}/${project.suitableForMobile && (windowWidth < 768) ? "mobile" : "desktop"}/${screen}`}
										onClick={(_) => handle_click_image(index)}
									/>
								);
							})}
						</div>

						{(windowWidth < 768) && (
							<div className="min-h-fit flex flex-col items-center w-full">
								<div className="flex w-5/6 justify-around">
									<FaAngleLeft
										className={`arrow ${inFocus == 0 && "opacity-50"}`}
										onClick={
											inFocus == 0
												? (e) => e.stopPropagation()
												: (e) => handle_click_arrow(e, -1)
										}
									/>

									<FaAngleRight
										className={`arrow ${inFocus == (project.screenshots.names.length - 1) && "opacity-[.1]"}`}
										onClick={
											inFocus == project.screenshots.names.length - 1
												? (e) => e.stopPropagation()
												: (e) => handle_click_arrow(e, 1)
										}
									/>
								</div>

								{((windowWidth < 768) && !project.suitableForMobile) && <p className="self-end">! this project is not suitable for mobile usage</p>}

								<a className="self-end" href={project.link}>{project.link}</a>
							</div>
						)}
					</>
				}

				{!(windowWidth < 768) && <a className="self-end" href={project.link}>{project.link}</a>}
			</div>

		</section>
	);
}
