export default function ListItem({text}) {
    return (
	<div className="slide-in-view-right flex gap-2 items-center">
	    <h4 className="text-[var(--color-text-paragraph)]">●</h4>
	    <h3 className="text-[var(--color-icon-lang)]">{text}</h3>
	</div>
    )
}

