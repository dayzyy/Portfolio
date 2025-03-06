import { useEffect, useState } from "react";
import { TbCaretDownFilled } from "react-icons/tb";

export default function Project({name, description}) {
    const [showAbout, setShowABout] = useState(false)
    const [inTransition, setInTransition] = useState(false)

    useEffect(_ => {
	setInTransition(true)
    }, [])

    const handle_click = _ => {
	setShowABout(prev => {
	    if (prev) {
		setTimeout(_ => {
		    setInTransition(true)
		}, 180)
	    }
	    else setInTransition(false)
	    return !prev
	})
    }

    return (
	<div id="project-box" className={`${showAbout && 'border-b-transparent'}`}>
	    <div onClick={handle_click} className={`w-full flex justify-between items-center cursor-pointer`}>
		<h1>{name}</h1>

		<div id="about-p" className="flex gap-1 items-center">
		    <p className="hidden md:block">about</p>
		    <TbCaretDownFilled className={`${!showAbout ? '-rotate-90' : 'rotate-0'}`}/>
		</div>
	    </div>

	    <p className={`${!showAbout ? '-translate-x-[100vw] opacity-0' : 'translate-x-[0] opacity-100'} ${inTransition && 'absolute'}`}>
		{description}
	    </p>
	</div>
    )
}
