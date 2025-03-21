import { useState, useEffect } from "react"

export default function Theme() {
    const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme')) || {name: "original", color: "#64748B" })
    const [isActive, setIsActive] = useState(false)

    const themes = [
	{name: "dark", color: "#1E293B" },
	{name: "original", color: "#64748B" },
	{name: "light", color: "#E2E8F0" },
	{name: "retro", color: "#C2410c" },
	{name: "solarized", color: "#268BD2" },
	{name: "neon", color: "#F472B6" },
	{name: "forest", color: "#2D6A4F" },
	{name: "grape", color: "#5B21B6" },
    ]

    const toggle_theme = _ => {
	    setTheme(prev => {
		const last_index = themes.findIndex(t => t.name == prev.name)
		return themes[last_index != themes.length - 1 ? last_index + 1 : 0]
	    })
    }

    useEffect(_ => {
	//set theme
	document.documentElement.setAttribute('data-theme', theme.name)
	localStorage.setItem('theme', JSON.stringify(theme))
    }, [theme])

    useEffect(_ => {
	setTimeout(_ => {
	    setIsActive(true)
	},  3000)
    }, [])

    return (
	<div className="theme-box flex gap-8">
	    <div
		className="relative rounded-full w-[1rem] h-[1rem] grid place-items-center cursor-pointer"
		onClick={toggle_theme}
	    >
		{
		    themes.map(t => {
			return (
			    <div key={t.name}
				 className={`theme-circle 
					    ${theme.name == t.name ? 'show-theme' : 'hide-theme'}
					    ${isActive ? 'active' : ''}
					   `}
				 style={{backgroundColor: t.color}}>
			    </div>
			)
		    })
		}
	    </div>

	    <p onClick={toggle_theme} className="cursor-pointer select-none">"{theme.name}"</p>
	</div>
    )
}
