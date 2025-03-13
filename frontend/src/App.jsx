import {useEffect, useState} from "react"
import Logo from "./components/Logo.jsx"
import CV from "./components/CV.jsx"
import Information from "./components/Information.jsx"
import Skills from "./components/Skills.jsx"
import SeeWork from "./components/SeeWork.jsx"	
import Projects from "./components/Projects.jsx"

export default function App() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'original')

    useEffect(_ => {
	document.documentElement.setAttribute('data-theme', theme)
	localStorage.setItem('theme', theme)
    }, [theme])
  
    return (
	<main className="bg-[var(--color-bg)] overflow-hidden">
	    <div className="min-h-screen w-screen p-4 flex flex-col gap-16">
		<header className="flex-grow-0 flex justify-between items-center">
		    <Logo/>
		    <CV/>
		</header>

		<section className="flex-grow grid place-items-center">
		    <div className="flex flex-col gap-4 w-full md:w-[600px]">
			<div id="intro" className="flex items-center justify-between">
			    <div className="flex flex-col gap-0">
				<p className="trim text-[#a5f3fc]">hi, i am</p>
				<h1 className="trim">Luka Mania</h1>
				<h2 className="trim text-[var(--color-text-secondary)]">Web Developer</h2>
			    </div>

			    <Information/>
			</div>

			<p id="about" className="text-[var(--color-text-paragraph)] leading-snug">A passionate web developer with a focus on creating intuitive, user-friendly digital experiences. I specialize in front-end development with React, and I’m always eager to explore new technologies and innovative design solutions. My goal is to build functional and visually appealing websites that not only meet user needs but also deliver exceptional performance.</p>
		    </div>
		</section>

		<section className="flex-grow flex md:justify-center">
		    <div id="skills" className="flex flex-col gap-4">
			<h1>Languages and frameworks im proficient in</h1>
			<Skills/>
		    </div>
		</section>

		<section className="w-full flex justify-end">
		    <SeeWork/>
		</section>
	    </div>

	    <div className="w-screen pb-[8rem] p-4 flex">
		<section className="w-full flex flex-col items-center gap-12">
		    <Projects/>
		</section>
	    </div> 
	</main>
    )
}
