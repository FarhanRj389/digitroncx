"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
const projects = [
  {
    id: 1,
    title: "Aisa Halal Meet",
    category: "E-commerce",
    description: "Aisa Halal Meet is a modern online halal meat ordering platform that allows users to browse, select, and order a wide range of halal-certified meat products with fast delivery and clear quality assurance.",
    image: "/Aishahalal meets.png",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript", "React"],
    links: "https://aisahalalmeet.netlify.app/",
    // githubUrl: "#",
  },
  {
    id: 2,
    title: "Fone Fixer",
    category: "Web Development", // changed from 'Web Application'
    links: "https://fone-fixer.netlify.app/",
    description: "A responsive web app to showcase repair services and allow customers to book appointments and view pricing.",
    image: "/fonefixer.png",
    technologies: ["Next.js", "Tailwind CSS", "React", "TypeScript"],
     // githubUrl: "#",
  },
  {
    id: 3,
    title: "Chiropractic Healthcare",
      category: "Web Development", // changed from 'Web Application'
      description: "A clean, responsive website showcasing chiropractic services, appointment booking, and trust-building elements like testimonials and FAQs.",
      image: "/health.png",
      technologies: ["Next.js", "Tailwind CSS", "React", "TypeScript"],
      // liveUrl: "#",
    // githubUrl: "#",
  },
  {
    id: 4,
    title: "Garden Landscaping",
      // client: "Your Client Name",
      category: "Web Development", // changed from 'Web Application'
      description: "A clean, responsive website showcasing landscaping services such as design, maintenance, patios, planting, with galleries and contact forms.",
      image: "/garden.png",
      technologies: ["Next.js", "Tailwind CSS", "React", "TypeScript"],
      // liveUrl: "#",
    // githubUrl: "#",
  },
  {
    id: 5,
    title: "Five Star",
      // client: "Your Client Name",
      category: "Web Development", // changed from 'Web Application'
      description: "Clear, engaging one-liner + expanded intro about purpose and audience.",
      image: "/fivestar.png",
      technologies: ["Next.js", "Tailwind CSS", "React", "TypeScript"],
      // liveUrl: "#",
    // githubUrl: "#",
  },
  {
    id: 6,
    title: "Chiropractic Healthcare",
      // client: "Your Client Name",
      category: "Web Development", // changed from 'Web Application'
      description: "A clean, responsive website built to increase patient trust through clear service descriptions, appointment booking, and testimonials.",
      image: "/healthcare.png",
      technologies: ["Next.js", "Tailwind CSS", "React", "TypeScript"],
      // liveUrl: "#",
    // githubUrl: "#",
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
                    <Link href={project.links || "#"}>
                    <Button size="sm" variant="outline" className="bg-white/90 text-gray-900 border-white/90">
                      <ExternalLink className="h-4 w-4 mr-1" />
                    </Button>
                    </Link>
                    {/* <Button size="sm" variant="outline" className="bg-white/90 text-gray-900 border-white/90">
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </Button> */}
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
          <Link href="/projects">
          
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
            View All Projects
          </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
