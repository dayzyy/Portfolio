import Project from "./Project.jsx";

export default function Projects() {
    const projects = [
	{
	 name: 'Social Media App',
	 description: "Rmedia is a social media application i built with Django and React. It features user authentication (JWT), real-time chat (Django Channels), and live notifications. Users can add friends, share posts, like and comment, and receive updates on follower activity. The frontend is styled with Tailwind CSS, ensuring a modern UI."
	},

	{
	 name: 'Weather Forecast App',
	 description: "A sleek and minimal weather forecast application built with React and Tailwind CSS. It fetches real-time weather data from an external API, providing details such as temperature, humidity, wind speed, and sunrise/sunset times. Users can view the current day's weather and, with a click, access a week-long forecast."
	},

	{
	 name: 'Ecommerce App',
	 description: "A simple yet functional e-commerce platform where admins can add, manage, and update products, while users can browse, add items to their cart, and place orders. Built with Django and React, it features user authentication, product management, and a seamless shopping experience."
	},

    ]

    return (<>
	{
	    projects.map(project => <Project key={project.name} name={project.name} description={project.description}/>)
	}
    </>)
}
