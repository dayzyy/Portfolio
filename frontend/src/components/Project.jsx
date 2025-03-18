import { useEffect, useRef, useState } from "react";
import { TbCaretDownFilled } from "react-icons/tb";
import ImageGallery from "./ImageGallery.jsx"

import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

export default function Project({name, description, screenshots, is_shown, on_toggle}) {
    const [offScreen, setOffScreen] = useState(true)
    const [inFocus, setInFocus] = useState(0)
    const [focusToggler, setFocusToggler] = useState(null)
    const changedManually = useRef(false)
    const [showGallery, setShowGallery] = useState(false)
    const [vpMobile, setVpMobile] = useState(window.innerWidth <= 600)

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
	    setShowGallery(true)

	    setFocusToggler(prev => {
		if (prev) clearInterval(prev)
		return null
	    })
	}
    }

    const handle_click_arrow = (event, to) => {
	event.stopPropagation()
	setInFocus(prev => prev + to)
	changedManually.current = true
    }

    useEffect(_ => {
	if (is_shown) {
	    setOffScreen(false)
	} else {
	    setTimeout(_ => setOffScreen(true), 200)
	}
    }, [is_shown])

    useEffect(() => {
	if(showGallery) return

	if (!is_shown) {
	    setFocusToggler(prev => {
		if (prev) clearInterval(prev)
		return null
	    })
	    return
	}

	if (changedManually.current) changedManually.current = false

	const interval = setInterval( _ => {
	    setInFocus(prev => (prev !== screenshots.names.length - 1 ? prev + 1 : 0))
	}, 2000)
	setFocusToggler(interval)

	return _ => clearInterval(interval)
    }, [is_shown, changedManually.current, showGallery])

    useEffect(_ => {
	const handle_resize = _ => {
	    setVpMobile(window.innerWidth < 600)
	}

	if (is_shown) {
	    window.addEventListener('resize', handle_resize)
	} else {
	    window.removeEventListener('resize', handle_resize)
	}

	return _ => window.removeEventListener('resize', handle_resize)
    }, [is_shown])

    return (<>
	{
	    showGallery &&
	    <ImageGallery images={screenshots}
			  focused_image={inFocus}
			  toggle_off={_ => setShowGallery(false)}
			  vp_mobile={vpMobile}
	    />
	}

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

	    <div className={`screenshots relative flex flex-col gap-4 items-center w-full h-fit self-center
			    ${is_shown && 'slide-in'}
			    ${offScreen ? 'off-screen' : ''}
			    overflow-x-hidden`}>
		{
		    screenshots.names.map((screen, index) => {
			return (
			    <img 
				key={screen}
				className={`${vpMobile ? 'mobile-screenshot' : 'desktop-screenshot'} rounded cursor-pointer
					    ${inFocus == index 
					      ? 'show-screen'
					      : (index < inFocus ? 'hide-screen-left' : 'hide-screen-right')}
					    ${offScreen ? 'off-screen' : ''}
					   `}
				style={index == inFocus + 1 ? {zIndex: index * 200} : {zIndex: index * 10}}
				src={`screenshots/${screenshots.dir}/${vpMobile ? 'mobile' : 'desktop'}/${screen}`}
				onClick={_ => handle_click_image(index)}
			    />
			)
		    })
		}

		<div className="flex w-5/6 justify-around">
		    <FaAngleLeft className={`arrow ${inFocus == 0 && 'opacity-50'}`}
				 onClick={inFocus == 0
				     ? e => e.stopPropagation()
				     : e => handle_click_arrow(e, -1)
				 }
		    />

		    <FaAngleRight className={`arrow ${inFocus == (screenshots.names.length - 1) && 'opacity-[.1]'}`}
				  onClick={inFocus == (screenshots.names.length - 1)
				      ? e => e.stopPropagation()
				      : e => handle_click_arrow(e, 1)
				  }
		    />
		</div>
	    </div>
	</div>
    </>)
}
