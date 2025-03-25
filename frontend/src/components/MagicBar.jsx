import { VscTerminalCmd } from "react-icons/vsc";
import { TbTicTac } from "react-icons/tb";
import { GiSlipknot } from "react-icons/gi";
import { FaQuestion } from "react-icons/fa6";
import { MdFormatQuote } from "react-icons/md";

import MiniProject from "./MiniProject";

export default function MagicBar() {
    const mini_projects = [
	{icon: <VscTerminalCmd/>, description: 'cmd emulator'},
	{icon: <TbTicTac/>, description: 'play tic-tac-toe'},
	{icon: <GiSlipknot/>, description: 'play hang-man'},
	{icon: <FaQuestion/>, description: 'get a random fact'},
	{icon: <MdFormatQuote/>, description: 'get a random quote'},
    ]

    return (
	<div id="magic-bar" className="self-center h-[80%] w-[5rem] bg-[var(--color-bg-sidebar)] rounded-xl flex flex-col justify-around items-center">
	    {
		mini_projects.map(project => {
		    return (
			<MiniProject 
			    key={project.description}
			    icon={project.icon}
			    description={project.description}
			/>
		    )
		})
	    }	
	</div>
    )
}
