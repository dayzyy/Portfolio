import { useState } from "react"

export default function Logo() {
    const [text, setText] = useState('<@dayzyy/>')

    return <h1 className="text-[var(--color-text-logo)]">{text}</h1>
}
