import { useEffect, useState } from "react"

export default function Logo() {
    const [text, setText] = useState([])
    const [hideCursor, setHideCursor] = useState(true)
    const logo_word = '@dayzyy'

    useEffect(_ => {
	setTimeout(_ => {
	    setHideCursor(false)

	    setTimeout(_ => {
		logo_word.split("").forEach((letter, index) => {
		    setTimeout(_ => {
			setText(prev => {
			    const new_text = [...prev]
			    new_text[index] = letter
			    return new_text
			})

			if (index == logo_word.length - 1) setHideCursor(true)
		    }, 135 * index)
		})
	    }, 100)
	}, 300)
    }, [])

    return (
	<div id="logo" className="flex gap-[.1rem] items-end">
	    <h1>{'<'}</h1>
	    <h1>{text.join("")}</h1>
	    {!hideCursor && <div className="h-[26px] w-[13px] bg-[var(--color-text-primary)] mb-1"></div>}
	    <h1>{'/'}</h1>
	    <h1>{'>'}</h1>
	</div>
    )
}
