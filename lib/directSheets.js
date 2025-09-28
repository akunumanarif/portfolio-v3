// Utility untuk mengakses Google Sheets secara langsung (tanpa API Key)
// Untuk spreadsheet yang sudah di-share public

const SPREADSHEET_ID = '1padMyO8_TlahrywsMP8UOjeRCMpX2gvTkcOhjnVDgHU'

// Fungsi untuk fetch data langsung dari Google Sheets CSV export
export async function fetchExperienceDataFromSheets() {
  try {
    // Google Sheets CSV export URL format
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=0`
    
    const response = await fetch(csvUrl)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const csvText = await response.text()
    const experiences = parseCSVToExperiences(csvText)
    
    return experiences
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error)
    throw error
  }
}

export async function fetchSkillsDataFromSheets() {
  try {
    // GID 1 untuk sheet kedua (Skills)
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=1`
    
    const response = await fetch(csvUrl)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const csvText = await response.text()
    const skills = parseCSVToSkills(csvText)
    
    return skills
  } catch (error) {
    console.error('Error fetching skills from Google Sheets:', error)
    throw error
  }
}

function parseCSVToExperiences(csvText) {
  const lines = csvText.trim().split('\n')
  if (lines.length < 2) return []
  
  // Skip header line
  const dataLines = lines.slice(1)
  
  return dataLines.map(line => {
    const columns = parseCSVLine(line)
    
    return {
      title: columns[0] || '',
      company: columns[1] || '',
      location: columns[2] || '',
      period: columns[3] || '',
      type: columns[4] || '',
      description: columns[5] || '',
      achievements: columns[6] ? columns[6].split('|').map(a => a.trim()) : [],
      technologies: columns[7] ? columns[7].split('|').map(t => t.trim()) : []
    }
  }).filter(exp => exp.title && exp.company) // Filter out empty rows
}

function parseCSVToSkills(csvText) {
  const lines = csvText.trim().split('\n')
  if (lines.length < 2) return []
  
  // Skip header line
  const dataLines = lines.slice(1)
  
  return dataLines.map(line => {
    const columns = parseCSVLine(line)
    return columns[0] || '' // First column is skill name
  }).filter(skill => skill.trim()) // Filter out empty rows
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
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  
  result.push(current.trim())
  return result.map(item => item.replace(/^"|"$/g, '')) // Remove surrounding quotes
}