import {useEffect, useState} from "react"

import Logo from "./components/Logo.jsx"
import CV from "./components/CV.jsx"
import Information from "./components/Information.jsx"

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'original')

  useEffect(_ => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])
  
  return (
      <main className="bg-[var(--color-bg)]">
      	<div className="h-screen w-screen p-4 flex flex-col">
	    <header className="flex justify-between items-center flex-grow-0">
		<h1 style={{fontSize: 'var(--size-text-heading)', fontFamily: 'var(--font-family-heading)'}} className="text-[var(--color-text-logo)]  font-bold"><Logo/></h1>
		<CV/>
	    </header>

	    <section className="flex-grow grid place-items-center">
		<div className="flex flex-col gap-4 w-full md:w-[600px]">
		    <div className="flex items-center justify-between">
			<div className="flex flex-col gap-0">
			    <p className="trim text-[#a5f3fc]">hi, i am</p>
			    <p style={{fontSize: 'var(--size-text-heading)'}} className="trim text-[var(--color-text-primary)] font-bold">Luka Mania</p>
			    <p style={{fontSize: 'var(--size-text-medium)'}} className="trim text-[var(--color-text-secondary)] font-bold" >Web Developer</p>
			</div>

			<Information/>
		    </div>

		    <p style={{fontSize: 'var(--size-text-paragraph)', fontFamily: 'var(--font-family-text)'}} className="text-[var(--color-text-paragraph)] leading-snug">A passionate web developer with a focus on creating intuitive, user-friendly digital experiences. I specialize in front-end development with React, and I’m always eager to explore new technologies and innovative design solutions. My goal is to build functional and visually appealing websites that not only meet user needs but also deliver exceptional performance.</p>
		</div>


	    </section>
      	</div>
      </main>
  )
}
