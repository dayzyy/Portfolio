import { IoIosClose } from "react-icons/io";

export default function Modal({children, toggle_off}) {
    return (
	<div className="fixed top-0 left-0 w-screen h-screen bg-[#1a1a1a] opacity-900 flex flex-col justify-center">
	    <IoIosClose className="text-[5rem] text-white" onClick={toggle_off}/>
	    {children}
	</div>
    )
}
