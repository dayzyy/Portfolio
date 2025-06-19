import React from "react"
import DropDownMenu from "./DropDownMenu.jsx";
import InfoCards from "./InfoCards.jsx"

const DropDowns = ({vpMobile, project}) => {
	const [toggled, setToggled] = React.useState(0)

	return (
		<div className="relative flex-grow-0 md:h-full flex flex-col gap-2 md:gap-0 md:justify-around items-start">
			<DropDownMenu
				title="Features"
				content={<InfoCards maxWidth={15 * 16} maxHeight={11.2 * 16} infoItems={project.features}/>}
				keep_open={!vpMobile} interfere={toggled != 1} onToggle={() => setToggled(prev => prev == 1 ? 0 : 1)}
			/>
			<DropDownMenu
				title="What i achieved"
				content={<InfoCards maxWidth={15 * 16} maxHeight={11.2 * 16} infoItems={project.learnt}/>}
				keep_open={!vpMobile} interfere={toggled != 2} onToggle={() => setToggled(prev => prev == 2 ? 0 : 2)}
			/>
			<DropDownMenu
				title="Technologies used"
				content={<InfoCards maxWidth={15 * 16} maxHeight={11.2 * 16} infoItems={project.technologies}/>}
				keep_open={!vpMobile} interfere={toggled != 3} onToggle={() => setToggled(prev => prev == 3 ? 0 : 3)}
			/>
		</div>
	)
}

export default DropDowns
