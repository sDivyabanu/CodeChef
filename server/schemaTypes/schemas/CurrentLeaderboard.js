export default {
  name: 'currentLeaderboard',
  title: 'Current Leaderboard',
  type: 'document',
  fields: [
    {
      name: 'top10',
      title: 'Top 10',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'users'}]}],
      validation: (Rule) =>
        Rule.max(10).error('At most 10 members can be in the leaderboard.').custom((refs) => {
          if (!refs) return true
          const ids = refs.map((r) => r?._ref).filter(Boolean)
          const hasDuplicates = new Set(ids).size !== ids.length
          return hasDuplicates ? 'The same member cannot appear twice in the leaderboard.' : true
        }),
    },
  ],
  preview: {
    select: {
      top10: 'top10',
    },
    prepare({top10}) {
      return {
        title: 'Current Leaderboard',
        subtitle: `${(top10 || []).length} member(s)`,
      }
    },
  },
}
