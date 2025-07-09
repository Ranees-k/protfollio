import { useEffect, useState } from "react";
import { client } from "../public/lib/sanity";

export default function Landing() {

  const [resume, setResume] = useState<any>(null);
  const [technologies, setTechnologies] = useState<any>(null);
  
  useEffect(() => {
  const query = `*[_type == "resume"][0]{
    title,
    "fileUrl": file.asset->url
  }`

  const query2 = `*[_type == "technology"]{
    name
  }`;
  
  client
  .fetch(query2)
  .then((data) => setTechnologies(data))
  .catch(console.error)

  client
  .fetch(query)
  .then((data) => setResume(data))
  .catch(console.error)
  }, []);

  console.log(technologies,"technologies" )
  return (
    <div id="home" className="h-[100vh] w-full bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-red-600/10 to-orange-600/10 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Main content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center max-w-6xl mx-auto px-6">
          {/* Animated greeting */}
          <div className="mb-8 animate-fade-in-up">
            <span className="text-lg md:text-xl text-cyan-400 font-mono tracking-wider uppercase">
              Welcome to my digital universe
            </span>
          </div>

          {/* Main title with animation */}
          <div className="mb-6 animate-fade-in-up animation-delay-200">
            <h2 className="text-xl md:text-6xl font-black text-white mb-4 leading-none">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent animate-gradient-x font-orbitron tracking-wider">
                RANEES
              </span>
            </h2>
          </div>

          {/* Subtitle with typewriter effect */}
          <div className="mb-8 animate-fade-in-up animation-delay-400">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-4 font-inter tracking-wide">
              SOFTWARE DEVELOPER
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full animate-pulse"></div>
          </div>

          {/* Description with enhanced styling */}
          <div className="mb-12 animate-fade-in-up animation-delay-600">
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Crafting <span className="text-cyan-400 font-semibold">digital experiences</span> with 
              <span className="text-purple-400 font-semibold"> passion</span> and 
              <span className="text-blue-400 font-semibold"> precision</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-800">
            <button 
              onClick={() => {
                const element = document.getElementById('projects');
                if (element) {
                  const headerHeight = 80;
                  const elementPosition = element.offsetTop - headerHeight;
                  window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 cursor-pointer"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <a href={resume?.fileUrl} className="group px-8 py-4 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/25">
              Download Resume
            </a>
          </div>

          {/* Tech stack indicators */}
          <div className="mt-16 animate-fade-in-up animation-delay-1000">
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-4">Technologies I work with</p>
            <div className="flex justify-center gap-6 flex-wrap">
              {technologies?.map((tech:any, index:any) => (
                <span 
                  key={tech?.name || index}
                  className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-gray-300 text-sm font-medium hover:text-cyan-400 hover:border-cyan-400 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${1200 + index * 100}ms` }}
                >
                  {tech?.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-cyan-400 rounded-full animate-bounce"></div>
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 left-10 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

