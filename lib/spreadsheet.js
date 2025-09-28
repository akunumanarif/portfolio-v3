// Utility untuk membaca data dari CSV/Spreadsheet
export async function fetchExperienceData() {
  console.log('🔄 Fetching experience data...')
  
  try {
    // Priority 1: Coba Google Sheets langsung (untuk public sheets)
    if (process.env.NEXT_PUBLIC_SPREADSHEET_ID) {
      try {
        console.log('📊 Trying Google Sheets with ID:', process.env.NEXT_PUBLIC_SPREADSHEET_ID)
        const experiencesFromSheets = await fetchDirectFromGoogleSheets(
          process.env.NEXT_PUBLIC_SPREADSHEET_ID,
          'Experiences'
        )
        console.log('✅ Successfully loaded experiences from Google Sheets:', experiencesFromSheets.length, 'items')
        return experiencesFromSheets.map(exp => ({
          ...exp,
          achievements: exp.achievements ? exp.achievements.split('|').filter(a => a.trim()) : [],
          technologies: exp.technologies ? exp.technologies.split('|').filter(t => t.trim()) : []
        }))
      } catch (sheetsError) {
        console.warn('❌ Google Sheets failed:', sheetsError.message)
      }
    }

    // Priority 2: Coba Google Sheets dengan API Key (jika ada)
    if (process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY && process.env.NEXT_PUBLIC_SPREADSHEET_ID) {
      try {
        console.log('🔑 Trying Google Sheets API...')
        const experiencesFromSheets = await fetchFromGoogleSheets(
          process.env.NEXT_PUBLIC_SPREADSHEET_ID,
          'Experiences!A1:H100',
          process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY
        )
        
        return experiencesFromSheets.map(exp => ({
          ...exp,
          achievements: exp.achievements ? exp.achievements.split('|').filter(a => a.trim()) : [],
          technologies: exp.technologies ? exp.technologies.split('|').filter(t => t.trim()) : []
        }))
      } catch (sheetsError) {
        console.warn('❌ Google Sheets API failed:', sheetsError.message)
      }
    }

    // Priority 3: Fallback ke CSV lokal
    const response = await fetch('/data/experiences.csv')
    if (!response.ok) {
      throw new Error('Failed to fetch experience data')
    }
    
    const csvText = await response.text()
    const experiences = parseCSV(csvText)
    
    return experiences.map(exp => ({
      ...exp,
      achievements: exp.achievements ? exp.achievements.split('|') : [],
      technologies: exp.technologies ? exp.technologies.split('|') : []
    }))
  } catch (error) {
    console.error('Error fetching experience data:', error)
    // Return fallback data jika gagal
    return getFallbackExperiences()
  }
}

export async function fetchSkillsData() {
  console.log('🔄 Fetching skills data...')
  
  try {
    // Priority 1: Coba Google Sheets langsung
    if (process.env.NEXT_PUBLIC_SPREADSHEET_ID) {
      try {
        console.log('📊 Trying Google Sheets for skills...')
        const skillsFromSheets = await fetchDirectFromGoogleSheets(
          process.env.NEXT_PUBLIC_SPREADSHEET_ID,
          'Skills'
        )
        console.log('✅ Successfully loaded skills from Google Sheets:', skillsFromSheets.length, 'items')
        return skillsFromSheets.map(skill => skill.skill || skill.name || skill.Skill)
      } catch (sheetsError) {
        console.warn('❌ Google Sheets skills failed:', sheetsError.message)
      }
    }

    // Priority 2: Coba Google Sheets dengan API Key
    if (process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY && process.env.NEXT_PUBLIC_SPREADSHEET_ID) {
      try {
        console.log('🔑 Trying Google Sheets API for skills...')
        const skillsFromSheets = await fetchFromGoogleSheets(
          process.env.NEXT_PUBLIC_SPREADSHEET_ID,
          'Skills!A1:C100',
          process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY
        )
        
        return skillsFromSheets.map(skill => skill.skill || skill.name || skill.Skill)
      } catch (sheetsError) {
        console.warn('❌ Google Sheets API skills failed:', sheetsError.message)
      }
    }

    // Priority 3: Fallback ke CSV lokal
    console.log('📁 Falling back to local CSV...')
    const response = await fetch('/data/skills.csv')
    if (!response.ok) {
      throw new Error('Failed to fetch skills data')
    }
    
    const csvText = await response.text()
    const skills = parseCSV(csvText)
    
    return skills.map(skill => skill.skill || skill.name) // Handle different column names
  } catch (error) {
    console.error('❌ Error fetching skills data:', error)
    console.log('🔄 Using fallback skills...')
    return getFallbackSkills()
  }
}

