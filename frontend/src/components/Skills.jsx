import SkillCard from "./SkillCard";
import { IoLogoJavascript } from "react-icons/io5";
import { FaReact } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa6";
import { FaCss3Alt } from "react-icons/fa6";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaPython } from "react-icons/fa6";
import { TbBrandDjango } from "react-icons/tb";

export default function Skills() {
	const skills = [
		{ language: "JavaScript", icon: <IoLogoJavascript /> },
		{ language: "React", icon: <FaReact /> },
		{ language: "HTML", icon: <FaHtml5 /> },
		{ language: "CSS", icon: <FaCss3Alt /> },
		{ language: "Tailwind", icon: <RiTailwindCssFill /> },
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
