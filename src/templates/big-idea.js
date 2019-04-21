import React from 'react'
import Layout from '../components/layout'
import Intro from '../components/intro'
import Block from '../components/block'
import bigIdea from '../util/bigIdea'
import BackButton from '../components/backButton'
import Eyebrow from '../components/eyebrow'
import Heading from '../components/heading'
import { css } from '@emotion/core'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

export default ({ pageContext: { categorizedQuestions } }) => {
  const siteMetadata = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  ).site.siteMetadata
  
  // q for the first question — doesn't matter which one, really
  let q;
  for(const letter in categorizedQuestions) {
    q = categorizedQuestions[letter][0];
  }
  
  const bigIdeaNumber = q.Big_Idea;
  const bigIdeaStatement = bigIdea[bigIdeaNumber].statement;
  
  let blocks = [];
  
  for(const letter in categorizedQuestions) {
    blocks.push(<h2
      key={letter}
      css={css`
        font-size: 20px;
        font-weight: 600;
        line-height: 1.3;
        margin-top: 40px;
        margin-bottom: 16px;
      `}
    >{letter + ': ' + bigIdea[bigIdeaNumber][letter]}</h2>);
    let i = 0;
    categorizedQuestions[letter].forEach(question => {
      blocks.push(<Block key={letter + i} to={question.slug} text={question.Question} />);
      i++;
    })
  }
  
  const title = `Big Idea ${bigIdeaNumber} | ${siteMetadata.title}`;
  const description = `Practice questions for active recall about Big Idea ${bigIdeaNumber}: ${bigIdeaStatement}`;
  
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
      </Helmet>
      
      <BackButton to="/" />
      <Eyebrow text={"Big Idea " + bigIdeaNumber} />
      <Heading text={bigIdeaStatement} />
      
      <Intro>
        <p>
          As you read the questions below, see what you recall about the topic before reading the answer.
        </p>
      </Intro>
      
      {blocks}
      
    </Layout>
  )
}