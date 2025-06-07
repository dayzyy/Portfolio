const listeners = new Map()

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			listeners.get(entry.target)?.(true)
		} else {
			listeners.get(entry.target)?.(false)
		}
	})
}, {threshold: .5})

const observe = (element, callback) => {
	if (element) {
		listeners.set(element, callback)
		observer.observe(element)
	}
}

const unobserve = (element) => {
	if (element) {
		observer.unobserve(element)
		listeners.delete(element)
	}
}

export { observe, unobserve }
