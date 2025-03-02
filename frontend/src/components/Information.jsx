import { SlLocationPin } from "react-icons/sl";
import { IoLogoInstagram } from "react-icons/io5";
import { VscGithub } from "react-icons/vsc";

export default function Information() {
    return (
	<div className="flex flex-col items-end gap-1">
	    <div className="flex gap-1">
	        <SlLocationPin className="text-[var(--color-text-logo)] text-[1.4rem]"/>
		<p style={{fontSize: 'var(--size-text-paragraph)'}} className="font-bold text-[var(--color-text-primary)]">Georgia/Tbilisi</p>
	    </div>
	    
	    <div className="flex gap-2">
		<IoLogoInstagram className="text-[var(--color-text-logo)] text-[1.4rem]"/>
		<VscGithub className="text-[var(--color-text-logo)] text-[1.4rem]"/>
	    </div>
	</div>
    )
}
