module.exports = {
  siteMetadata: {
    siteUrl: `https://bio.elk.sh`,
    title: `AP Bio Study Guide`,
    description: `A study guide for the Biology AP Test, focused on studying through active recall by quizzing yourself instead of reading notes.`,
    isWorkInProgress: false
  },
  plugins: [
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE,
            tableName: `Review Questions`,
            tableView: `Grid view`
          }
        ]
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-fathom`,
      options: {
        siteId: `ABCCMBVP`
      }
    },
    `gatsby-plugin-sitemap`
  ]
}