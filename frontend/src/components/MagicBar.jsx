import { useState, useEffect } from "react";

import { VscTerminalCmd } from "react-icons/vsc";
import { TbTicTac } from "react-icons/tb";
import { GiSlipknot } from "react-icons/gi";
import { FaQuestion } from "react-icons/fa6";
import { MdFormatQuote } from "react-icons/md";

import MiniProject from "./MiniProject";
import CMD from "./CMD";
import TicTacToe from "./TicTacToe";
import HangMan from "./HangMan";
import RandomFact from "./RandomFact";
import RandomQuote from "./RandomQuote";
import Modal from "./Modal";

export default function MagicBar() {
    const [inFocus, setInFocus] = useState(null)

    useEffect(_ => {
	const observer = new IntersectionObserver(entries => {
	    entries.forEach((entry, index) => {
		if (entry.isIntersecting && entry.target.id == 'magic-bar') {
		    entry.target.style.animation = 'slide-y .5s ease .7s forwards'
		} else if (entry.isIntersecting) {
		    entry.target.style.animation = `scale-up .5s ease ${(3 + index) / 10}s forwards`
		}
	    })
	})

	const entries = Array.from(document.querySelectorAll('.mini-project'))
	entries.push(document.getElementById('magic-bar'))

	entries.forEach(entry => observer.observe(entry))

	return _ => entries.forEach(entry => observer.unobserve(entry))
    }, [])

    const mini_projects = [
	{icon: <VscTerminalCmd/>, description: 'cmd emulator', exe: <CMD/>},
	{icon: <TbTicTac/>, description: 'play tic-tac-toe', exe: <TicTacToe/>},
	{icon: <GiSlipknot/>, description: 'play hang-man', exe: <HangMan/>},
	{icon: <FaQuestion/>, description: 'get a random fact', exe: <RandomFact/>},
	{icon: <MdFormatQuote/>, description: 'get a random quote', exe: <RandomQuote/>},
    ]

    return (<>
	{
	    inFocus &&
	    <Modal toggle_off={_ => setInFocus(null)}>
		{inFocus}
	    </Modal>
	}

	<div id="magic-bar" className="self-center h-[80%] w-[5rem] bg-[var(--color-bg-sidebar)] rounded-xl flex flex-col justify-around items-center">
	    {
		mini_projects.map(project => {
		    return (
			<MiniProject 
			    key={project.description}
			    icon={project.icon}
			    description={project.description}
			    on_click={_ => setInFocus(project.exe)}
			/>
		    )
		})
	    }	
	</div>
    </>)
}
