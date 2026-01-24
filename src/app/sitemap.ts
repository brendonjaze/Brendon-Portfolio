import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://brendon-portfolio-mu.vercel.app/',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
    ]
}
