import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://suryansh-sijwali-portfolio-suryanshss1011s-projects.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://suryansh-sijwali-portfolio-suryanshss1011s-projects.vercel.app/#about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://suryansh-sijwali-portfolio-suryanshss1011s-projects.vercel.app/#research',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://suryansh-sijwali-portfolio-suryanshss1011s-projects.vercel.app/#experience',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://suryansh-sijwali-portfolio-suryanshss1011s-projects.vercel.app/#projects',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://suryansh-sijwali-portfolio-suryanshss1011s-projects.vercel.app/#skills',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://suryansh-sijwali-portfolio-suryanshss1011s-projects.vercel.app/#activities',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}