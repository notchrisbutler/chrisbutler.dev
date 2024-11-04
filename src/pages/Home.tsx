import { Github, Linkedin, ChevronDown } from 'lucide-react';

const Home = () => {
  const projects = [
    {
      title: 'RewardsHub',
      description: 'A full-stack rewards platform built with Next.js that enables users to earn points through task completion, featuring real-time postback verification and comprehensive admin controls.',
      tags: ['Next.js', 'PostgreSQL', 'Auth.js', 'TypeScript', 'TailwindCSS'],
      highlights: [
        'Implemented secure user authentication and role-based access control',
        'Built real-time postback system for third-party task verification',
        'Designed intuitive admin dashboard for user and reward management'
      ],
    },
    {
      title: "AI-Powered Chinese Data Scraper",
      description: "An intelligent scraping library that leverages AI to normalize and extract structured data from Chinese procurement websites, achieving 85% accuracy in identifying key information across diverse page formats and terminology.",
      tags: ["Python", "Django", "Scrapy", "PyQuery", "Machine Learning"],
      highlights: [
        "Developed AI implementation to web scraping, achieving 85% accuracy in procurement data extraction across varied formats",
        "Implemented anti-bot detection bypassing techniques for reliable data collection",
        "Built robust API integration system for seamless data retrieval and processing"
      ]
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col justify-center items-center text-center">
        <div className="animate-fade-in space-y-4">
          <div className="relative w-40 h-40 mx-auto">
            <img
              src="https://i.imgur.com/pEKLiOG.jpeg"
              alt="Profile"
              className="rounded-full w-full h-full object-cover shadow-lg ring-2 ring-primary-100"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-500/10 to-secondary-500/10"></div>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-600 tracking-tight">Chris Butler</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Software Engineer</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Expert in data collection of publicly available information and OSINT for commercial and government clients.
            Passionate about building solutions using clean code and a user-driven approach.
          </p>
          <div className="flex justify-center space-x-6 pt-4">
            <a
              href="https://github.com/notchrisbutler"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/imchrisbutler"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="animate-bounce-slow mt-20">
          <ChevronDown className="w-6 h-6 text-primary-600" />
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 animate-slide-up">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800">
          Technical Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
          {[
            {
              title: 'Frontend',
              skills: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React'],
            },
            {
              title: 'Backend',
              skills: ['Python', 'Node.js', 'PostgreSQL', 'MySQL'],
            },
            {
              title: 'Tools & Others',
              skills: ['Git', 'Docker', 'AWS', 'GCP'],
            },
          ].map((category) => (
            <div
              key={category.title}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4 text-primary-600">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-gray-600 flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-secondary-400 rounded-full"></span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow animate-slide-up border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="text-sm">{highlight}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;