export async function fetchProjectsData() {
  console.log('🔄 Fetching projects data...')
  
  try {
    // Priority 1: Coba Google Sheets langsung
    if (process.env.NEXT_PUBLIC_SPREADSHEET_ID) {
      try {
        console.log('📊 Trying Google Sheets for projects...')
        const projectsFromSheets = await fetchDirectFromGoogleSheets(
          process.env.NEXT_PUBLIC_SPREADSHEET_ID,
          'Projects'
        )
        console.log('✅ Successfully loaded projects from Google Sheets:', projectsFromSheets.length, 'items')
        return projectsFromSheets.map(project => ({
          ...project,
          tags: project.tags ? project.tags.split('|').filter(t => t.trim()) : [],
          featured: project.featured === 'TRUE' || project.featured === 'true' || project.featured === '1',
          metrics: project.metrics ? parseMetrics(project.metrics) : {}
        }))
      } catch (sheetsError) {
        console.warn('❌ Google Sheets projects failed:', sheetsError.message)
      }
    }

    // Priority 2: Coba Google Sheets dengan API Key
    if (process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY && process.env.NEXT_PUBLIC_SPREADSHEET_ID) {
      try {
        console.log('🔑 Trying Google Sheets API for projects...')
        const projectsFromSheets = await fetchFromGoogleSheets(
          process.env.NEXT_PUBLIC_SPREADSHEET_ID,
          'Projects!A1:L100',
          process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY
        )
        
        return projectsFromSheets.map(project => ({
          ...project,
          tags: project.tags ? project.tags.split('|').filter(t => t.trim()) : [],
          featured: project.featured === 'TRUE' || project.featured === 'true' || project.featured === '1',
          metrics: project.metrics ? parseMetrics(project.metrics) : {}
        }))
      } catch (sheetsError) {
        console.warn('❌ Google Sheets API projects failed:', sheetsError.message)
      }
    }

    // Priority 3: Fallback ke CSV lokal
    console.log('📁 Falling back to local CSV for projects...')
    const response = await fetch('/data/projects.csv')
    if (!response.ok) {
      throw new Error('Failed to fetch projects data')
    }
    
    const csvText = await response.text()
    const projects = parseCSV(csvText)
    
    return projects.map(project => ({
      ...project,
      tags: project.tags ? project.tags.split('|').filter(t => t.trim()) : [],
      featured: project.featured === 'TRUE' || project.featured === 'true' || project.featured === '1',
      metrics: project.metrics ? parseMetrics(project.metrics) : {}
    }))
  } catch (error) {
    console.error('❌ Error fetching projects data:', error)
    console.log('🔄 Using fallback projects...')
    return getFallbackProjects()
  }
}

// Helper function to parse metrics string
function parseMetrics(metricsString) {
  try {
    if (!metricsString) return {}
    
    const metrics = {}
    const pairs = metricsString.split('|')
    
    pairs.forEach(pair => {
      const [key, value] = pair.split(':')
      if (key && value) {
        metrics[key.trim()] = value.trim()
      }
    })
    
    return metrics
  } catch (error) {
    console.warn('Error parsing metrics:', error)
    return {}
  }
}

