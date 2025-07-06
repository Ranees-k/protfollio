export default {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Project Title',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'description',
        title: 'Project Description',
        type: 'text',
        validation: Rule => Rule.required()
      },
      {
        name: 'technologies',
        title: 'Technologies Used',
        type: 'array',
        of: [{ type: 'string' }],
        validation: Rule => Rule.required().min(1)
      },
      {
        name: 'image',
        title: 'Project Image',
        type: 'image',
        options: {
          hotspot: true
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'projectLink',
        title: 'Live Project URL',
        type: 'url',
        validation: Rule => Rule.required()
      },
      {
        name: 'githubLink',
        title: 'GitHub Repository URL',
        type: 'url',
        validation: Rule => Rule.required()
      },
      {
        name: 'category',
        title: 'Category',
        type: 'reference',
        to: [{ type: 'category' }],
        validation: Rule => Rule.required()
      },
    ]
  };
  