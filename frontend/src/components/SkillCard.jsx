export default function SkillCard({skill}) {
    return (
	<div className="skillcard h-[8rem] w-[8rem] bg-[var(--color-bg-card)] rounded-2xl flex flex-col items-center px-2 py-3">
	    <div className="flex-grow grid place-items-center text-6xl text-[var(--color-icon-lang)]">
		{skill.icon}
	    </div>


	    <div style={{fontSize: 'var(--size-text-medium)'}} className="text-[var(--color-text-icon)] font-bold">
		<h2 className="text-[var(--color-text-icon)]">{skill.language}</h2>
	    </div>
	</div>
    )
}
