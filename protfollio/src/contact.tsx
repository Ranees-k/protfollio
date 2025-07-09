import React, { useEffect, useState } from 'react';
import { client } from '../public/lib/sanity';

interface ContactData {
  email: string;
  location: string;
  phone: string;
  socialLinks: Array<{
    platform: string;
    url: string;
    icon: string;
    color: string;
  }>;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactData, setContactData] = useState<ContactData | null>(null);

  useEffect(() => {
    // Fetch contact data from your API
    // Replace this with your actual API endpoint
    const fetchContactData = async () => {
      try {
        client
        .fetch(`*[_type == "contact"][0]`)
        .then((data) => setContactData(data))
        .catch(console.error)
        console.log(contactData,"contactData")
        // Simulate API call - replace with your actual API endpoint
        
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };

    fetchContactData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert('Message sent successfully!');
    }, 2000);
  };

  if (!contactData) {
    return (
      <section id="contact" className="min-h-screen py-20 bg-black relative overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-300 font-crimson text-lg">Loading contact information...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="min-h-screen py-20 bg-black relative overflow-hidden">
      {/* Enhanced Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-pink-600/15 to-red-600/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-r from-green-600/15 to-blue-600/15 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-yellow-500/8 via-orange-500/8 to-red-500/8 rounded-full blur-3xl animate-spin-slow"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-full blur-2xl animate-pulse animation-delay-400"></div>
      </div>

      {/* Animated Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
              Get In Touch
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full animate-pulse"></div>
          <p className="text-xl text-gray-300 mt-6 font-crimson max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Let's discuss your next project and bring your ideas to life
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Enhanced Contact Information */}
          <div className="space-y-8 animate-fade-in-up animation-delay-400">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-500 transform hover:scale-105">
              <h3 className="text-2xl font-bold text-white mb-8 font-playfair text-center">Let's Connect</h3>
              
              <div className="space-y-8">
                {/* Email */}
                <div className="flex items-center space-x-6 group hover:scale-105 transition-all duration-300 p-4 rounded-2xl hover:bg-white/5">
                  <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300 transform group-hover:scale-110">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Email</p>
                    <a href={`mailto:${contactData.email}`} className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 text-lg font-medium">
                      {contactData.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-6 group hover:scale-105 transition-all duration-300 p-4 rounded-2xl hover:bg-white/5">
                  <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 transform group-hover:scale-110">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Phone</p>
                    <a href={`tel:${contactData.phone}`} className="text-purple-400 hover:text-purple-300 transition-colors duration-300 text-lg font-medium">
                      {contactData.phone}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-6 group hover:scale-105 transition-all duration-300 p-4 rounded-2xl hover:bg-white/5">
                  <div className="p-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all duration-300 transform group-hover:scale-110">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Location</p>
                    <p className="text-green-400 text-lg font-medium">{contactData.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Social Links */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10  rounded-3xl p-8 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-500 transform hover:scale-105">
              <h3 className="text-xl font-bold text-white mb-8 font-playfair text-center">Follow Me</h3>
              <div className="flex justify-center space-x-6">
                {contactData.socialLinks.map((social, index) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-6 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-cyan-400/50 rounded-2xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/25 animate-fade-in-up"
                    style={{ animationDelay: `${600 + index * 100}ms` }}
                  >
                    <img 
                      src={social.icon} 
                      alt={social.platform}
                      className="w-8 h-8 filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Contact Form */}
          <div className="animate-fade-in-up animation-delay-600">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-500 transform hover:scale-105">
              <h3 className="text-2xl font-bold text-white mb-8 font-playfair text-center">Send Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="group">
                  <label className="block text-gray-300 text-sm font-semibold mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-all duration-300 group-hover:border-cyan-400/50 text-lg"
                    placeholder="Your name"
                  />
                </div>

                {/* Email Input */}
                <div className="group">
                  <label className="block text-gray-300 text-sm font-semibold mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-all duration-300 group-hover:border-cyan-400/50 text-lg"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Subject Input */}
                <div className="group">
                  <label className="block text-gray-300 text-sm font-semibold mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-all duration-300 group-hover:border-cyan-400/50 text-lg"
                    placeholder="Project inquiry"
                  />
                </div>

                {/* Message Input */}
                <div className="group">
                  <label className="block text-gray-300 text-sm font-semibold mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-all duration-300 group-hover:border-cyan-400/50 resize-none text-lg"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Enhanced Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-cyan-400 rounded-full animate-bounce"></div>
      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-1/6 w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
      <div className="absolute bottom-1/2 left-1/6 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
      
      {/* Animated particles */}
      <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full animate-ping"></div>
      <div className="absolute bottom-20 left-20 w-1 h-1 bg-cyan-400 rounded-full animate-ping animation-delay-1000"></div>
      <div className="absolute top-40 left-40 w-1 h-1 bg-purple-400 rounded-full animate-ping animation-delay-2000"></div>
    </section>
  );
}
