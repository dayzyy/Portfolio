import { useState } from "react"
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

export default function ImageGallery({images, opened, toggle_off}) {
    const [inFocus, setInFocus] = useState(0)

    const handle_click = (event, to)=> {
	event.stopPropagation()
	setInFocus(prev => prev + to)
    }

    return (
	<div className={`gallery
			${opened ? 'show-gallery' : 'hide-gallery'}
			`}
	     onClick={_ => (toggle_off(), setInFocus(0))}
	>

	<FaAngleLeft className={`arrow ${inFocus == 0 && 'opacity-0'}`}
		     onClick={inFocus == 0 ? _ => _ : e => handle_click(e, -1)}
	/>

	{
	    images.map((image, index) => {
		return (
		    <img 
			key={image}
			className={`max-w-[90%] max-h-[90%] rounded
				    ${inFocus == index 
				      ? 'show-image'
				      : (index < inFocus ? 'hide-image-left' : 'hide-image-right')}
				   `}
			src={`${image}`}
		    />
		)
	    })
	}

	<FaAngleRight className={`arrow ${inFocus == (images.length - 1) && 'opacity-0'}`}
		      onClick={inFocus == (images.length - 1) ? _ => _ : e => handle_click(e, 1)}
	/>
	</div>
    )
}
