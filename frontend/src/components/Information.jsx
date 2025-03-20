import { SlLocationPin } from "react-icons/sl";
import { IoLogoInstagram } from "react-icons/io5";
import { VscGithub } from "react-icons/vsc";
import { CgMail } from "react-icons/cg";
import { FaDiscord } from "react-icons/fa";

export default function Information() {
    return (
	<div className="flex flex-col items-end gap-1">
	    <div id="location" className="flex gap-1">
	        <SlLocationPin className={`text-[var(--color-icon-social)] text-[1.4rem]`}/>
		<p className="font-bold">Georgia/Tbilisi</p>
	    </div>
	    
	    <div className="flex items-center gap-2">
		<VscGithub className="socials"/>
		<FaDiscord className="socials"/>
		<CgMail className="socials text-[1.6rem]"/>
		<IoLogoInstagram className="socials"/>
	    </div>
	</div>
    )
}
