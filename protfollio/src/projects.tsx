import React, { useEffect, useState } from 'react';
import { client } from '../public/lib/sanity';

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  projectLink: string;
  githubLink: string;
  category: {
    title: string;
    slug: string;
  };
}

// const projects: Project[] = [
//   {
//     _id: "1",
//     title: "E-Commerce Platform",
//     description: "A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, and payment integration.",
//     technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
//     image: "/project1.jpg",
//     projectLink: "https://project1-demo.com",
//     githubLink: "https://github.com/yourusername/project1",
//     category: {
//       title: "Full-Stack",
//       slug: "full-stack"
//     }
//   },
//   {
//     _id: "2",
//     title: "Task Management App",
//     description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
//     technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
//     image: "/project2.jpg",
//     projectLink: "https://project2-demo.com",
//     githubLink: "https://github.com/yourusername/project2",
//     category: {
//       title: "Frontend",
//       slug: "frontend"
//     }
//   },
//   {
//     _id: "3",
//     title: "Weather Dashboard",
//     description: "A weather application that displays current weather conditions and forecasts using OpenWeatherMap API with beautiful UI design.",
//     technologies: ["React", "TypeScript", "OpenWeatherMap API", "Chart.js"],
//     image: "/project3.jpg",
//     projectLink: "https://project3-demo.com",
//     githubLink: "https://github.com/yourusername/project3",
//     category: {
//       title: "Frontend",
//       slug: "frontend"
//     }
//   },
//   {
//     _id: "4",
//     title: "Blog API",
//     description: "A RESTful API for a blogging platform with user authentication, CRUD operations, and image upload functionality.",
//     technologies: ["Node.js", "Express", "PostgreSQL", "JWT", "Multer"],
//     image: "/project4.jpg",
//     projectLink: "https://project4-demo.com",
//     githubLink: "https://github.com/yourusername/project4",
//     category: {
//       title: "Backend",
//       slug: "backend"
//     }
//   },
//   {
//     _id: "5",
//     title: "Portfolio Website",
//     description: "A modern, responsive portfolio website built with React and Tailwind CSS, featuring smooth animations and dark mode.",
//     technologies: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
//     image: "/project5.jpg",
//     projectLink: "https://project5-demo.com",
//     githubLink: "https://github.com/yourusername/project5",
//     category: {
//       title: "Frontend",
//       slug: "frontend"
//     }
//   },
//   {
//     _id: "6",
//     title: "Chat Application",
//     description: "Real-time chat application with WebSocket integration, user authentication, and message history.",
//     technologies: ["React", "Node.js", "Socket.io", "MongoDB", "JWT"],
//     image: "/project6.jpg",
//     projectLink: "https://project6-demo.com",
//     githubLink: "https://github.com/yourusername/project6",
//     category: {
//       title: "Full-Stack",
//       slug: "full-stack"
//     }
//   }
// ];

export default function Projects() {

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
  // For example, in getProjects.ts or wherever you fetch data from Sanity
const query = `*[_type == "project"]{
  _id,
  title,
  description,
  technologies,
  "image": image.asset->url,
  projectLink,
  githubLink,
  category->{
    title,
    slug
  }
}`;

client
.fetch(query)
.then((data) => setProjects(data))
.catch(console.error)
}, [])

console.log(projects,"projects")

  return (
    <section id="projects" className="min-h-screen py-20 bg-black relative overflow-hidden">
      {/* Background effects matching landing page */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-green-500/5 via-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              My Projects
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full animate-pulse"></div>
          <p className="text-xl text-gray-300 mt-6 font-crimson max-w-2xl mx-auto">
            Explore my latest work and creative solutions
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project._id}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${200 + index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Show actual image if available, otherwise show letter */}
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl text-gray-600 font-bold">{project.title.charAt(0)}</span>
                  </div>
                )}
                
                {/* Hover Overlay with Icons */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-6">
                  <a 
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-cyan-500 hover:bg-cyan-600 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/50"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <a 
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-gray-800 hover:bg-gray-700 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-gray-500/50"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Category Badge */}
                <div className="mb-3">
                  <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-semibold rounded-full">
                    {project.category?.title || 'Uncategorized'}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold text-white mb-3 font-playfair group-hover:text-cyan-400 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-gray-300 text-sm leading-relaxed mb-4 font-crimson">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(project.technologies) && project.technologies.map((tech: any, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 bg-white/10 border border-white/20 text-gray-300 text-xs rounded-md hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300"
                    >
                      {typeof tech === 'string' ? tech : tech?.title || tech?.name || 'Unknown'}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-16 animate-fade-in-up animation-delay-1000">
          <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25">
            <span className="relative z-10">View All Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
    </section>
  );
}
