'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Code2, Sparkles, Heart } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

export default function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const scrollToNext = () => {
    const nextSection = document.querySelector('#about')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      ref={ref}
      id="home" 
      className="section hero-bg flex items-center justify-center relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm">
                <img 
                  src="/images/me.jpeg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating elements around image */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-cyan-500 rounded-full animate-bounce"></div>
              <div className="absolute top-1/2 -left-4 w-3 h-3 bg-teal-500 rounded-full animate-ping"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-8"
            >
              <Sparkles size={16} className="text-accent-500" />
              <span className="text-sm font-medium text-primary-700">Available for new opportunities</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-primary-900 mb-6 leading-tight"
            >
              Hi, I'm{' '}
              <span className="gradient-text">Arif Numan</span>
              <br />
              <span className="text-primary-700 text-3xl md:text-5xl lg:text-6xl">
                Software Engineer
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-primary-600 max-w-3xl mx-auto leading-relaxed mb-10"
            >
              Senior Software Engineer with over 8 years of experience in designing, developing, and deploying high-impact, scalable solutions for the financial technology and banking sectors. My expertise lies in building robust backend systems and full-stack applications, with a proven track record at one of Southeast Asia's largest banks.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <motion.button
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center space-x-2"
              >
                <Code2 size={20} />
                <span>View My Work</span>
              </motion.button>
              
              <motion.button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center space-x-2"
              >
                <Heart size={20} />
                <span>Let's Connect</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { label: 'Years Experience', value: '7+', desc: 'Building software' },
              { label: 'Projects Delivered', value: '10+', desc: 'Successful launches' },
              { label: 'Happy Clients', value: '100%', desc: 'Satisfaction rate' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="elegant-card p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-800 font-semibold mb-1">{stat.label}</div>
                <div className="text-primary-500 text-sm">{stat.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary-400 hover:text-accent-600 transition-colors duration-300"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
        >
          <ArrowDown size={32} />
        </motion.div>
      </motion.button>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent-200 rounded-full opacity-20 floating"></div>
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-accent-300 rounded-full opacity-30 floating" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 right-8 w-12 h-12 bg-accent-400 rounded-full opacity-25 floating" style={{ animationDelay: '4s' }}></div>
    </section>
  )
}