// Parse CSV text to array of objects
function parseCSV(csvText) {
  const lines = csvText.trim().split('\n')
  if (lines.length < 2) return []
  
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
  const data = []
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    if (values.length === headers.length) {
      const obj = {}
      headers.forEach((header, index) => {
        obj[header] = values[index].trim().replace(/"/g, '')
      })
      data.push(obj)
    }
  }
  
  return data
}

// Parse single CSV line handling commas inside quotes
function parseCSVLine(line) {
  const result = []
  let current = ''
  let inQuotes = false
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  
  result.push(current)
  return result
}

// Fallback data jika CSV tidak tersedia
function getFallbackExperiences() {
  return [
    {
      title: 'Senior Software Engineer',
      company: 'TechCorp Solutions',
      location: 'Jakarta, Indonesia',
      period: '2022 - Present',
      type: 'Full-time',
      description: 'Lead frontend development for enterprise web applications using React, Next.js, and TypeScript. Mentored junior developers and established coding standards.',
      achievements: [
        'Improved application performance by 40%',
        'Led team of 5 developers',
        'Implemented CI/CD pipeline'
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL']
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Startup Inc.',
      location: 'Remote',
      period: '2020 - 2022',
      type: 'Full-time',
      description: 'Developed responsive web applications and mobile apps using modern JavaScript frameworks. Collaborated with designers to create pixel-perfect implementations.',
      achievements: [
        'Built 10+ client projects',
        'Increased user engagement by 60%',
        'Reduced load times by 50%'
      ],
      technologies: ['Vue.js', 'React', 'Flutter', 'Firebase', 'Tailwind CSS']
    },
    {
      title: 'Junior Web Developer',
      company: 'Creative Agency',
      location: 'Bandung, Indonesia',
      period: '2019 - 2020',
      type: 'Full-time',
      description: 'Started my professional journey building websites for local businesses. Gained experience in full-stack development and client communication.',
      achievements: [
        'Completed 25+ websites',
        '100% client satisfaction',
        'Learned modern frameworks'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'WordPress']
    }
  ]
}

function getFallbackSkills() {
  return [
    'React.js', 'Next.js', 'Vue.js', 'TypeScript', 'Node.js', 
    'Express.js', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker',
    'AWS', 'Vercel', 'Figma', 'Git', 'Jest', 'Tailwind CSS'
  ]
}

function getFallbackProjects() {
  return [
    {
      title: 'EcoTrack - Sustainability App',
      description: 'A comprehensive sustainability tracking app that helps users monitor their carbon footprint, set eco-friendly goals, and connect with like-minded individuals.',
      category: 'Mobile App',
      year: '2024',
      tags: ['React Native', 'Node.js', 'MongoDB', 'Socket.io', 'Chart.js'],
      github: '#',
      live: '#',
      status: 'Live',
      featured: true,
      metrics: { users: '10K+', rating: '4.8', downloads: '50K+' }
    },
    {
      title: 'TaskFlow - Project Management',
      description: 'An intuitive project management platform with real-time collaboration, advanced analytics, and integrated time tracking for teams.',
      category: 'Web App',
      year: '2023',
      tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
      github: '#',
      live: '#',
      status: 'Live',
      featured: true,
      metrics: { users: '5K+', rating: '4.9', teams: '200+' }
    },
    {
      title: 'AI Content Generator',
      description: 'A smart content generation tool powered by AI that helps marketers create engaging social media posts, blog articles, and ad copy.',
      category: 'SaaS',
      year: '2024',
      tags: ['React', 'Python', 'FastAPI', 'OpenAI API', 'Stripe'],
      github: '#',
      live: '#',
      status: 'Beta',
      featured: true,
      metrics: { users: '2K+', content: '100K+', accuracy: '95%' }
    },
    {
      title: 'Recipe Finder App',
      description: 'Discover recipes based on ingredients you have at home. Features meal planning, shopping lists, and nutritional information.',
      category: 'Mobile App',
      year: '2023',
      tags: ['Flutter', 'Firebase', 'Spoonacular API'],
      github: '#',
      live: '#',
      status: 'Live',
      featured: false
    },
    {
      title: 'Crypto Portfolio Tracker',
      description: 'Real-time cryptocurrency portfolio tracking with advanced analytics, price alerts, and news integration.',
      category: 'Web App',
      year: '2022',
      tags: ['Vue.js', 'Chart.js', 'CoinGecko API'],
      github: '#',
      live: '#',
      status: 'Live',
      featured: false
    }
  ]
}

// Direct fetch from public Google Sheets (tanpa API key)
async function fetchDirectFromGoogleSheets(spreadsheetId, sheetName) {
  try {
    // Gunakan CSV export URL untuk public Google Sheets
    const csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`
    console.log('📡 Fetching from URL:', csvUrl)
    
    const response = await fetch(csvUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch from Google Sheets: ${response.status} ${response.statusText}`)
    }
    
    const csvText = await response.text()
    console.log('📄 CSV Response length:', csvText.length)
    
    if (!csvText.trim()) {
      throw new Error('Empty response from Google Sheets')
    }
    
    const data = parseCSV(csvText)
    console.log('✨ Parsed data:', data)
    return data
  } catch (error) {
    console.error('💥 Error in fetchDirectFromGoogleSheets:', error)
    throw error
  }
}

