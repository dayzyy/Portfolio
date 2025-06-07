import SkillCard from "./SkillCard";
import { SiTypescript } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { SiKonva } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaPython } from "react-icons/fa6";
import { TbBrandDjango } from "react-icons/tb";

export default function Skills() {
	const skills = [
		{ language: "TypeScript", icon: <SiTypescript /> },
		{ language: "React.js", icon: <FaReact /> },
		{ language: "Konva.js", icon: <SiKonva /> },
		{ language: "TailwindCSS", icon: <RiTailwindCssFill /> },
		{ language: "Python", icon: <FaPython /> },
		{ language: "Django", icon: <TbBrandDjango /> },
	];

	return (
		<div className="flex gap-8 flex-wrap">
			{skills.map((skill) => (
				<SkillCard key={skill.language} skill={skill} />
			))}
		</div>
	);
}
