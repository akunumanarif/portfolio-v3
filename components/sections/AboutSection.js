'use client'

import { motion } from 'framer-motion'
import { Lightbulb, Coffee, Music, Camera } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const interests = [
    { icon: Coffee, title: 'Coffee Enthusiast', desc: 'Fueled by great coffee' },
    { icon: Music, title: 'Music Lover', desc: 'Rock & Rock Instrumental' },
    { icon: Camera, title: 'Gaming', desc: 'Gaming enthusiast' },
    { icon: Lightbulb, title: 'Innovation', desc: 'Always learning' },
  ]

  return (
    <section ref={ref} id="about" className="section py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Get to know the person behind the code
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left - Image and Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Profile Image */}
            <div className="relative">
              <div className="w-80 h-80 mx-auto rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/me.jpeg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating decoration */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-500 rounded-full opacity-20 floating"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-cyan-500 rounded-full opacity-30 floating"></div>
              <div className="absolute top-1/2 -right-8 w-12 h-12 bg-teal-500 rounded-full opacity-25 floating"></div>
            </div>

            {/* Personal Interests */}
            <div className="grid grid-cols-2 gap-4">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="elegant-card p-4 text-center"
                >
                  <interest.icon size={32} className="text-accent-500 mx-auto mb-2" />
                  <h4 className="font-semibold text-primary-800 text-sm">{interest.title}</h4>
                  <p className="text-primary-500 text-xs">{interest.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4 text-primary-700 text-lg leading-relaxed"
              >
                <p>
                  Hey there! 👋 I'm Arif, a passionate software engineer who believes that 
                  great code is not just functional—it's elegant, maintainable, and user-focused.
                </p>
                
                <p>
                  With over 8 years of experience, I've had the privilege of working with 
                  startups and established companies including one of the largest bank in south east asia, building everything from simple landing 
                  pages to complex enterprise applications.
                </p>
                
                <p>
                  I'm particularly passionate about backend development, 
                  but I also enjoy the challenges of frontend development and system architecture.
                </p>
              </motion.div>
            </div>

            {/* Skills Progress */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-primary-900">Core Skills</h3>
              
              {[
                { skill: 'Frontend Development', level: 80 },
                { skill: 'Backend Development', level: 88 },
                { skill: 'Mobile Development (Flutter)', level: 85 },
                { skill: 'DevOps & Deployment', level: 75 }
              ].map((item, index) => (
                <div key={item.skill} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-primary-800">{item.skill}</span>
                    <span className="text-accent-600 font-bold">{item.level}%</span>
                  </div>
                  <div className="skill-bar h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${item.level}%` } : { width: 0 }}
                      transition={{ duration: 1.5, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                      className="skill-progress h-full"
                    />
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="pt-6"
            >
              <motion.button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Let's Work Together
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}