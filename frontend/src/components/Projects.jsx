import { useEffect, useState } from "react";
import Project from "./Project.jsx";

export default function Projects() {
    const [inFocus, setInFocus] = useState(null)
    const [animationComplete, setAnimationComplete] = useState(false)

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
		if (entry.target.id == inFocus && !entry.isIntersecting) {
		    setInFocus(null)
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

    useEffect(_ => {
	if (JSON.parse(localStorage.getItem('scroll-snap'))) {
	    document.querySelector('main').style.scrollSnapType = inFocus ? 'none' : 'y mandatory'
	}
    }, [inFocus])

    useEffect(_ => {
	if (!inFocus) return

	const element = document.getElementById(inFocus)
	if (!element) return

	setTimeout(_ => {
	    element.scrollIntoView({
		behavior: 'smooth',
		block: 'start'
	    })
	}, 300)
    }, [inFocus])

    const projects = [
	{
	 name: 'Social Media',
	 description: <p>Rmedia is a social media application i built with <b>Django</b> and <b>React</b>. It features <b>user authentication (JWT), real-time chat (Django Channels), and live notifications</b>. Users can add friends, share posts, like and comment, and receive updates on follower activity. The frontend is styled with <b>Tailwind CSS</b>, ensuring a modern UI.</p>,
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
	 description: <p>A sleek and minimal weather forecast application built with <b>React</b> and <b>Tailwind CSS</b>. It fetches real-time weather data from an <b>external API</b>, providing details such as temperature, humidity, wind speed, and sunrise/sunset times. Users can view the current day's weather and, with a click, access a week-long forecast.</p>,
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
	 description: <p>A simple yet functional e-commerce platform where admins can add, manage, and update products, while users can browse, add items to their cart, and place orders. Built with <b>Django</b> and <b>React</b>, it features <b>user authentication (JWT)</b>, product management, and a seamless shopping experience.</p>,
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
	<h1 id="personal-projects" className="large">Here are some of my personal projects</h1>
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
