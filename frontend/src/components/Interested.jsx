import { useEffect } from "react"
import ContactButton from "./ContactButton.jsx"

export default function Interested() {
    useEffect(_ => {
	const observer = new IntersectionObserver(entries => {
	    entries.forEach(entry => {
		if (entry.isIntersecting) {
		    if (entry.target.id == 'interested') {
			entry.target.style.animation = 'slide-x .4s ease forwards'
		    }
		    else if (entry.target.id == 'lets-work') {
			entry.target.style.animation = 'fade-in .4s ease .6s forwards'
		    }
		    else if (entry.target.id == 'send-email') {
			entry.target.style.animation = 'scale-up .4s ease 1s forwards'
		    }
		    else if (entry.target.id == 'socials-bar') {
			entry.target.style.animation = 'fade-in .4s ease 1.2s forwards'
		    }
		    else if (entry.target.id == 'click-to-see') {
			entry.target.style.animation = 'fade-in .4s ease 1.4s forwards'
		    }
		}
	    })
	})

	const entries = [
	    document.getElementById('interested'),
	    document.getElementById('lets-work'),
	    document.getElementById('send-email'),
	    document.getElementById('socials-bar'),
	    document.getElementById('click-to-see')
	]
	
	entries.forEach(entry => observer.observe(entry))

	return _ => {
	    observer.disconnect()
	}
    }, [])

    return (
	<div>
	    <div className="flex flex-col md:items-center gap-8">
		<div className="flex flex-wrap gap-4">
		    <h1 id="interested" className="large">Interested?</h1>
		    <h1 id="lets-work" className="large text-[var(--color-icon-lang)]">Let's work together!</h1>
		</div>

		<ContactButton/>
	    </div>
	</div>
    )
}
