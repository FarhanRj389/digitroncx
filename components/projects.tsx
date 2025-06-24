"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "Modern e-commerce solution with advanced features and seamless user experience.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Healthcare Mobile App",
    category: "Mobile Development",
    description: "Cross-platform mobile application for healthcare management and patient care.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["React Native", "Firebase", "Node.js", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Restaurant Management System",
    category: "Web Application",
    description: "Complete restaurant management solution with POS integration and analytics.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Vue.js", "Express.js", "MySQL", "Socket.io"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Startup Brand Identity",
    category: "Branding",
    description: "Complete branding package for a tech startup including logo and brand guidelines.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Adobe Creative Suite", "Figma", "Brand Strategy"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "Real Estate Platform",
    category: "Web Development",
    description: "Property listing platform with advanced search and virtual tour features.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["React", "Django", "PostgreSQL", "AWS"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "Educational Learning App",
    category: "Mobile Development",
    description: "Interactive learning platform for students with gamification elements.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Flutter", "Firebase", "Node.js", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
  },
]

const categories = ["All", "Web Development", "Mobile Development", "Web Application", "Branding"]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Recent Projects</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our portfolio of successful projects across various industries and technologies. Each project
            showcases our commitment to quality and innovation.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    <Button size="sm" variant="outline" className="bg-white/90 text-gray-900 border-white/90">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Live
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white/90 text-gray-900 border-white/90">
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}
