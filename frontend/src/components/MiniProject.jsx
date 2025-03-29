import { useEffect, useRef, useState } from "react"

export default function MiniProject({icon, description, on_click, mobile_screen, scaled}) {
    const timeoutRef = useRef(null)

    const [inPreview, setInPreview] = useState(null)
    const [showDesc, setShowDesc] = useState(false)
    const [fadeDesc, setFadeDesc] = useState(false)

    const descShowTimeout = useRef(null)
    const descFadeTimeout = useRef(null)
    const projectSlideTimeout = useRef(null)

    const lefts = useRef([])

    const handle_hover = (state) => {
	if (state) {
	    timeoutRef.current = setTimeout(_ => {
		document.getElementById(description).classList.add('block')
		document.getElementById(description).classList.remove('hidden')
	    }, 100)
	} else {
	    clearTimeout(timeoutRef.current)

	    document.getElementById(description).classList.add('hidden')
	    document.getElementById(description).classList.remove('block')
	}
    }

    const handle_click = project => {
	setInPreview(prev => {
	    if (prev) {
		clearTimeout(descShowTimeout.current)
		clearTimeout(descFadeTimeout.current)
		clearTimeout(projectSlideTimeout.current)

		const prj = document.getElementById(`${prev} box`)
		prj.style.transform = ''

		setShowDesc(false)
		setFadeDesc(false)
	    } else {
		const sidebar_left = document.getElementById('magic-bar').getBoundingClientRect().left
		const prj = document.getElementById(`${project} box`)
		const left = prj.getBoundingClientRect().left - sidebar_left 
		const px = left - lefts.current[0]

		projectSlideTimeout.current = setTimeout(_ => prj.style.transform = `translateX(-${px}px)`, 200)
		descShowTimeout.current = setTimeout(_ => setShowDesc(true), 400)
		descFadeTimeout.current = setTimeout(_ => setFadeDesc(true), 500)

		return project
	    }
	    return null
	})
    }

    const mobile_click = event => {
	event.stopPropagation()
	on_click()
    }

    useEffect(_ => {
	if (!scaled) return

	const sidebar_left = document.getElementById('magic-bar').getBoundingClientRect().left
	const projects = Array.from(document.getElementsByClassName('mini-project'))

	const set_lefts = _ => {
	    lefts.current = projects.map(el => el.getBoundingClientRect().left - sidebar_left)

	    projects.forEach((el, index) => {
		el.style.left = `${lefts.current[index]}px`
	    })
	}

	set_lefts()

	window.addEventListener('resize', set_lefts)
	
	return _ => window.removeEventListener('resize', set_lefts)
    }, [scaled])

    useEffect(_ => {
	const projects = Array.from(document.getElementsByClassName('mini-project'))

	if (inPreview) {
	    projects.forEach(el => {
		if (el.id != `${inPreview} box`) {
		    el.classList.add('hidden-program')
		}
	    })
	} else {
	    projects.forEach(el => {
		el.classList.remove('hidden-program')
	    })
	}

    }, [inPreview])

    if (mobile_screen) return (
	<div className={`mini-project flex-shrink-0 w-[3rem] h-[3rem] bg-[var(--color-bg-program)] rounded-xl flex items-center px-[.75rem] cursor-pointer
		 ${inPreview && (inPreview == description ? 'shown-program' : 'cursor-text')}
		 ${showDesc ? 'gap-8' : ''}`}
	     onClick={_ => handle_click(description)}
	     id={`${description} box`}
	>

	    <i className="text-[var(--color-icon-program)] text-[150%]">{icon}</i>

	    <div className={`flex gap-4 transition-opacity duration-200
		    ${!showDesc ? 'hidden' : ''}
		    ${!fadeDesc ? 'opacity-0' : ''}
		`}
		 onClick={e => mobile_click(e)}
	    >
		<p className={`whitespace-nowrap `}
		   id={description}
		>{description}</p>

		<p className="font-bold">run</p>
	    </div>
	    
	</div>
    )

    else return (
	<div className="mini-project-wrapper w-[3rem] h-[3rem] flex justify-end">
	    <div className="mini-project flex-shrink-0 w-full h-full bg-[var(--color-bg-program)] rounded-xl flex items-center justify-end px-[.75rem] cursor-pointer"
	         onMouseEnter={_ => handle_hover(true)}
	         onMouseLeave={_ => handle_hover(false)}
		 onClick={on_click}
	    >

		<p className="hidden whitespace-nowrap opacity-0"
		   id={description}
		>{description}</p>

		<i className="text-[var(--color-icon-program)] text-[150%]">{icon}</i>
	    </div>
	</div>
    )
}

