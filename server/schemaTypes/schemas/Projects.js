// server/schemaTypes/schemas/Projects.js

export default {
  name: 'projects',
  title: 'Projects',
  type: 'document',

  fields: [
    {
      name: 'projectName',
      title: 'Project Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },

    {
      name: 'media',
      title: 'Project Image / Video',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          type: 'file',
          options: {
            accept: 'video/*',
          },
        },
      ],
    },

    {
      name: 'description',
      title: 'Project Description',
      type: 'text',
      rows: 5,
    },

    {
      name: 'teamMembers',
      title: 'Team Members',
      type: 'text',
      rows: 5
    },

    {
      name: 'repoLink',
      title: 'Repository Link',
      type: 'url',
    },

    {
      name: 'deployedLink',
      title: 'Deployed Link',
      type: 'url',
    },
  ],

  preview: {
    select: {
      title: 'projectName',
      media: 'media.0',
    },
  },
}