import { useEffect, useRef, useState } from "react";
import { TbCaretDownFilled } from "react-icons/tb";

export default function Project({name, description, screenshots, is_shown, on_toggle, on_image_click, gallery_shown}) {
    const [offScreen, setOffScreen] = useState(true)
    const [inFocus, setInFocus] = useState(0)
    const [focusToggler, setFocusToggler] = useState(null)
    const changedManually = useRef(false)

    const handle_click_project = _ => {
	on_toggle()
	setInFocus(0)
    }

    const handle_click_image = index => {
	if(inFocus != index) {
	    setInFocus(index)

	    setFocusToggler(prev => {
		if (prev) clearInterval(prev)
		return null
	    })
	    changedManually.current = true
	}
	else {
	    on_image_click()

	    setFocusToggler(prev => {
		if (prev) clearInterval(prev)
		return null
	    })
	}
    }

    useEffect(_ => {
	if (is_shown) {
	    setOffScreen(false)
	} else {
	    setTimeout(_ => setOffScreen(true), 200)
	}
    }, [is_shown])

    useEffect(() => {
	if(gallery_shown) return

	if (!is_shown) {
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
    }, [is_shown, changedManually.current, gallery_shown])

    return (
	<div className={`project-box ${is_shown ? 'open-box' : ''}`}>
	    <div onClick={handle_click_project} className={`w-full flex justify-between items-center cursor-pointer`}>
		<h1>{name}</h1>

		<div id="about-p" className="flex gap-1 items-center">
		    <p className="hidden md:block">about</p>
		    <TbCaretDownFilled className={`${!is_shown ? '-rotate-90' : 'rotate-0'}`}/>
		</div>
	    </div>

	    <p className={`${!is_shown ? '-translate-x-[100vw] opacity-0' : 'translate-x-[0] opacity-100'}
		${offScreen && 'off-screen'}`}>
		{description}
	    </p>

	    <div className={`relative flex justify-center screenshots w-full h-fit self-center
			    ${!is_shown ? '-translate-x-[100vw] opacity-0' : 'translate-x-[0] opacity-100'}
			    ${offScreen ? 'off-screen' : ''}
			    overflow-x-hidden`}>
		{
		    screenshots.map((screen, index) => {
			return (
			    <img 
				key={screen}
				className={`w-full sm:max-w-[600px] md:max-w-[800px] rounded cursor-pointer
					    ${inFocus == index 
					      ? 'show-screen'
					      : (index < inFocus ? 'hide-screen-left' : 'hide-screen-right')}
					    ${offScreen ? 'off-screen' : ''}
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
