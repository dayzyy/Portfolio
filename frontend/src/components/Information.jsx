import { SlLocationPin } from "react-icons/sl";
import { IoLogoInstagram } from "react-icons/io5";
import { VscGithub } from "react-icons/vsc";
import { CgMail } from "react-icons/cg";
import { FaDiscord } from "react-icons/fa";

export default function Information() {
    return (
	<div className="flex flex-col items-end gap-1">
	    <div className="flex gap-1">
	        <SlLocationPin className="text-[var(--color-text-logo)] text-[1.4rem]"/>
		<p style={{fontSize: 'var(--size-text-paragraph)'}} className="font-bold text-[var(--color-text-primary)]">Georgia/Tbilisi</p>
	    </div>
	    
	    <div className="flex items-center gap-2">
		<VscGithub className="text-[var(--color-text-logo)] text-[1.4rem]"/>
		<FaDiscord className="text-[var(--color-text-logo)] text-[1.6rem]"/>
		<CgMail className="text-[var(--color-text-logo)] text-[1.6rem]"/>
		<IoLogoInstagram className="text-[var(--color-text-logo)] text-[1.4rem]"/>
	    </div>
	</div>
    )
}
