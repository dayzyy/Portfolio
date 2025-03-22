export default function Language({language, description}) {
    return (
	<div className="slide-in-view flex flex-col gap-2 md:flex-row md:items-end">
	    <h2 className="text-[var(--color-icon-lang)]">{language} - </h2>
	    <h3 className="pb-[.1rem]">{description}</h3>
	</div>
    )
}

