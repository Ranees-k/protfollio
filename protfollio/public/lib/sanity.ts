import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'rksihl2j',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-06-01',       // Use today's date for the API version
  useCdn: true                    // Faster, good for production
})