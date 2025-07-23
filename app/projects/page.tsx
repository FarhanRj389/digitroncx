"use client"

import { useState, useEffect, useRef } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Projects from "@/components/projects"
import { Button } from "@/components/ui/button"
import {
  Filter,
  Search,
  Sparkles,
  Rocket,
  Star,
  Crown,
  Zap,
  Heart,
  Globe,
  Award,
  TrendingUp,
  Users,
  ExternalLink,
  Github,
  ArrowRight,
} from "lucide-react"
import FloatingParticles from "@/components/FloatingParticles"
import Link from "next/link"

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Move featuredProjects above categories
  const featuredProjects = [
    {
      title: "Aisa Halal Meet",
      // client: "Internal Project",
      category: "E-commerce",
      links: "https://aisahalalmeet.netlify.app/",
      description: "Aisa Halal Meet is a modern online halal meat ordering platform that allows users to browse, select, and order a wide range of halal-certified meat products with fast delivery and clear quality assurance.",
      image: "/Aishahalal meets.png",
      technologies: ["Next.js", "Tailwind CSS", "TypeScript", "React"],
      results: ["Enabled local communities to access halal meat easily online", "Optimized for mobile shopping", "Fast loading and clean UX"],
      gradient: "from-blue-500 to-purple-600",
      featured: true,
    },
    {
      title: "Fone Fixer",
      // client: "Fone Fixer ",
      category: "Web Development", // changed from 'Web Application'
      links: "https://fone-fixer.netlify.app/",
      description: "A responsive web app to showcase repair services and allow customers to book appointments and view pricing.",
      image: "/fonefixer.png",
      technologies: ["Next.js", "Tailwind CSS", "React", "TypeScript"],
      results: ["Increased online bookings by 65%", "Improved mobile engagement", "Fast-loading site"],
      gradient: "from-green-500 to-emerald-600",
      featured: true,
    },
    {
      title: "Chiropractic Healthcare",
      // client: "Chiropractic Clinic",
      category: "Web Development", // changed from 'Web Application'
      description: "A clean, responsive website showcasing chiropractic services, appointment booking, and trust-building elements like testimonials and FAQs.",
      image: "/health.png",
      technologies: ["Next.js", "Tailwind CSS", "React", "TypeScript"],
      results: ["60% increase in appointment requests", "Fast mobile performance", "Improved patient trust"],
      gradient: "from-purple-500 to-pink-600",
      featured: true,
    },
    {
      title: "Garden Landscaping",
      // client: "Your Client Name",
      category: "Web Development", // changed from 'Web Application'
      description: "A clean, responsive website showcasing landscaping services such as design, maintenance, patios, planting, with galleries and contact forms.",
      image: "/garden.png",
      technologies: ["Next.js", "Tailwind CSS", "React", "TypeScript"],
      results: ["40% increase in customer inquiries", "Mobile‑friendly design", "Project gallery boosted engagement"],
      gradient: "from-purple-500 to-pink-600",
      featured: true,
    },
    {
      title: "Five Star",
      // client: "Your Client Name",
      category: "Web Development", // changed from 'Web Application'
      description: "Clear, engaging one-liner + expanded intro about purpose and audience.",
      image: "/fivestar.png",
      technologies: ["Next.js", "Tailwind CSS", "React", "TypeScript"],
      results: ["Key achievement #1", "Key achievement #2"],
      gradient: "from-purple-500 to-pink-600",
      featured: true,
    },
    {
      title: "Chiropractic Healthcare",
      // client: "Your Client Name",
      category: "Web Development", // changed from 'Web Application'
      description: "A clean, responsive website built to increase patient trust through clear service descriptions, appointment booking, and testimonials.",
      image: "/healthcare.png",
      technologies: ["Next.js", "Tailwind CSS", "React", "TypeScript"],
      results: ["📈 30% increase in appointment requests", "⚡️ 40% faster page load times", "📲 50% mobile traffic engagement"],
      gradient: "from-purple-500 to-pink-600",
      featured: true,
    },
  ];

  const categories = [
    { name: "All", gradient: "from-blue-500 to-purple-600" },
    { name: "Web Development", gradient: "from-green-500 to-blue-600" },
    { name: "Mobile Apps", gradient: "from-purple-500 to-pink-600" },
    { name: "E-commerce", gradient: "from-orange-500 to-red-600" },
    { name: "Branding", gradient: "from-pink-500 to-rose-600" },
    { name: "Enterprise", gradient: "from-indigo-500 to-purple-600" },
  ]

  // Calculate counts dynamically for each category
  const categoriesWithCounts = categories.map((cat) => {
    if (cat.name === "All") {
      return { ...cat, count: featuredProjects.length };
    }
    const count = featuredProjects.filter((project) => project.category === cat.name).length;
    return { ...cat, count };
  });

  // Filter projects by category and search term
  const filteredProjects = featuredProjects.filter((project) => {
    // Category filter
    const matchesCategory = activeFilter === "All" || project.category === activeFilter;
    // Search filter (title, description, category, technologies)
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(search) ||
      project.description.toLowerCase().includes(search) ||
      project.category.toLowerCase().includes(search) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(search));
    return matchesCategory && (search === "" || matchesSearch);
  });

  const achievements = [
    { icon: Award, number: "15+", text: "Industry Awards Won", gradient: "from-yellow-400 to-orange-500" },
    { icon: TrendingUp, number: "500%", text: "Average ROI Increase", gradient: "from-green-400 to-emerald-500" },
    { icon: Users, number: "500+", text: "Happy Clients Worldwide", gradient: "from-blue-400 to-cyan-500" },
    { icon: Globe, number: "4", text: "Countries Served", gradient: "from-purple-400 to-pink-500" },
  ]

  const technologies = [
    { name: "React/Next.js", projects: 45, gradient: "from-blue-500 to-cyan-500" },
    { name: "Node.js", projects: 38, gradient: "from-green-500 to-emerald-500" },
    { name: "React Native", projects: 22, gradient: "from-purple-500 to-pink-500" },
    { name: "AI/ML", projects: 18, gradient: "from-orange-500 to-red-500" },
    { name: "Blockchain", projects: 12, gradient: "from-indigo-500 to-purple-500" },
    { name: "Cloud/AWS", projects: 35, gradient: "from-cyan-500 to-blue-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-blue-500/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-pink-400/10 to-purple-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Floating Particles */}
        <FloatingParticles count={25} color="bg-purple-400/60" />
      </div>

      <Header />

      {/* Hero Section */}
      <section ref={sectionRef} className="pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-white/20 text-white rounded-full text-lg font-medium mb-10 animate-bounce-in glass-effect">
              <Crown className="h-6 w-6 mr-3 animate-pulse text-yellow-400" />Award-Winning Digital Masterpieces
              <Sparkles className="h-6 w-6 ml-3 animate-spin text-purple-400" />
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 animate-fade-in-up">
              Our
              <span className="text-gradient animate-shimmer block">Portfolio</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-600">
                of Excellence
              </span>
            </h1>

            <p className="text-2xl text-gray-300 mb-12 animate-fade-in-up animation-delay-200 leading-relaxed">
               Explore our diverse collection of
              <span className="text-purple-400 font-semibold"> award-winning projects</span> that have transformed
              businesses and delivered extraordinary results across industries and technologies.
            </p>

            {/* Search and Filter */}
            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-up animation-delay-400">
              <div className="relative max-w-md w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search amazing projects..."
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-gray-400 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              {/*
              <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl hover-lift"
                type="button"
                onClick={() => alert('Advanced filters coming soon!')}
              >
                <Filter className="h-5 w-5 mr-2" />
                Advanced Filters
              </Button>
              */}
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up animation-delay-600">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover-lift group"
                  >
                    <Icon
                      className={`h-8 w-8 mx-auto mb-3 bg-gradient-to-r ${achievement.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}
                    />
                    <div className="text-3xl font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                      {achievement.number}
                    </div>
                    <div className="text-gray-300 text-sm">{achievement.text}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl font-bold text-white mb-8">
              <span className="text-gradient">Explore by</span> Category
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4 animate-on-scroll">
            {categoriesWithCounts.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveFilter(category.name)}
                className={`group px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover-lift ${
                  activeFilter === category.name
                    ? `bg-gradient-to-r ${category.gradient} text-white shadow-2xl`
                    : "bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20"
                }`}
              >
                <span className="flex items-center gap-2">
                  {category.name}
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      activeFilter === category.name ? "bg-white/20" : "bg-white/10"
                    }`}
                  >
                    {category.count}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium mb-8 glass-effect">
              <Star className="h-4 w-4 mr-2 animate-pulse" />
              Featured Case Studies
            </div>

            <h2 className="text-5xl font-bold text-white mb-8">
              <span className="text-gradient">Spotlight</span> Projects
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">
                That Changed Everything
              </span>
            </h2>
          </div>

          <div className="space-y-16">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className={`animate-on-scroll grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Project Image */}
                <div className={`relative group ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 hover-lift">
                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                     <img src={project.image} alt={project.image} />
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                        <a href={project.links} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="bg-white/90 text-gray-900 hover:bg-white">
                            <ExternalLink className="h-4 w-4 mr-2" />
                             Live Demo 
                          </Button>
                        </a>
                        {/* <Button size="sm" variant="outline" className="bg-white/10 text-white border-white/30">
                          <Github className="h-4 w-4 mr-2" />
                          Case Study
                        </Button> */}
                      </div>
                    </div>

                    {/* Featured Badge */}
                    <div className="absolute top-4 right-4">
                      <div
                        className={`bg-gradient-to-r ${project.gradient} px-4 py-2 rounded-full text-white text-sm font-bold flex items-center`}
                      >
                        <Crown className="h-4 w-4 mr-2" />
                        Featured
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`px-4 py-2 bg-gradient-to-r ${project.gradient} text-white rounded-full text-sm font-semibold`}
                      >
                        {project.category}
                      </span>
                      {/*<span className="text-cyan-400 font-medium">{project.client}</span>*/}
                    </div>

                    <h3 className="text-4xl font-bold text-white mb-4 group-hover:text-gradient transition-all duration-300">
                      {project.title}
                    </h3>

                    <p className="text-xl text-gray-300 leading-relaxed mb-6">{project.description}</p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-white/10 text-white rounded-full text-sm border border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Key Results</h4>
                    <div className="space-y-2">
                      {project.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-center text-green-400">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                          {result}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* <Button
                    className={`bg-gradient-to-r ${project.gradient} hover:scale-105 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover-lift group`}
                  >
                    View Full Case Study
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Technologies Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium mb-8 glass-effect">
              <Zap className="h-4 w-4 mr-2 animate-pulse" />
              Our Tech Stack
            </div>

            <h2 className="text-4xl font-bold text-white mb-8">
              <span className="text-gradient">Cutting-Edge</span> Technologies
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="animate-on-scroll bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 card-hover group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-gradient transition-all duration-300">
                      {tech.name}
                    </h3>
                    <p className="text-gray-400">{tech.projects} projects</p>
                  </div>
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${tech.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto animate-on-scroll">
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-600/10 backdrop-blur-lg rounded-3xl p-16 border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-3xl"></div>

              <div className="relative z-10">
                <h2 className="text-6xl font-bold text-white mb-8">
                  Ready to Create Your
                  <span className="text-gradient block"> Next Masterpiece?</span>
                </h2>

                <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
                  🎨 Let's bring your vision to life with cutting-edge technology and award-winning design.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button
                    size="lg"
                    className="btn-gradient text-white px-12 py-6 text-xl font-bold rounded-full hover-lift group"
                  >
                    <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                    Start Your Project
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="glass-effect text-white border-white/30 px-12 py-6 text-xl font-bold rounded-full hover-glow group"
                  >
                    <Heart className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                    View More Projects
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
