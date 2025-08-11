# 🚀 Suryansh Sijwali - Personal Portfolio

A modern, responsive portfolio website built with Next.js 14, featuring a comprehensive design system, interactive components, and an integrated blog platform. This application showcases professional experience, research projects, and technical insights through an engaging user experience.

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
