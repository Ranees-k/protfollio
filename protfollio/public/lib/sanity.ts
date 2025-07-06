import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'rksihl2j',   // Replace with your actual Project ID
  dataset: 'production',          // Replace with your dataset name
  apiVersion: '2024-06-01',       // Use today's date for the API version
  useCdn: true                    // Faster, good for production
})