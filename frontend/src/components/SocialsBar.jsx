import { VscGithub } from "react-icons/vsc";
import { CgMail } from "react-icons/cg";
import { FaDiscord } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import { FaSquareFacebook } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";

export default function SocialsBar() {
    const [showAlert,setShowAlert] = useState(false)
    const alertTimeout = useRef(null)

    const handle_click = _ => {
	clearTimeout(alertTimeout.current)

	navigator.clipboard.writeText('dayzyyiwnl')
	setShowAlert(true)

	alertTimeout.current = setTimeout(_ => setShowAlert(false), 800)
    }

    useEffect(_ => {
	return _ => clearTimeout(alertTimeout.current)
    }, [])

    const socials = [
	<a href="https://github.com/dayzyy"target="_blank" rel="noopener noreferrer"><VscGithub className="text-[3.2rem]"/></a>,
	<a href="mailto:lukamania.dev@gmail.com" target="_blank" rel="noopener noreferrer"><CgMail className="text-[3.7rem]"/></a>,
	<div className="relative grid place-items-center">
	    {showAlert && 
		<div className={`absolute w-fit -top-10 z-20 bg-[var(--color-bg-sidebar)] py-1 px-3 rounded-xl`}>
		    <p className="whitespace-nowrap">username copied!</p>
		</div>
	    }
	    <FaDiscord className="text-[3.4rem]" onClick={handle_click}/>
	</div>,
	<a href="https://www.linkedin.com/in/luka-mania-ab330a35a/" target="_blank" rel="noopener noreferrer"><ImLinkedin className="text-[3rem]"/></a>,
	<a href="https://www.facebook.com/luka.mania.3745/" target="_blank" rel="noopener noreferrer"><FaSquareFacebook className="text-[3.5rem]"/></a>
    ]

    return (
	<div id="socials-box"  className="flex flex-col items-center gap-4 max-w-[80%] select-none">
	    <div id="socials-bar" className="rounded-xl flex flex-wrap items-center justify-center gap-10 p-4">
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
	    <p className="font-bold">You can also find me here</p>
	</div>
    )
}
