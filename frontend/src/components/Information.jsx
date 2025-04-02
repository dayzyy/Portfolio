import { SlLocationPin } from "react-icons/sl";
import { VscGithub } from "react-icons/vsc";
import { CgMail } from "react-icons/cg";
import { ImLinkedin } from "react-icons/im";

export default function Information() {
    return (
	<div className="flex flex-col items-end gap-1">
	    <div id="location" className="flex gap-1">
	        <SlLocationPin className={`text-[var(--color-icon-social)] text-[1.4rem]`}/>
		<p className="font-bold">Georgia/Tbilisi</p>
	    </div>
	    
	    <div className="flex items-center gap-3">
		<div className="flex items-center gap-2">
		    <a className="socials" href="https://github.com/dayzyy"target="_blank" rel="noopener noreferrer"><VscGithub className="text-[1.3rem]"/></a>
		    <a className="socials" href="mailto:manialuka19@gmail.com" target="_blank" rel="noopener noreferrer"><CgMail className="text-[1.6rem]"/></a>
		    <a className="socials" href="https://www.linkedin.com/in/luka-mania-ab330a35a/" target="_blank" rel="noopener noreferrer"><ImLinkedin className="text-[1.2rem]"/></a>
		</div>
	    </div>
	</div>
    )
}
