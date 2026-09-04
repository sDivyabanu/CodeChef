export default {
  name: 'member',
  title: 'Club Members',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'codechefUsername',
      title: 'CodeChef Username',
      type: 'string',
      description: 'Used to generate the profile link: https://www.codechef.com/users/{username}',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'codechefUsername',
      active: 'active',
    },
    prepare({title, subtitle, active}) {
      return {
        title,
        subtitle: `@${subtitle} — ${active === false ? 'Inactive' : 'Active'}`,
      }
    },
  },
}
