module.exports = {
  siteMetadata: {
    title: `Bio AP Study Guide`,
    description: `A study guide for the Biology AP Test, focused on studying through active recall by quizzing yourself.`,
    isWorkInProgress: true
  },
  plugins: [
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE,
            tableName: `Review Questions`
          }
        ]
      }
    },
    `gatsby-plugin-react-helmet`
  ]
}