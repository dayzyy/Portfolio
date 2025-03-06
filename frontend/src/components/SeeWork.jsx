import { FaAngleDown } from "react-icons/fa6";

export default function SeeWork() {
    return (
	<div id="work" className="flex items-center gap-4">
	    <p>see my work</p>
	    <div className="flex flex-col text-[var(--color-text-primary)]">
		<FaAngleDown/>
		<FaAngleDown/>
		<FaAngleDown/>
	    </div>
	</div>
    )
}
