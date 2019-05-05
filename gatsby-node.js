const path = require(`path`);
const fs = require(`fs`);

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  
  if(node.internal.type === `Airtable`) {
    const slug = '/' + node.data.Question.trim().toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/ /g, '-');
    
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
    
    const paragraphs = node.data.Answer.split(`\n`);
    let answerHtmlArray = [];
    paragraphs.forEach(paragraph => {
      let parsed = paragraph.replace(/\*(.*?)\*/g, `<strong>$1</strong>`).replace(/_(.*?)_/g, `<em>$1</em>`).replace(/\[(.*?)\]\((.*?)\)/g, '<a href=$2 target="_blank">$1</a>').trim();
      
      if(parsed.startsWith(`- `)) {
        parsed = `<ul><li>${parsed.replace(/- /g, '')}</li></ul>`
      } else if(parsed != '') {
        parsed = `<p>${parsed}</p>`;
      }
      
      answerHtmlArray.push(parsed);
    })
    
    const answerHtml = answerHtmlArray.join('');
    
    createNodeField({
      node,
      name: `answerHtml`,
      value: answerHtml
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  
  return graphql(`
    query {
      allAirtable(filter: {
        table: { eq: "Review Questions" }
        data: {
          Publish: { eq: true }
        }
      }) {
        edges {
          node {
            data {
              Question
              Big_Idea
              Enduring_Understanding
            }
            fields {
              slug
              answerHtml
            }
          }
        }
      }
    }
  `).then(result => {
    let rawData = [];
    
    result.data.allAirtable.edges.forEach(row => {
      rawData.push({
        Question: row.node.data.Question,
        Answer: row.node.fields.answerHtml,
        Big_Idea: row.node.data.Big_Idea,
        Enduring_Understanding: row.node.data.Enduring_Understanding,
        slug: row.node.fields.slug
      })
    })
    
    // create Big Idea pages
    
    const uniqueBigIdeas = Array.from(new Set(rawData.map(datum => datum.Big_Idea)));
    
    uniqueBigIdeas.forEach(number => {
      // first, fill an array with the Enduring Understanding letters
      let categorizedQuestions = {};
      
      for(const datum of rawData) {
        const enduringUnderstanding = datum.Enduring_Understanding;
        if(datum.Big_Idea === number && !categorizedQuestions[enduringUnderstanding]) {
          categorizedQuestions[enduringUnderstanding] = [];
        }
      }
      
      // then, filter through the raw data and add anything that matches
      for(const enduringUnderstandingLetter in categorizedQuestions) {
        const matchingQuestions = rawData.filter(datum => datum.Big_Idea === number && datum.Enduring_Understanding === enduringUnderstandingLetter);
        categorizedQuestions[enduringUnderstandingLetter] = matchingQuestions;
      }
      
      createPage({
        path: `/big-idea-` + number,
        component: path.resolve(`./src/templates/big-idea.js`),
        context: {
          categorizedQuestions
        }
      })
    })
    
    // create answer pages for each question
    
    rawData.forEach(row => {
      createPage({
        path: row.slug,
        component: path.resolve(`./src/templates/answer.js`),
        context: {
          row
        }
      })
    })
    
  })
}

exports.onPostBuild = ({ graphql }) => {
  return graphql(`
    query {
      allAirtable(filter: {
        table: { eq: "Review Questions" }
        data: {
          Publish: { eq: true }
        }
      }) {
        edges {
          node {
            data {
              Question
            }
            fields {
              slug
              answerHtml
            }
          }
        }
      }
    }
  `).then(response => {
    const data = response.data.allAirtable.edges;
    let searchSource = [];
    
    for(const datum of data) {
      const cleanAnswer = datum.node.fields.answerHtml.replace(/<(.*?)>/g, ' ');
      
      searchSource.push({
        question: datum.node.data.Question,
        slug: datum.node.fields.slug,
        questionAndAnswer: datum.node.data.Question + ' ' + cleanAnswer
      })
    }
    
    fs.writeFileSync(`./public/search.json`, JSON.stringify(searchSource, null, 2));
  })
}