import {useEffect, useState} from "react"

import Logo from "./components/Logo.jsx"
import CV from "./components/CV.jsx"

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'original')

  useEffect(_ => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])
  

  return (
      <main className="bg-[var(--color-bg)]">
      	<section className="h-screen w-screen p-4">
	    <header className="flex justify-between items-center">
		<h1 style={{fontSize: 'var(--size-text-heading)', fontFamily: 'var(--font-family-heading)'}} className="text-[var(--color-text-logo)]  font-bold"><Logo/></h1>
		<CV/>
	    </header>
      	</section>
      </main>
  )
}
