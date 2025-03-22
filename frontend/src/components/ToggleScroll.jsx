import { useState, useEffect } from "react"

export default function ToggleScroll() {
    const [toggled, setToggled] = useState(_ => {
	const savedValue = localStorage.getItem('scroll-snap')
	return savedValue ? JSON.parse(savedValue) : true
    })

    const toggle = _ => {
	setToggled(prev => {
	    localStorage.setItem('scroll-snap', !prev)
	    document.querySelector('main').style.scrollSnapType = prev ? 'none' : 'y mandatory'
	    return !prev
	})
    }

    useEffect(_ => {
	const box = document.querySelector('.glowing-floor')
	box.style.setProperty('--pseudo-before-shadow', toggled ? '0 -4px 5px var(--color-glow-on)' : '0 -4px 5px var(--color-glow-off)')
    }, [toggled])

    useEffect(_ => {
	//disable scrolling for first 2800ms after page loads, to wait for the start animations to finish
	const main = document.querySelector('main')
	main.style.overflowY = 'hidden'

	setTimeout(_ => {
	    main.style.overflowY = 'auto'
	    main.style.scrollSnapType = toggled ? 'y mandatory' : 'none'
	}, 2800)

	const load = _ => {
	    history.scrollRestoration = "manual"
	    window.scrollTo(0, 0)
	}

	window.addEventListener('load', load)

	return _ => window.removeEventListener('load', load)
    }, [])

    return (
	<div onClick={toggle} className="self-end toggle-scroll flex items-end gap-4 cursor-pointer">
	    <div className="glowing-floor flex px-2 py-1 items-end">
		<h2 className={`${toggled ? '' : 'translate-x-[250%]'}`}>
		    {toggled ? 'on' : 'off'}
		</h2>    
	    </div>
	
	    <h3>auto-scroll</h3>
	</div>
    )
}
