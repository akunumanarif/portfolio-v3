// Utility untuk mengkonversi Google Drive share link ke download link
export function convertGoogleDriveLink(shareUrl) {
  if (!shareUrl || typeof shareUrl !== 'string') {
    return shareUrl
  }
  
  // Cek apakah ini Google Drive share link
  const driveMatch = shareUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)\//)
  
  if (driveMatch && driveMatch[1]) {
    const fileId = driveMatch[1]
    // Konversi ke direct download link
    return `https://drive.google.com/uc?export=download&id=${fileId}`
  }
  
  // Jika bukan Google Drive link, kembalikan URL original
  return shareUrl
}

// Utility untuk membuka file di tab baru (untuk preview) atau download
export function handleFileDownload(url, filename) {
  if (!url) return
  
  // Buat link element sementara
  const link = document.createElement('a')
  link.href = convertGoogleDriveLink(url)
  
  if (filename) {
    link.download = filename
  }
  
  // Trigger download
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Utility untuk preview file (buka di tab baru)
export function handleFilePreview(url) {
  if (!url) return
  
  // Untuk Google Drive, gunakan preview URL
  if (url.includes('drive.google.com')) {
    window.open(url, '_blank')
  } else {
    window.open(url, '_blank')
  }
}