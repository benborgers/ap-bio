import React from 'react'
import Layout from '../components/layout'
import Intro from '../components/intro'
import Block from '../components/block'
import bigIdea from '../util/bigIdea'
import BackButton from '../components/backButton'
import Eyebrow from '../components/eyebrow'
import Heading from '../components/heading'
import { css } from '@emotion/core'

export default ({ pageContext: { categorizedQuestions } }) => {
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
  
  return (
    <Layout>
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