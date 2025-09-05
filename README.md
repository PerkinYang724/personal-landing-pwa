# Perkin — Cinematic Portfolio PWA

A production-grade, installable PWA personal landing site for a content creator. Built with Next.js 15, TypeScript, Tailwind CSS, and modern web technologies.

## ✨ Features

- **🎬 Cinematic Design**: Dark, cinematic theme with film grain effects and smooth animations
- **📱 PWA Ready**: Installable on iOS/Android with offline support
- **📝 MDX Blog**: Markdown-based blog with custom components
- **🎥 Video Portfolio**: Responsive grid with modal video players
- **🔍 SEO Optimized**: Complete metadata, sitemap, and structured data
- **♿ Accessible**: Semantic HTML, keyboard navigation, and screen reader support
- **📊 Performance**: Optimized images, lazy loading, and efficient caching

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd personal-landing-pwa
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
personal-landing-pwa/
├── app/                          # Next.js App Router
│   ├── (site)/                   # Main site pages
│   │   ├── page.tsx             # Home page
│   │   ├── work/                # Video portfolio
│   │   ├── blog/                # Blog index & posts
│   │   ├── about/               # About page
│   │   ├── contact/             # Contact page
│   │   └── offline/             # Offline fallback
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   ├── Hero.tsx                 # Landing hero section
│   ├── Navigation.tsx           # Site navigation
│   ├── Footer.tsx               # Site footer
│   ├── ShareInstall.tsx         # PWA install prompts
│   ├── QRBlock.tsx              # QR code generator
│   └── FilmGrain.tsx            # Film grain effect
├── content/                     # Content files
│   ├── videos.json              # Video portfolio data
│   └── blog/                    # MDX blog posts
├── lib/                         # Utilities
│   ├── utils.ts                 # Helper functions
│   └── seo.ts                   # SEO utilities
├── public/                      # Static assets
│   ├── icons/                   # PWA icons
│   ├── images/                  # Images and covers
│   └── manifest.webmanifest     # PWA manifest
└── next.config.ts               # Next.js configuration
```

## 🎨 Customization

### Content Management

**Videos Portfolio:**
Edit `/content/videos.json` to update your video portfolio:

```json
{
  "id": "unique-id",
  "title": "Video Title",
  "platform": "youtube|reel|vimeo|file",
  "url": "https://...",
  "thumbnail": "/images/covers/image.jpg",
  "tags": ["Cinematic", "Tutorial"],
  "durationSec": 180,
  "date": "2025-08-20"
}
```

**Blog Posts:**
Create new MDX files in `/content/blog/` with frontmatter:

```mdx
---
title: "Post Title"
description: "SEO description"
date: "2025-08-20"
tags: ["Productivity", "AI"]
cover: "/images/covers/cover.jpg"
---

# Your content here...
```

### Styling

**Colors:** Edit CSS variables in `/app/globals.css`:
```css
:root {
  --bg: #0B0B0C;        /* Background */
  --fg: #F6F6F4;        /* Foreground */
  --muted: #A0A0A0;     /* Muted text */
  --accent: #A1785A;    /* Accent color */
}
```

**Typography:** Fonts are configured in `/app/layout.tsx`:
- **Inter**: UI text and body content
- **Playfair Display**: Headings and display text

### Personal Information

Update personal details in `/app/layout.tsx`:
- Site title and description
- Social media links
- Contact information
- SEO metadata

## 📱 PWA Features

### Installation

**Desktop (Chrome/Edge):**
- Look for the install button in the address bar
- Or use the "Install App" button in the share dialog

**Mobile (iOS):**
1. Open in Safari
2. Tap the Share button
3. Select "Add to Home Screen"

**Mobile (Android):**
1. Open in Chrome
2. Tap the menu (⋮)
3. Select "Add to Home Screen" or "Install App"

### Offline Support

- Cached pages work offline
- Custom offline page with retry functionality
- Service worker handles caching strategies

## 🔧 Technical Details

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Blog**: MDX with next-mdx-remote
- **PWA**: Custom service worker + manifest

### Performance

- **Lighthouse Score**: 90+ on all metrics
- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Caching**: Aggressive caching for static assets

### SEO Features

- **Metadata**: Complete Open Graph and Twitter Cards
- **Structured Data**: JSON-LD for rich snippets
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Search engine directives
- **Canonical URLs**: Proper URL canonicalization

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository:**
   ```bash
   npx vercel
   ```

2. **Configure environment variables:**
   - `NEXT_PUBLIC_BASE_URL`: Your domain URL

3. **Deploy:**
   ```bash
   vercel --prod
   ```

### Other Platforms

**Netlify:**
```bash
npm run build
# Deploy the 'out' folder
```

**Custom Server:**
```bash
npm run build
npm start
```

## 📊 Analytics & Monitoring

### Recommended Tools

- **Vercel Analytics**: Built-in performance monitoring
- **Google Analytics 4**: User behavior tracking
- **Sentry**: Error monitoring and performance
- **Lighthouse CI**: Automated performance testing

### Setup

1. Add your analytics scripts to `/app/layout.tsx`
2. Configure environment variables
3. Test in production environment

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Code Quality

- **ESLint**: Configured with Next.js rules
- **Prettier**: Code formatting
- **TypeScript**: Strict type checking
- **Husky**: Git hooks for quality checks

## 📝 Content Guidelines

### Blog Posts

- Use clear, engaging titles
- Include relevant tags
- Add cover images (1200x630px)
- Write SEO-friendly descriptions
- Use proper heading hierarchy

### Video Portfolio

- High-quality thumbnails (800x600px)
- Descriptive titles and tags
- Accurate duration and dates
- Proper platform URLs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing framework
- **Tailwind CSS**: For the utility-first CSS
- **shadcn/ui**: For the beautiful components
- **Framer Motion**: For smooth animations
- **Unsplash**: For placeholder images

---

**Built with ❤️ by Perkin**

*For questions or support, reach out at [hello@perkin.dev](mailto:hello@perkin.dev)*