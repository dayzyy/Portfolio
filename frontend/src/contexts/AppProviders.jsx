import React from 'react'
import { ResolutionProvider } from './ResolutionContext'

const AppProviders = ({children}) => {
	return (
		<ResolutionProvider>
			{children}
		</ResolutionProvider>
	)
}

export default AppProviders
