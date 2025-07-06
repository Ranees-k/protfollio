export default {
    name: 'contact',
    title: 'Contact Info',
    type: 'document',
    fields: [
      {
        name: 'email',
        title: 'Email',
        type: 'string',
        validation: Rule => Rule.required().email()
      },
      {
        name: 'phone',
        title: 'Phone Number',
        type: 'string',
        validation: Rule => Rule.required().regex(/^\+?\d{10,15}$/, {
          name: 'Phone Number',
          invert: false,
          message: 'Phone number must be between 10 and 15 digits, optionally starting with +'
        })
      },
      {
        name: 'location',
        title: 'Location',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'socialLinks',
        title: 'Social Links',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'platform', title: 'Platform', type: 'string' },
              { name: 'url', title: 'URL', type: 'url' },
              {
                name: 'icon',
                title: 'Icon (SVG Path)',
                type: 'text',
                description: 'Paste the SVG path (not the full <svg>)'
              },
              {
                name: 'color',
                title: 'Color',
                type: 'string',
                description: 'Tailwind color (e.g. gray, blue, cyan, etc.)'
              }
            ]
          }
        ]
      }
    ]
  };
  