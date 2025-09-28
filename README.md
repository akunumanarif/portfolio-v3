# Elegant Portfolio Website

A modern, elegant portfolio website built with Next.js and Framer Motion, showcasing software engineering skills and projects with beautiful animations and dynamic data integration.

## 🌟 Features

- **Dynamic Data**: Google Sheets integration for easy content management
- **Smooth Animations**: Framer Motion powered animations and transitions  
- **Responsive Design**: Optimized for all device sizes and screen resolutions
- **Modern UI/UX**: Elegant cards, gradient effects, and clean design
- **Performance Optimized**: Fast loading, optimized images, and efficient rendering
- **Contact Form**: Functional contact form with validation
- **Social Integration**: Links to GitHub, LinkedIn, and other social platforms

## 🛠️ Technologies Used

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Data Management
- **Google Sheets API** - Dynamic content management
- **CSV Export** - Fallback data source
- **React Intersection Observer** - Scroll-triggered animations

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. **Clone the repository** (if using Git)
   ```bash
   git clone [your-repo-url]
   cd elegant-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
elegant-portfolio/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles
│   ├── layout.js                # Root layout
│   └── page.js                  # Home page
├── components/
│   ├── sections/                # Page sections
│   │   ├── HeroSection.js       # Landing section
│   │   ├── AboutSection.js      # About me section
│   │   ├── SkillsSection.js     # Skills showcase
│   │   ├── ProjectsSection.js   # Projects gallery
│   │   └── ContactSection.js    # Contact form
│   └── ui/                      # UI components
│       └── Navbar.js            # Navigation bar
├── public/                      # Static assets
├── package.json                 # Dependencies
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind configuration
└── postcss.config.js           # PostCSS configuration
```

## 🎨 Customization

### Personal Information

Update the following files with your personal information:

1. **Hero Section** (`components/sections/HeroSection.js`)
   - Change name and title
   - Update statistics and descriptions

2. **About Section** (`components/sections/AboutSection.js`)
   - Add your personal story
   - Update skills and experience levels

3. **Skills Section** (`components/sections/SkillsSection.js`)
   - Modify skill categories and proficiency levels
   - Add or remove technologies

4. **Projects Section** (`components/sections/ProjectsSection.js`)
   - Replace with your actual projects
   - Add project images, descriptions, and links

5. **Contact Section** (`components/sections/ContactSection.js`)
   - Update contact information
   - Modify social media links

### Styling

- **Colors**: Modify the color scheme in `tailwind.config.js`
- **Animations**: Adjust animations in `globals.css` and component files
- **Components**: Customize sections in the `components/sections` folder

### Performance Optimization

- **Images**: Add optimized images to the `public` folder
- **SEO**: Update metadata in `app/layout.js`
- **Analytics**: Add Google Analytics or other tracking services

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

The project can also be deployed to:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Any platform supporting Next.js

## 📱 Browser Support

- Chrome (recommended for best 3D performance)
- Firefox
- Safari
- Edge

**Note**: Works best on modern browsers with good CSS animation support.

## 🔧 Troubleshooting

### Common Issues

1. **Google Sheets Data Not Loading**
   - Check .env.local file configuration
   - Verify spreadsheet is publicly accessible
   - Ensure correct sheet names and column headers
   - Check browser console for API errors

2. **Animation Performance Issues**

2. **Performance Issues**
   - Optimize images and reduce file sizes
   - Check for heavy animations or effects
   - Use React DevTools for performance profiling

3. **Build Errors**
   - Clear `.next` folder and reinstall dependencies
   - Check for TypeScript errors if using TypeScript
   - Verify all imports are correct

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the excellent framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Google Sheets API](https://developers.google.com/sheets/api) for dynamic data integration
- [Lucide React](https://lucide.dev/) for beautiful icons

## 📞 Support

If you have any questions or need help customizing the portfolio, feel free to reach out:

- Email: [your-email@example.com]
- GitHub Issues: [Create an issue]
- LinkedIn: [Your LinkedIn Profile]

---

**Built with ❤️ using Next.js and Framer Motion**