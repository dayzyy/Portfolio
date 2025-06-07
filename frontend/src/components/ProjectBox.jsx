const ProjectBox = ({ project }) => {
	const scroll_to_project_page = () => {
		const section = document.getElementById(project.name)
		if (section) {
			console.log("Section found!", section)
			section.scrollIntoView({behavior: "smooth"})
		}
	}

	return (
		<div className="relative" onClick={scroll_to_project_page}>
			<div
				className="w-full h-full bg-cover bg-center relative"
				style={{
					backgroundImage: `url(/Portfolio/screenshots/${project.screenshots.dir}/desktop/${project.screenshots.display_img_name})`,
				}}
			></div>

			<div
				className="w-full h-full absolute top-0 left-0
			    bg-[var(--color-overlay)] grid place-items-center
			    hover:opacity-0 select-none cursor-pointer transition-opacity duration-100"
			>
				<h2 className="text-[var(--color-icon-lang)] text-center">{project.name}</h2>
			</div>
		</div>
	);
};

export default ProjectBox;
