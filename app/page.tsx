import Header from "@/components/header"
import Hero from "@/components/hero"
import CoreFeatures from "@/components/core-features"
import Services from "@/components/services"
import Projects from "@/components/projects"
import Pricing from "@/components/pricing"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <CoreFeatures />
      <Services />
      <Projects />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  )
}
