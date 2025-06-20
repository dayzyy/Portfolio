export default function CV() {
	return (
		<div
			id="CV"
			className="grid place-items-center px-3 py-2 border rounded-md border-[var(--color-text-secondary)] cursor-pointer scale-0 select-none"
			onClick={(_) => window.open("documents/CV.pdf", "_blank")}
		>
			<h3>Download CV</h3>
		</div>
	);
}
