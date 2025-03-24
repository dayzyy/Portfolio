export default function Language({language, description}) {
    return (
	<div className="slide-in-view-left flex flex-col gap-1 sm:flex-row sm:items-end md:gap-2">
	    <h2 className="text-[var(--color-icon-lang)]">{language} - </h2>
	    <h3 className="pb-[.1rem]">{description}</h3>
	</div>
    )
}

