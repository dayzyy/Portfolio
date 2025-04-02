import { useEffect } from "react"
import ContactButton from "./ContactButton.jsx"
import SocialsBar from "./SocialsBar.jsx"

export default function Interested() {
    useEffect(_ => {
	const observer = new IntersectionObserver(entries => {
	    entries.forEach(entry => {
		if (entry.isIntersecting) {
		    if (entry.target.id == 'interested') {
			entry.target.style.animation = 'slide-x .4s ease forwards'
		    }
		    else if (entry.target.id == 'lets-work') {
			entry.target.style.animation = 'fade-in .4s ease .5s forwards'
		    }
		    else if (entry.target.id == 'send-email') {
			entry.target.style.animation = 'scale-up .4s ease .6s forwards'
		    }
		    else if (entry.target.id == 'socials-box') {
			entry.target.style.animation = 'fade-in .4s ease .6s forwards'
		    }
		}
	    })
	})

	const entries = [
	    document.getElementById('interested'),
	    document.getElementById('lets-work'),
	    document.getElementById('send-email'),
	    document.getElementById('socials-box'),
	]
	
	entries.forEach(entry => observer.observe(entry))

	return _ => {
	    observer.disconnect()
	}
    }, [])

    return (
	    <div className="w-full flex flex-col items-center justify-around gap-20">
		<div className="flex flex-col md:flex-row md:items-center gap-4">
		    <h1 id="interested" className="large leading-1">Interested?</h1>
		    <h1 id="lets-work" className="large text-[var(--color-icon-lang)]">Let's work together!</h1>
		</div>

		<ContactButton/>

		<SocialsBar/>
	    </div>
    )
}
