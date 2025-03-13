import { useEffect } from "react";
import Project from "./Project.jsx";

export default function Projects() {
    useEffect(_ => {
	const entries = Array.from(document.getElementsByClassName('project-box'))

	const observer = new IntersectionObserver(entries => {
	    entries.forEach(entry => {
		if (entry.isIntersecting) {
		    entry.target.style.animation = 'slide-x .4s ease forwards'
		}
	    })
	})

	const handle_click = event => {
	    const element = event.currentTarget.closest('.project-box')

	    setTimeout(_ => {
		element.scrollIntoView({
		    behavior: 'smooth',
		    block: 'center',
		})
	    }, 200)
	}

	entries.forEach(entry => {
	    observer.observe(entry)
	    entry.onclick = handle_click
	})

	return _ => {
	    entries.forEach(entry => {
		observer.unobserve(entry)
		entry.onclick = null
	    })
	}
    }, [])

    const projects = [
	{
	 name: 'Social Media App',
	 description: "Rmedia is a social media application i built with Django and React. It features user authentication (JWT), real-time chat (Django Channels), and live notifications. Users can add friends, share posts, like and comment, and receive updates on follower activity. The frontend is styled with Tailwind CSS, ensuring a modern UI.",
	 screenshots: [
	     "screenshots/socialMediaApp/signup1.png",
	     "screenshots/socialMediaApp/signup2.png",
	     "screenshots/socialMediaApp/feed.png",
	     "screenshots/socialMediaApp/myprofile.png",
	     "screenshots/socialMediaApp/friendprofile.png",
	     "screenshots/socialMediaApp/friends.png",
	     "screenshots/socialMediaApp/notifications.png",
	     "screenshots/socialMediaApp/directs.png",
	     "screenshots/socialMediaApp/chat.png",
	 ]
	},

	{
	 name: 'Weather Forecast App',
	 description: "A sleek and minimal weather forecast application built with React and Tailwind CSS. It fetches real-time weather data from an external API, providing details such as temperature, humidity, wind speed, and sunrise/sunset times. Users can view the current day's weather and, with a click, access a week-long forecast.",
	 screenshots: [
	     "screenshots/socialMediaApp/signup1.png",
	     "screenshots/socialMediaApp/signup2.png",
	     "screenshots/socialMediaApp/feed.png",
	     "screenshots/socialMediaApp/myprofile.png",
	     "screenshots/socialMediaApp/friendprofile.png",
	     "screenshots/socialMediaApp/friends.png",
	     "screenshots/socialMediaApp/notifications.png",
	     "screenshots/socialMediaApp/directs.png",
	     "screenshots/socialMediaApp/chat.png",
	 ]
	},

	{
	 name: 'Ecommerce App',
	 description: "A simple yet functional e-commerce platform where admins can add, manage, and update products, while users can browse, add items to their cart, and place orders. Built with Django and React, it features user authentication, product management, and a seamless shopping experience.",
	 screenshots: [
	     "screenshots/socialMediaApp/signup1.png",
	     "screenshots/socialMediaApp/signup2.png",
	     "screenshots/socialMediaApp/feed.png",
	     "screenshots/socialMediaApp/myprofile.png",
	     "screenshots/socialMediaApp/friendprofile.png",
	     "screenshots/socialMediaApp/friends.png",
	     "screenshots/socialMediaApp/notifications.png",
	     "screenshots/socialMediaApp/directs.png",
	     "screenshots/socialMediaApp/chat.png",
	 ]
	},

    ]

    return (<>
	{
	    projects.map(project => <Project key={project.name} name={project.name} description={project.description} screenshots={project.screenshots}/>)
	}
    </>)
}
