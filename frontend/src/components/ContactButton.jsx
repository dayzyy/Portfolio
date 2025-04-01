import { FaArrowCircleRight } from "react-icons/fa";

export default function ContactButton() {
    return (
	<a className="!no-underline"
	   href="mailto:manialuka19@gmail.com"
	   target="_blank"
	   rel="noopener noreferrer"
	>
	    <div id="send-email" className="w-fit shadow-xl rounded-xl py-4 px-6 flex items-center gap-4 bg-[var(--color-bg-sidebar)] select-none cursor-pointer">
		<h1 className="text-[var(--color-icon-lang)]">Send an email</h1>
		<FaArrowCircleRight className="text-[2rem] text-[var(--color-text-primary)]"/>
	    </div>
	</a>
    )
}
