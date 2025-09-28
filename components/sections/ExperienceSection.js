'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, ExternalLink } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { fetchExperienceData, fetchSkillsData } from '../../lib/spreadsheet'

export default function ExperienceSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [experiences, setExperiences] = useState([])
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [experienceData, skillsData] = await Promise.all([
          fetchExperienceData(),
          fetchSkillsData()
        ])
        setExperiences(experienceData)
        setSkills(skillsData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <section ref={ref} id="experience" className="section py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mx-auto"></div>
            <p className="mt-4 text-primary-600">Loading experience data...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} id="experience" className="section py-20 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            A timeline of my professional growth and achievements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Experience Timeline */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-500 to-accent-300"></div>
              
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative pl-20 pb-12 last:pb-0"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-6 w-4 h-4 bg-accent-500 rounded-full border-4 border-white shadow-lg"></div>
                  
                  {/* Experience Card */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="elegant-card p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-primary-900 mb-1">{exp.title}</h3>
                        <h4 className="text-accent-600 font-semibold mb-2">{exp.company}</h4>
                      </div>
                      <div className="flex flex-col md:items-end text-sm text-primary-500">
                        <div className="flex items-center space-x-1 mb-1">
                          <Calendar size={14} />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin size={14} />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-primary-700 mb-4 leading-relaxed">{exp.description}</p>
                    
                    {/* Achievements */}
                    <div className="mb-4">
                      <h5 className="font-semibold text-primary-800 mb-2">Key Achievements:</h5>
                      <ul className="list-disc list-inside space-y-1 text-primary-600">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-sm">{achievement}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Technologies */}
                    <div>
                      <h5 className="font-semibold text-primary-800 mb-2">Technologies:</h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills & Additional Info */}
          <div className="space-y-8">
            
            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="elegant-card p-6"
            >
              <h3 className="text-xl font-bold text-primary-900 mb-4">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="elegant-card p-6"
            >
              <h3 className="text-xl font-bold text-primary-900 mb-4">Education</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-primary-800">Bachelor of Computer Science</h4>
                  <p className="text-primary-600 text-sm">University of Indonesia</p>
                  <p className="text-primary-500 text-sm">2015 - 2019</p>
                </div>
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="elegant-card p-6"
            >
              <h3 className="text-xl font-bold text-primary-900 mb-4">Certifications</h3>
              <div className="space-y-3">
                {[
                  { name: 'AWS Certified Developer', year: '2023' },
                  { name: 'Google Cloud Professional', year: '2022' },
                  { name: 'React Advanced Patterns', year: '2021' }
                ].map((cert, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-primary-700 font-medium text-sm">{cert.name}</span>
                    <span className="text-primary-500 text-xs">{cert.year}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}