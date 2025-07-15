import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/_next/'],
    },
    sitemap: 'https://suryansh-sijwali-portfolio-suryanshss1011s-projects.vercel.app/sitemap.xml',
  }
}