import React from "react";

const ResolutionContext = React.createContext(null)

const ResolutionProvider = ({children}) => {
	const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
	const [windowHeight, setWindowHeight] = React.useState(window.innerHeight)

	const handle_resize = React.useCallback(() => {
		setWindowWidth(window.innerWidth)
		setWindowHeight(window.innerHeight)
	}, [])

	React.useEffect(() => {
		window.addEventListener('resize', handle_resize)
		return () => window.removeEventListener('resize', handle_resize)
	}, [handle_resize])

	return (
		<ResolutionContext.Provider value={{windowWidth, windowHeight}}>
			{children}
		</ResolutionContext.Provider>
	)
}

const useResolution = () => {
	const context = React.useContext(ResolutionContext)

	if (!context) throw new Error('useResolution must be used within ResolutionProvider!!!')
	else return context
}

export { ResolutionProvider, useResolution }
