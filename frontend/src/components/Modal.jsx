import { IoMdArrowRoundBack } from "react-icons/io";

export default function Modal({children, toggle_off}) {
    return (
	<div className="modal fixed top-0 left-0 w-screen h-screen bg-[#1a1a1a] opacity-0 flex flex-col justify-center p-4 z-50">
	    <IoMdArrowRoundBack className="text-[3rem] cursor-pointer" onClick={toggle_off}/>
	    {children}
	</div>
    )
}
