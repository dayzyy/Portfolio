import { useEffect, useState } from "react";
import Project from "./Project.jsx";

export default function Projects() {
    const [inFocus, setInFocus] = useState(null)

    const toggle_focus = name => {
	setInFocus(prev => prev == name ? null : name)
    }

    useEffect(_ => {
	const entries = Array.from(document.getElementsByClassName('project-box'))
	entries.push(document.getElementById('personal-projects'))

	const observer = new IntersectionObserver(entries => {
	    entries.forEach(entry => {
		if (entry.isIntersecting) {
		    entry.target.style.animation = 'slide-x .5s ease forwards'
		}
	    })
	})


	entries.forEach(entry => {
	    observer.observe(entry)
	})

	return _ => {
	    entries.forEach(entry => {
		observer.unobserve(entry)
	    })
	}
    }, [])

    const projects = [
	{
	 name: 'Social Media',
	 description: "Rmedia is a social media application i built with Django and React. It features user authentication (JWT), real-time chat (Django Channels), and live notifications. Users can add friends, share posts, like and comment, and receive updates on follower activity. The frontend is styled with Tailwind CSS, ensuring a modern UI.",
	 screenshots: {
	     dir: 'socialMediaApp',
	     names: [
		 "signup1.png",
		 "signup2.png",
		 "feed.png",
		 "myprofile.png",
		 "friendprofile.png",
		 "friends.png",
		 "notifications.png",
		 "directs.png",
		 "chat.png",
	     ]
	 },
	 link: 'https://github.com/dayzyy/API-SocialMediaApp'
	},

	{
	 name: 'Weather Forecast',
	 description: "A sleek and minimal weather forecast application built with React and Tailwind CSS. It fetches real-time weather data from an external API, providing details such as temperature, humidity, wind speed, and sunrise/sunset times. Users can view the current day's weather and, with a click, access a week-long forecast.",
	 screenshots: {
	     dir: 'weatherApp',
	     names: [
		 "home1.png",
		 "home2.png",
		 "info1.png",
		 "info2.png",
		 "info3.png",
	     ]
	 },
	 link: 'https://github.com/dayzyy/API-WeatherForecastApp'
	},

	{
	 name: 'Ecommerce',
	 description: "A simple yet functional e-commerce platform where admins can add, manage, and update products, while users can browse, add items to their cart, and place orders. Built with Django and React, it features user authentication, product management, and a seamless shopping experience.",
	 screenshots: {
	     dir: 'ecommerceApp',
	     names: [
		 "feed.png",
		 "item.png",
		 "cart1.png",
		 "cart2.png",
		 "settings.png",
		 "categories.png"
	     ]
	 },
	 link: 'https://github.com/dayzyy/API-EcommerceApp'
	},

    ]

    return (<div className="w-full flex flex-col gap-12">
	<h1 id="personal-projects">Here are some of my personal projects</h1>
	{
	    projects.map(project => {
		return (
		    <Project key={project.name}
			     name={project.name}
			     description={project.description}
			     screenshots={project.screenshots}
			     link={project.link}
			     is_shown={inFocus == project.name}
			     on_toggle={_ => toggle_focus(project.name)}
		    />
		)
	    })
	}
    </div>)
}
