// src/sections/About.tsx
import  { useEffect, useState } from 'react';
import { client } from '../public/lib/sanity' 

interface AboutData {
    summary: string
    frontend: string[]
    backend: string[]
    tools: string[]
    focus: string[]
  }

export default function About() {

    const [about, setAbout] = useState<AboutData | null>(null)

    useEffect(() => {
      client
        .fetch(`*[_type == "about"][0]`)
        .then((data) => setAbout(data))
        .catch(console.error)
    }, [])
  
    if (!about) return (
      <section id="about" className="min-h-screen py-20 bg-black relative overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-300 font-crimson text-lg">Loading...</p>
        </div>
      </section>
    );


  return (
    <section id="about" className="min-h-screen py-20 bg-black relative overflow-hidden">
      {/* Enhanced Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-blue-600/15 to-purple-600/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-r from-cyan-600/15 to-blue-600/15 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-green-500/8 via-blue-500/8 to-purple-500/8 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Animated Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
              About Me
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full animate-pulse"></div>
          <p className="text-xl text-gray-300 mt-6 font-crimson max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Discover my journey in software development
          </p>
        </div>

        {/* Enhanced Main content */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 animate-fade-in-up animation-delay-200 hover:border-cyan-400/30 transition-all duration-500">
            <div className="text-center space-y-10">
              {/* Enhanced Main description */}
              <div className="relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full"></div>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light font-crimson relative z-10">
                  {about.summary}
                </p>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full"></div>
              </div>

              {/* Enhanced Tech highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                {[
                  { name: 'Frontend', tech: about.frontend, color: 'cyan', icon: '🎨' },
                  { name: 'Backend', tech: about.backend, color: 'blue', icon: '⚙️' },
                  { name: 'Tools', tech: about.tools, color: 'purple', icon: '🛠️' },
                  { name: 'Focus', tech: about.focus, color: 'green', icon: '🎯' }
                ].map((item, index) => (
                  <div 
                    key={item.name}
                    className="group text-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-500 animate-fade-in-up transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
                    style={{ animationDelay: `${400 + index * 100}ms` }}
                  >
                    {/* Icon */}
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    
                    {/* Title */}
                    <h3 className={`text-${item.color}-400 font-bold text-lg mb-4 font-playfair group-hover:text-white transition-colors duration-300`}>
                      {item.name}
                    </h3>
                    
                    {/* Tech list */}
                    <div className="space-y-2">
                      {item.tech.map((tech, techIndex) => (
                        <div 
                          key={techIndex}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-gray-300 text-xs font-medium hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300 transform hover:scale-105"
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional decorative element */}
              <div className="flex justify-center space-x-4 mt-12 animate-fade-in-up animation-delay-800">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-200"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-400"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse animation-delay-600"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Floating elements */}
      <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-cyan-400 rounded-full animate-bounce"></div>
      <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
      <div className="absolute bottom-1/2 left-1/3 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
      <div className="absolute top-1/4 right-1/2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-green-400 rounded-full animate-bounce"></div>
      <div className="absolute bottom-1/4 right-1/6 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
      
      {/* Animated particles */}
      <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full animate-ping"></div>
      <div className="absolute bottom-20 left-20 w-1 h-1 bg-cyan-400 rounded-full animate-ping animation-delay-1000"></div>
      <div className="absolute top-40 left-40 w-1 h-1 bg-purple-400 rounded-full animate-ping animation-delay-2000"></div>
    </section>
  );
}