// 'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Star, Calendar } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { fetchProjectsData } from '../../lib/spreadsheet'

export default function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProjects() {
      try {
        const projectsData = await fetchProjectsData()
        setProjects(projectsData)
      } catch (error) {
        console.error('Error loading projects:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  if (loading) {
    return (
      <section ref={ref} id="projects" className="section py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mx-auto"></div>
            <p className="mt-4 text-primary-600">Loading projects...</p>
          </div>
        </div>
      </section>
    )
  }

  const featuredProjects = projects.filter(project => project.featured)
  const otherProjects = projects.filter(project => !project.featured)

  return (
    <section ref={ref} id="projects" className="section py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            A showcase of my best work and passion projects
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="elegant-card overflow-hidden group"
            >
              {/* Project Image */}
              <div className="relative h-64 bg-gradient-to-br from-primary-100 to-accent-100 overflow-hidden">
                {project.image && project.image.trim() !== '' && project.image !== '#' ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.querySelector('.fallback-icon').style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="fallback-icon w-full h-full flex items-center justify-center bg-gradient-to-br from-accent-100 to-accent-200" style={{ display: (project.image && project.image.trim() !== '' && project.image !== '#') ? 'none' : 'flex' }}>
                  <div className="text-center">
                    <div className="text-5xl mb-3">
                      {project.category === 'Mobile App' && '📱'}
                      {project.category === 'Web App' && '💻'}
                      {project.category === 'SaaS' && '⚡'}
                      {project.category === 'Dashboard' && '⚡'}
                      {project.category === 'Blog' && '📝'}
                      {!['Mobile App', 'Web App', 'SaaS', 'Dashboard', 'Blog'].includes(project.category) && '🚀'}
                    </div>
                    <div className="text-accent-600 font-medium">{project.category}</div>
                  </div>
                </div>
                {/* Status Badge Overlay */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                    project.status === 'Live' ? 'bg-emerald-100/90 text-emerald-700' : 
                    project.status === 'Beta' ? 'bg-orange-100/90 text-orange-700' : 
                    'bg-blue-100/90 text-blue-700'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar size={16} className="text-primary-400" />
                  <span className="text-primary-500 text-sm">{project.year}</span>
                </div>

                <h3 className="text-xl font-bold text-primary-900 mb-3 group-hover:text-accent-600 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-primary-600 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Key Info */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-accent-600">{project.category}</div>
                    <div className="text-primary-500 text-sm">Category</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-accent-600">{project.year}</div>
                    <div className="text-primary-500 text-sm">Year</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-bold ${
                      project.status === 'Live' ? 'text-emerald-600' : 
                      project.status === 'Beta' ? 'text-orange-600' : 
                      'text-blue-600'
                    }`}>
                      {project.status}
                    </div>
                    <div className="text-primary-500 text-sm">Status</div>
                  </div>
                </div>

                {/* Optional Metrics (jika ada) */}
                {project.metrics && Object.keys(project.metrics).length > 0 && (
                  <div className="border-t border-primary-200 pt-4 mb-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-center bg-primary-50 rounded-lg p-3">
                          <div className="text-lg font-bold gradient-text">{value}</div>
                          <div className="text-primary-500 text-xs capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tags && project.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.1 + tagIndex * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex space-x-4">
                  <motion.a
                    href={project.github}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <Github size={18} />
                    <span>Code</span>
                  </motion.a>
                  <motion.a
                    href={project.live}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <ExternalLink size={18} />
                    <span>Live Demo</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects Section */}
        {otherProjects.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mb-12"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">
                More <span className="gradient-text">Projects</span>
              </h3>
              <p className="text-primary-600 max-w-xl mx-auto">
                Additional projects and experiments
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="elegant-card overflow-hidden group"
                >
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-primary-100 to-accent-100 overflow-hidden">
                    {project.image && project.image.trim() !== '' && project.image !== '#' ? (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.querySelector('.fallback-icon').style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="fallback-icon w-full h-full flex items-center justify-center bg-gradient-to-br from-accent-100 to-accent-200" style={{ display: (project.image && project.image.trim() !== '' && project.image !== '#') ? 'none' : 'flex' }}>
                      <div className="text-center">
                        <div className="text-4xl mb-2">
                          {project.category === 'Mobile App' && '📱'}
                          {project.category === 'Web App' && '💻'}
                          {project.category === 'SaaS' && '⚡'}
                          {project.category === 'Dashboard' && '⚡'}
                          {project.category === 'Blog' && '📝'}
                          {!['Mobile App', 'Web App', 'SaaS', 'Dashboard', 'Blog'].includes(project.category) && '🚀'}
                        </div>
                        <div className="text-accent-600 text-xs font-medium">{project.category}</div>
                      </div>
                    </div>
                    {/* Status Badge */}
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium backdrop-blur-sm ${
                        project.status === 'Live' ? 'bg-emerald-100/90 text-emerald-700' : 
                        project.status === 'Beta' ? 'bg-orange-100/90 text-orange-700' : 
                        'bg-blue-100/90 text-blue-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-primary-400 text-sm">{project.year}</span>
                    </div>

                  <h4 className="text-lg font-bold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors duration-300">
                    {project.title}
                  </h4>
                  
                  <p className="text-primary-600 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Compact Info */}
                  <div className="text-center mb-4 p-3 bg-primary-50 rounded-lg">
                    <div className="text-sm font-semibold text-accent-600">{project.category}</div>
                  </div>

                  {/* Technologies - Compact */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {project.tags && project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-primary-100 text-primary-600 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags && project.tags.length > 4 && (
                        <span className="px-2 py-1 bg-primary-200 text-primary-500 rounded text-xs">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Links - Compact */}
                  <div className="flex space-x-2">
                    <motion.a
                      href={project.github}
                      whileHover={{ scale: 1.05 }}
                      className="flex-1 text-center py-2 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-lg text-sm font-medium transition-colors duration-300"
                    >
                      Code
                    </motion.a>
                    <motion.a
                      href={project.live}
                      whileHover={{ scale: 1.05 }}
                      className="flex-1 text-center py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-lg text-sm font-medium transition-colors duration-300"
                    >
                      Demo
                    </motion.a>
                  </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}