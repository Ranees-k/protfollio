export default {
    name: 'about',
    title: 'About',
    type: 'document',
    fields: [
      {
        name: 'summary',
        title: 'Summary',
        type: 'text'
      },
      {
        name: 'frontend',
        title: 'Frontend',
        type: 'array',
        of: [{ type: 'string' }]
      },
      {
        name: 'backend',
        title: 'Backend',
        type: 'array',
        of: [{ type: 'string' }]
      },
      {
        name: 'tools',
        title: 'Tools',
        type: 'array',
        of: [{ type: 'string' }]
      },
      {
        name: 'focus',
        title: 'Focus',
        type: 'array',
        of: [{ type: 'string' }]
      }
    ]
  }
  