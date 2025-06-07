import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const DropDownMenu = ({title, content, keep_open}) => {
	const [toggled, setToggled] = React.useState(false)

	return (
		<div className="relative min-w-fit">
			<div className="flex items-center">
				<h2 className="whitespace-nowrap">{title}</h2>
				{!keep_open && 
					<RiArrowDropDownLine 
					className={`ml-8 text-[2rem] ${toggled ? 'rotate-0' : '-rotate-90'}`}
					onClick={() => setToggled(prev => !prev)}
					/>
				}
			</div>

			<div className={`${keep_open ? 'block' : toggled ? 'absolute left-0 top-full z-[9999]' : 'hidden'} bg-[var(--color-bg)] p-2`}>
				{content}
			</div>
		</div>
	)
}

export default DropDownMenu