// Fetch Download data
export async function fetchDownloadData() {
  console.log('🔄 Fetching download data...')
  
  try {
    // Priority 1: Coba Google Sheets langsung (untuk public sheets)
    if (process.env.NEXT_PUBLIC_SPREADSHEET_ID) {
      try {
        console.log('📊 Trying Google Sheets with ID:', process.env.NEXT_PUBLIC_SPREADSHEET_ID)
        const downloadFromSheets = await fetchDirectFromGoogleSheets(
          process.env.NEXT_PUBLIC_SPREADSHEET_ID,
          'Download'
        )
        console.log('✅ Successfully loaded download data from Google Sheets:', downloadFromSheets.length, 'items')
        return downloadFromSheets
      } catch (sheetsError) {
        console.warn('❌ Google Sheets failed for download:', sheetsError.message)
      }
    }

    // Priority 2: Coba Google Sheets dengan API Key (jika ada)
    if (process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY && process.env.NEXT_PUBLIC_SPREADSHEET_ID) {
      try {
        console.log('🔑 Trying Google Sheets API for download...')
        const downloadFromSheets = await fetchFromGoogleSheets(
          process.env.NEXT_PUBLIC_SPREADSHEET_ID,
          'Download!A1:E100',
          process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY
        )
        
        return downloadFromSheets
      } catch (sheetsError) {
        console.warn('❌ Google Sheets API failed for download:', sheetsError.message)
      }
    }

    // Priority 3: Fallback ke CSV lokal
    const response = await fetch('/data/download.csv')
    if (!response.ok) {
      throw new Error('Failed to fetch download data')
    }
    
    const csvText = await response.text()
    const data = parseCSV(csvText)
    console.log('📄 Using fallback CSV for download data:', data.length, 'items')
    
    return data
  } catch (error) {
    console.error('💥 Error fetching download data:', error)
    
    // Ultimate fallback dengan data hardcoded
    return [{
      label: 'Resume',
      url: 'https://drive.google.com/file/d/1ZFD1fcVhMDdzdCZS8hUBSEWbYwIeK075/view?usp=sharing',
      filename: 'Resume.pdf',
      version: 'v1.0',
      updated: '2024-09'
    }]
  }
}

// Google Sheets API integration (optional)
export async function fetchFromGoogleSheets(spreadsheetId, range, apiKey) {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`
    const response = await fetch(url)
    const data = await response.json()
    
    if (!data.values) return []
    
    const [headers, ...rows] = data.values
    return rows.map(row => {
      const obj = {}
      headers.forEach((header, index) => {
        obj[header] = row[index] || ''
      })
      return obj
    })
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error)
    throw error
  }
}