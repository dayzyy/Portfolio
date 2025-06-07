import { RiLoader4Fill } from "react-icons/ri";

export default function Loading() {
	return (
		<div className="flex-grow w-full h-full grid place-items-center">
			<RiLoader4Fill className="text-[#fff] text-[4rem] animate-spin" />
		</div>
	);
}
