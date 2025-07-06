// /schemas/technology.js
export default {
    name: 'technology',
    title: 'Technology',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Technology Name',
        type: 'string',
        validation: Rule => Rule.required()
      }
    ]
  };
  