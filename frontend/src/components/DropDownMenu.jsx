import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const DropDownMenu = ({title, content, keep_open, interfere, onToggle}) => {

	return (
		<div className="relative min-w-fit cursor-pointer" onClick={onToggle}>
			<div className="flex items-center">
				<h2 className="whitespace-nowrap">{title}</h2>
				{!keep_open && 
					<RiArrowDropDownLine className={`ml-8 text-[2rem] ${!interfere ? 'rotate-0' : '-rotate-90'}`}/>
				}
			</div>

			<div className={`${keep_open ? 'block' : (!interfere ? 'absolute left-0 top-full z-[9999]' : 'hidden')} bg-[var(--color-bg)] p-2`}>
				{content}
			</div>
		</div>
	)
}

export default DropDownMenu
