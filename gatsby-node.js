exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  
  if(node.internal.type === `Airtable`) {
    const slug = '/' + node.data.Question.trim().toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/ /g, '-');
    
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  }
}