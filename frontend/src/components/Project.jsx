import { useEffect, useRef, useState } from "react";
import ImageGallery from "./ImageGallery.jsx";
import DropDownMenu from "./DropDownMenu.jsx";
import InfoCards from "./InfoCards.jsx";

import { observe, unobserve } from "../utils/sectionObserver.js";

import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

export default function Project({ project }) {
	const [inFocus, setInFocus] = useState(0);
	const [showGallery, setShowGallery] = useState(false);
	const [vpMobile, setVpMobile] = useState(window.innerWidth <= 768);
	const changeFocusTimer = useRef(null);
	const changedManually = useRef(false);
	const sectionRef = useRef(null);
	const [isVisible, setIsVisible] = useState(false)

	const handle_click_image = (index) => {
		if (inFocus != index) {
			setInFocus(index);
			changedManually.current = true;
		} else {
			setShowGallery(true);
		}
	};

	const handle_click_arrow = (event, to) => {
		event.stopPropagation();
		setInFocus((prev) => prev + to);
		changedManually.current = true;
	};

	useEffect(() => {
		const element = sectionRef.current
		observe(element, setIsVisible)
		return () => unobserve(element)
	}, [])

	useEffect(() => {
		if (showGallery || !isVisible) return;

		if (changedManually.current) changedManually.current = false;

		 changeFocusTimer.current = setInterval((_) => {
			setInFocus((prev) =>
				prev !== project.screenshots.names.length - 1 ? prev + 1 : 0,
			);
		}, 1300);

		return (_) => clearInterval(changeFocusTimer.current);
	}, [showGallery, isVisible]); // Reseting the interval when the screenshots are interacted with (gallery opened or switched manually)

	useEffect((_) => {
			const handle_resize = (_) => {
				setVpMobile(window.innerWidth < 768);
			};

			if (isVisible) {
				window.addEventListener("resize", handle_resize);
			} else {
				window.removeEventListener("resize", handle_resize);
				clearInterval(changeFocusTimer.current)
			}

			return (_) => window.removeEventListener("resize", handle_resize);
	}, [isVisible]);

	return (
		<section ref={sectionRef} id={project.name} className="section w-[100dvw] h-[100dvh] flex flex-col md:flex-row md:gap-12 p-4">
			{showGallery && (
				<ImageGallery
					images={project.screenshots}
					focused_image={inFocus}
					toggle_off={(_) => setShowGallery(false)}
					vp_mobile={vpMobile}
				/>
			)}

			{vpMobile && <h1 className="large text-[var(--color-icon-lang)]">{project.name}</h1>}

			<div className="relative flex-grow-0 md:h-full flex flex-col gap-2 md:gap-0 md:justify-around items-start">
				<DropDownMenu
					title="Features"
					content={<InfoCards maxWidth={15 * 16} maxHeight={11.2 * 16} infoItems={project.features}/>}
					keep_open={!vpMobile}
				/>
				<DropDownMenu
					title="What i achieved"
					content={<InfoCards maxWidth={15 * 16} maxHeight={11.2 * 16} infoItems={project.learnt}/>}
					keep_open={!vpMobile}
				/>
				<DropDownMenu
					title="Technologies used"
					content={<InfoCards maxWidth={15 * 16} maxHeight={11.2 * 16} infoItems={project.technologies}/>}
					keep_open={!vpMobile}
				/>
			</div>

			<div className="flex-grow flex flex-col gap-4 justify-around items-start mt-5">
				{!vpMobile && <h1 className="large text-[var(--color-icon-lang)]">{project.name}</h1>}

				{!showGallery && // Display screenshots only when the gallery is toggled off
					<>
						<div className="h-0 flex-grow screenshots relative w-full overflow-x-hidden flex flex-col items-center self-center overflow-x-hidden">
							{project.screenshots.names.map((screen, index) => {
								return (
									<img
										key={screen}
										className={`${vpMobile ? 'max-h-full' : 'max-h-full'} rounded cursor-pointer
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
										src={`screenshots/${project.screenshots.dir}/${vpMobile ? "mobile" : "desktop"}/${screen}`}
										onClick={(_) => handle_click_image(index)}
									/>
								);
							})}
						</div>

						{vpMobile && (
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

								<a className="self-end" href={project.link}>{project.link}</a>
							</div>
						)}
					</>
				}

				{!vpMobile && <a className="self-end" href={project.link}>{project.link}</a>}
			</div>

		</section>
	);
}
