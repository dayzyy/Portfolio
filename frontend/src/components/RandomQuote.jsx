import { useState, useEffect, useRef } from "react"
import Loading from "./Loading"

const API = 'https://dummyjson.com/quotes/random'

export default function RandomQuote() {
    const [delay, setDelay] = useState(true)
    const [quote, setQuote] = useState(null)
    const [text, setText] = useState([])
    const [showAuthor, setShowAuthor] = useState(false)
    const [loading, setLoading] = useState(false)

    const loadingTimeout = useRef(null)
    const updateTimeout = useRef(null)

    const fetch_quote = async _ => {
	const response = await fetch(API)
	const data = await response.json()
	setQuote({text: Array.from(data.quote), author: data.author})
    }

    useEffect(_ => {
	const delayTimeout = setTimeout(_ => setDelay(false), 500)
	const fetchTimeout = setTimeout(async _ => await fetch_quote(), 500)

	return _ => {
	    clearTimeout(delayTimeout)
	    clearTimeout(fetchTimeout)
	    clearTimeout(loadingTimeout.current)
	}
    }, [])

    useEffect(_ => {
	if (!quote || delay) return
	
	const timeouts = []

	quote.text.forEach((letter, index) => {
	    timeouts.push(setTimeout(_ => {
		setText(prev => {
		    if (index == quote.text.length - 1) {
			timeouts.push(setTimeout(_ => setShowAuthor(true), 400))
		    }
		    return [...prev, letter]
		})
	    }, index * 15 ))
	})

	return _ => timeouts.forEach(t => clearTimeout(t))
    }, [quote, delay])

    const handle_click = _ => {
	clearTimeout(loadingTimeout.current)
	clearTimeout(updateTimeout.current)

	setLoading(true)
	setQuote(null)
	setText([])
	setShowAuthor(false)

	loadingTimeout.current = setTimeout(_ => setLoading(false), 500)
	updateTimeout.current = setTimeout(async _ => await fetch_quote(), 800)
    }

    if (loading || !quote) return <Loading/>

    return (
	<div id="random-quote" className="mini-program flex-grow flex flex-col gap-32 items-center pt-32">
	    <div className="min-h-[15rem] text-container flex flex-col justify-center items-center gap-8">
		<h2>"{text.join("")}"</h2>

		{quote && 
		    <h2 className={`transition-opacity duration-300 ${showAuthor ? 'opacity-100' : 'opacity-0'}`}>
		    - {quote.author}</h2>
		}
	    </div>

	    <div className="w-[80%] flex justify-end items-center pb-4">
		<div className="w-fit border rounded-md solid p-3 cursor-pointer"
		    onClick={handle_click}
		>
		    <h1 className="leading-none px-[.1rem]">new</h1>
		</div>
	    </div>
	</div>
    )
}
