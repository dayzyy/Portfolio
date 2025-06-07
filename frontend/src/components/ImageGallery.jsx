import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

export default function ImageGallery({
	images,
	focused_image,
	toggle_off,
	vp_mobile,
}) {
	const [inFocus, setInFocus] = useState(focused_image);

	useEffect((_) => {
		document.documentElement.style.overflow = "hidden";
		return (_) => (document.documentElement.style.overflow = "auto");
	});

	const handle_click = (event, to) => {
		event.stopPropagation();
		setInFocus((prev) => prev + to);
	};

	if (!vp_mobile) {
		return (
			<div className={`gallery`} onClick={toggle_off}>
				<FaAngleLeft
					className={`arrow ${inFocus == 0 && "opacity-50"} text-[#fff]`}
					onClick={
						inFocus == 0
							? (e) => e.stopPropagation()
							: (e) => handle_click(e, -1)
					}
				/>

				{images.names.map((image, index) => {
					return (
						<img
							key={image}
							className={`max-w-[90%] max-h-[90%] rounded
					${
						inFocus == index
							? "show-image"
							: index < inFocus
								? "hide-image-left"
								: "hide-image-right"
					}
				       `}
							src={`screenshots/${images.dir}/desktop/${image}`}
						/>
					);
				})}

				<FaAngleRight
					className={`arrow ${inFocus == (images.names.length - 1) && "opacity-[.1]"} text-[#fff]`}
					onClick={
						inFocus == images.names.length - 1
							? (e) => e.stopPropagation()
							: (e) => handle_click(e, 1)
					}
				/>
			</div>
		);
	} else {
		return (
			<div
				className={`gallery flex flex-col justify-start gap-12 py-4 overflow-y-scroll`}
			>
				<IoIosClose
					className="text-gray-500 text-[5rem] self-start opacity-70 fixed cursor-pointer"
					onClick={toggle_off}
				/>
				{images.names.map((image) => {
					return (
						<img
							key={image}
							className={`max-w-[90%] max-h-[800px] rounded`}
							src={`screenshots/${images.dir}/mobile/${image}`}
						/>
					);
				})}
			</div>
		);
	}
}
