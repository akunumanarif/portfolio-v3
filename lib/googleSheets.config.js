// Konfigurasi untuk Google Sheets (Opsional)
// Jika ingin menggunakan Google Sheets sebagai sumber data

export const GOOGLE_SHEETS_CONFIG = {
  // API Key dari Google Cloud Console
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY || '',
  
  // Spreadsheet ID dari URL Google Sheets
  // https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit
  spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID || '1padMyO8_TlahrywsMP8UOjeRCMpX2gvTkcOhjnVDgHU',
  
  // Range untuk data experience
  experienceRange: 'Sheet1!A1:H100', // Default sheet name
  
  // Range untuk data skills  
  skillsRange: 'Sheet2!A1:C100'
}

// Cara mendapatkan Google Sheets API Key:
// 1. Buka Google Cloud Console (console.cloud.google.com)
// 2. Buat project baru atau pilih yang sudah ada
// 3. Enable Google Sheets API
// 4. Buat credentials (API Key)
// 5. Restrict API key ke Google Sheets API saja
// 6. Tambahkan API key ke .env.local:
//    NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY=your_api_key_here
//    NEXT_PUBLIC_SPREADSHEET_ID=your_spreadsheet_id_here

// Cara membuat Spreadsheet ID:
// 1. Buat Google Spreadsheet baru
// 2. Copy ID dari URL (bagian setelah /d/ dan sebelum /edit)
// 3. Pastikan spreadsheet bisa diakses publik (Anyone with the link can view)
// 4. Buat sheet dengan nama "Experiences" dan "Skills" sesuai format