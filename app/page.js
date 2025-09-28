'use client'

import Navbar from '../components/ui/Navbar'
import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import ExperienceSection from '../components/sections/ExperienceSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import ContactSection from '../components/sections/ContactSection'
import { ArrowUp } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <main className="relative">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <div className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Experience Section */}
        <ExperienceSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Contact Section */}
        <ContactSection />
      </div>

      {/* Scroll-to-top Button */}
      <ScrollToTop />
    </main>
  )
}

// Scroll to Top Component
function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2 }}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-50 p-3 elegant-card text-primary-600 hover:text-accent-600 transition-all duration-300 shadow-lg hover:shadow-xl"
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} />
    </motion.button>
  )
}