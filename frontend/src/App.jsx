import {useEffect, useState} from "react"

import Logo from "./components/Logo.jsx"
import CV from "./components/CV.jsx"
import Information from "./components/Information.jsx"
import Skills from "./components/Skills.jsx"

export default function App() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'original')

    useEffect(_ => {
	document.documentElement.setAttribute('data-theme', theme)
	localStorage.setItem('theme', theme)
    }, [theme])
  
    return (
	<main className="bg-[var(--color-bg)]">
	    <div className="min-h-screen min-w-screen p-4 flex flex-col gap-16">
		<header className="flex-grow-0 flex justify-between items-center overflow-x-hidden">
		    <Logo/>
		    <CV/>
		</header>

		<section className="flex-grow grid place-items-center">
		    <div className="flex flex-col gap-4 w-full md:w-[600px]">
			<div className="flex items-center justify-between">
			    <div className="flex flex-col gap-0">
				<p className="trim text-[#a5f3fc]">hi, i am</p>
				<h1 className="trim">Luka Mania</h1>
				<h2 className="trim text-[var(--color-text-secondary)]">Web Developer</h2>
			    </div>

			    <Information/>
			</div>

			<p className="text-[var(--color-text-paragraph)] leading-snug">A passionate web developer with a focus on creating intuitive, user-friendly digital experiences. I specialize in front-end development with React, and I’m always eager to explore new technologies and innovative design solutions. My goal is to build functional and visually appealing websites that not only meet user needs but also deliver exceptional performance.</p>
		    </div>
		</section>

		<section className="flex-grow flex md:justify-center">
		    <div className="flex flex-col gap-4">
			<h1>Languages and frameworks im proficient in</h1>
			<Skills/>
		    </div>
		</section>
	    </div>
	</main>
    )
}
