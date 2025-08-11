# 🚀 Suryansh Sijwali - Personal Portfolio

A modern, responsive portfolio website built with Next.js 14, featuring a comprehensive design system, interactive components, and an integrated blog platform. This application showcases professional experience, research projects, and technical insights through an engaging user experience.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/suryanshss/personal-portfolio-website)

## ✨ Features

### 🎨 **Modern Design System**
- **Dark/Light Theme Support** - Seamless theme switching with `next-themes`
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Interactive Animations** - Powered by Framer Motion with reduced motion support
- **Custom Components** - Built with Radix UI primitives for accessibility

### 🏗️ **Architecture**
- **Atomic Design** - Components organized in atoms/molecules/organisms/templates
- **Type Safety** - Full TypeScript implementation with strict type checking
- **Performance Optimized** - Lazy loading, code splitting, and optimized builds
- **SEO Ready** - Meta tags, sitemap, and structured data

### 📝 **Blog System**
- **MDX Support** - Rich content with React components in Markdown
- **Syntax Highlighting** - Code blocks with highlight.js
- **Content Management** - File-based content with frontmatter
- **Blog Categories** - Research, Development, Tutorial, and Insights

### 🎵 **Interactive Features**
- **Music Player** - Global music player with Vercel Blob storage
- **Custom Cursor** - Interactive cursor with motion effects
- **Floating Particles** - Dynamic background animations
- **Smooth Scrolling** - Section navigation with progress indicators

### 🔧 **Developer Experience**
- **Hot Reload** - Fast development with Next.js
- **ESLint + TypeScript** - Code quality and type safety
- **Barrel Exports** - Clean import statements for better DX
- **Error Boundaries** - Graceful error handling

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 14.2.16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.3.0 + tailwindcss-animate
- **Animations**: Framer Motion (latest)
- **Icons**: Lucide React 0.263.1

### **Content**
- **MDX**: @mdx-js/react 3.1.0 + next-mdx-remote 5.0.0
- **Markdown Processing**: unified, remark, rehype
- **Syntax Highlighting**: highlight.js 11.11.1
- **Frontmatter**: gray-matter 4.0.3

### **UI Components**
- **Primitives**: Radix UI (Label, Progress, Slot, Tabs)
- **Variants**: class-variance-authority 0.7.1
- **Utilities**: clsx 2.1.1, tailwind-merge 2.6.0

### **Analytics & Performance**
- **Analytics**: Vercel Analytics 1.5.0
- **Performance**: Vercel Speed Insights 1.2.0
- **Storage**: Vercel Blob 1.1.1

## 📁 Project Structure

```
suryansh-portfolio/
├── app/                          # Next.js App Router
│   ├── blogs/                    # Blog pages
│   │   ├── [slug]/page.tsx      # Dynamic blog post pages
│   │   └── page.tsx             # Blog listing page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/                   # React components (Atomic Design)
│   ├── atoms/                   # Basic building blocks
│   │   ├── animations/          # Animation components
│   │   ├── blog/               # Blog-specific atoms
│   │   ├── error-handling/     # Error boundaries
│   │   ├── interactive/        # Interactive components
│   │   ├── loading/            # Loading states
│   │   ├── typography/         # Text components
│   │   ├── ui/                 # Base UI components
│   │   └── visual/             # Visual effects
│   ├── molecules/              # Component combinations
│   │   ├── blog/               # Blog molecules
│   │   ├── cards/              # Card components
│   │   ├── data-display/       # Data presentation
│   │   ├── lists/              # List components
│   │   └── navigation/         # Navigation elements
│   ├── organisms/              # Complex components
│   │   ├── blog/               # Blog organisms
│   │   ├── layout/             # Layout components
│   │   ├── media/              # Media components
│   │   └── sections/           # Page sections
│   ├── page-templates/         # Page layouts
│   └── providers/              # Context providers
├── content/                     # Content files
│   └── blog/                   # Blog posts (MDX)
├── data/                       # Static data
│   ├── experience.ts           # Work experience
│   ├── personal-info.ts        # Personal information
│   ├── projects.ts             # Project data
│   └── skills.ts               # Skills data
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions
├── types/                      # TypeScript definitions
└── public/                     # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/suryanshss/personal-portfolio-website.git
   cd personal-portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your environment variables (Vercel Blob tokens, analytics IDs, etc.)

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Content Management

### Adding Blog Posts

1. **Create a new MDX file** in `content/blog/`
   ```bash
   touch content/blog/my-new-post.mdx
   ```

2. **Add frontmatter**
   ```mdx
   ---
   title: "Your Post Title"
   excerpt: "Brief description of your post"
   date: "2024-01-01"
   category: "Development"
   tags: ["Next.js", "React"]
   readTime: "5 min read"
   author:
     name: "Your Name"
     avatar: "/path/to/avatar.jpg"
   ---

   Your content here...
   ```

3. **Use custom components**
   ```mdx
   <Callout type="info" title="Pro Tip">
   Your callout content here
   </Callout>

   <CodeBlock language="javascript" title="Example Code">
   console.log('Hello, World!');
   </CodeBlock>
   ```

### Updating Personal Data

Edit the files in the `data/` directory:
- `personal-info.ts` - Personal details, education, interests
- `experience.ts` - Work experience and achievements
- `projects.ts` - Portfolio projects
- `skills.ts` - Technical skills and categories

## 📊 Performance

### Lighthouse Scores

- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Optimizations

- Image optimization with Next.js Image component
- Lazy loading of heavy sections
- Code splitting and dynamic imports
- Font optimization and preloading
- Minimal JavaScript bundles

## 🔧 Architecture Decisions

### Component Organization

- **Atomic Design**: Clear component hierarchy and reusability
- **Barrel Exports**: Only in safe directories (types, data, hooks) to avoid circular dependencies
- **Type Safety**: Comprehensive TypeScript coverage

### Content Strategy

- **MDX Integration**: Rich content capabilities with React components
- **File-based CMS**: Git-based content workflow
- **SEO Optimization**: Structured data and meta tags

### Performance Strategy

- **Static Generation**: Pre-rendered pages for optimal performance
- **Dynamic Imports**: Lazy loading for code splitting
- **Error Boundaries**: Graceful error handling
