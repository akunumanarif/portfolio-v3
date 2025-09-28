import './globals.css'

export const metadata = {
  title: 'John Doe - Software Engineer',
  description: 'Elegant portfolio showcasing modern web development skills and creative projects',
  keywords: 'software engineer, portfolio, web development, frontend, backend, full-stack',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased font-body">
        {children}
      </body>
    </html>
  )
}