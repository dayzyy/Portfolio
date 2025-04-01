import { VscGithub } from "react-icons/vsc";
import { CgMail } from "react-icons/cg";
import { FaDiscord } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import { FaSquareFacebook } from "react-icons/fa6";

export default function SocialsBar() {
    const socials = [
	<VscGithub className="text-[3.2rem]"/>,
	<CgMail className="text-[3.7rem]"/>,
	<FaDiscord className="text-[3.4rem]"/>,
	<ImLinkedin className="text-[3rem]"/>,
	<FaSquareFacebook className="text-[3.5rem]"/>,
    ]

    return (
	<div className="flex flex-col items-center gap-4 w-[80%] md:w-[40rem] select-none">
	    <div id="socials-bar" className="rounded-xl flex flex-wrap items-center justify-center gap-10 p-4 overflow-scroll">
		{
		    socials.map((social, index) => {
			return (
			    <span key={`icon ${index}`}>
				{social}
			    </span>
			)
		    })
		}
	    </div>

	    <p id="click-to-see" className="font-bold cursor-pointer">click to see all</p>
	</div>
    )
}
