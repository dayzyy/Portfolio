import { useEffect, useRef, useState } from "react";
import { TbCaretDownFilled } from "react-icons/tb";

export default function Project({name, description, screenshots}) {
    const [showAbout, setShowABout] = useState(false)
    const [offScreen, setOffScreen] = useState(true)
    const [inFocus, setInFocus] = useState(0)
    const [focusToggler, setFocusToggler] = useState(null)
    const changedManually = useRef(false)

    const handle_click_project = _ => {
	setShowABout(prev => {
	    if (prev) {
		setTimeout(_ => {
		    setOffScreen(true)
		}, 200)
	    }
	    else setOffScreen(false)
	    return !prev
	})

	setInFocus(0)
    }

    const handle_click_image = index => {
	setInFocus(index)

	setFocusToggler(prev => {
	    console.log('cleared')
	    if (prev) clearInterval(prev)
	    return null
	})
	changedManually.current = true
    }

    useEffect(() => {
	if (!showAbout) {
	    setFocusToggler(prev => {
		if (prev) clearInterval(prev)
		return null
	    })
	    return
	}

	if (changedManually.current) changedManually.current = false

	const interval = setInterval( _ => {
	    setInFocus(prev => (prev !== screenshots.length - 1 ? prev + 1 : 0))
	}, 2000)
	setFocusToggler(interval)

	return _ => clearInterval(interval)
    }, [showAbout, changedManually.current])

    return (
	<div className={`project-box ${showAbout ? 'open-box' : ''}`}>
	    <div onClick={handle_click_project} className={`w-full flex justify-between items-center cursor-pointer`}>
		<h1>{name}</h1>

		<div id="about-p" className="flex gap-1 items-center">
		    <p className="hidden md:block">about</p>
		    <TbCaretDownFilled className={`${!showAbout ? '-rotate-90' : 'rotate-0'}`}/>
		</div>
	    </div>

	    <p className={`${!showAbout ? '-translate-x-[100vw] opacity-0' : 'translate-x-[0] opacity-100'}
		${offScreen && 'absolute'}`}>
		{description}
	    </p>

	    <div className={`relative flex justify-center screenshots w-full h-fit self-center
			    ${!showAbout ? '-translate-x-[100vw] opacity-0' : 'translate-x-[0] opacity-100'}
			    ${offScreen ? 'absolute w-0 h-0' : ''}
			    overflow-x-hidden`}>
		{
		    screenshots.map((screen, index) => {
			return (
			    <img 
				key={screen}
				className={`w-full sm:max-w-[600px] md:max-w-[800px] rounded cursor-pointer
					    ${inFocus == index 
					      ? 'show-image'
					      : (index < inFocus ? 'hide-image-left' : 'hide-image-right')}
					    ${offScreen ? 'absolute w-0 h-0' : ''}
					   `}
				style={index == inFocus + 1 ? {zIndex: index * 200} : {zIndex: index * 10}}
				src={`${screen}`}
				onClick={_ => handle_click_image(index)}
			    />
			)
		    })
		}
	    </div>
	</div>
    )
}
