import { useEffect, useRef } from "react";
import ProjectBox from "./ProjectBox";
import Project from "./Project";

export default function Projects() {
	const gridRef = useRef(null)

	useEffect((_) => {
		const entries = Array.from(document.getElementsByClassName("project-box"));

		entries.push(document.getElementById("personal-projects"));

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.style.animation = "slide-x .5s ease forwards";
				}
			});
		});

		entries.forEach((entry) => {
			observer.observe(entry);
		});

		return (_) => {
			entries.forEach((entry) => {
				observer.unobserve(entry);
			});
		};
	}, []);

	useEffect(() => {
		if (!gridRef.current) return
		gridRef.current.style.height = `${gridRef.current.offsetWidth}px`
	}, [])

	const projects = [
		{
			name: "Social Media",
			features: [
				"User authentication (JWT)",
				"Chat in real time (django.channels)",
				"Real time notifications",
				"Follow and unfollow ohter users",
				"Create and delete posts",
				"React to posts with likes",
				"Add and delete comments"
			],
			technologies: [
				"Python",
				"Django",
				"JavaScript",
				"React.js",
				"Tailwindcss"
			],
			learnt: [
				"Practised user authentication and management",
				"Practised CRUD operations",
				"Practised database management and manipulation (SQLite)",
				"Got solid knowlege on websockets",
				"Practised my overall and responsive design skills"
			],
			screenshots: {
				dir: "socialMediaApp",
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
				],
			},
			link: "https://github.com/dayzyy/API-SocialMediaApp",
		},

		{
			name: "Canvas Editor",
			features: [
				"Freehand drawing",
				"Undo/Redo system",
				"Inserting shapes/images/text boxes",
				"Editing nodes (resizing, dragging, coloring, deleting)"
			],
			technologies: [
				"TypeScript",
				"React.js",
				"Konva.js",
				"Tailwindcss"
			],
			learnt: [
				"Got familiar with the Konva.js library",
				"Got familiar and fell in love with TypeScript",
				"Got deeper knowlage of data structures and manipulation via creating a undo/redo system using a doubly linked list",
				"Practised node management and manipulation",
				"Practised my overall and responsive design skills"
			],
			screenshots: {
				dir: "canvasEditorApp",
				names: [
					"canvas.png",
					"pannel.png",
					"freehand.png",
					"images.png",
					"shapes.png"
				],
			},
			link: "https://github.com/dayzyy/CanvasEditorApp",
		},

		{
			name: "Weather Forecast",
			features: [
				"Proivde weather information for specified locations",
				"Tempreture",
				"Condition",
				"Humidity",
				"Wind speed",
				"Sun rise/set"
			],
			technologies: [
				"JavaScript",
				"React.js",
				"Tailwindcss"
			],
			learnt: [
				"Practised working with an external API",
				"Practised CRUD operations",
				"Practised my overall and responsive design skills"
			],
			screenshots: {
				dir: "weatherApp",
				names: [
					"home1.png",
					"home2.png",
					"info1.png",
					"info2.png",
					"info3.png",
				],
			},
			link: "https://github.com/dayzyy/API-WeatherForecastApp",
		},

		{
			name: "Ecommerce",
			features: [
				"User authentication (JWT)",
				"Put products to sell from admin side",
				"View products",
				"Add products to cart",
				"Order products",
				"Filter products"
			],
			technologies: [
				"Python",
				"Django",
				"JavaScript",
				"React.js",
				"Tailwindcss"
			],
			learnt: [
				"Got familiar with the Django framework",
				"Practised user authentication and management",
				"Practised CRUD operations",
				"Practised database management and manipulation (SQLite)",
			],
			screenshots: {
				dir: "ecommerceApp",
				names: [
					"feed.png",
					"item.png",
					"cart1.png",
					"cart2.png",
					"settings.png",
					"categories.png",
				],
			},
			link: "https://github.com/dayzyy/API-EcommerceApp",
		},
	];

	return (
		<div>
			<section className="section w-screen h-screen flex flex-col items-center justify-center gap-10">
				<h1 id="personal-projects" className="large text-center">
					Here are some of my personal projects
				</h1>
				<div ref={gridRef} className="w-[20rem] h-[20rem] md:w-[25rem] md:h-[25rem] lg:w-[30rem] lg:h-[30rem] border border-black grid grid-cols-2 gap-[1rem]">
					{projects.map((project) => (
						<ProjectBox project={project} key={project.name} />
					))}
				</div>
			</section>
			{projects.map((project) => (
				<Project key={project.name} project={project} is_shown={true} />
			))}
		</div>
	);
}
