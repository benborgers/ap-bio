import React from 'react'
import Layout from '../components/layout'
import Intro from '../components/intro'
import Block from '../components/block'
import bigIdea from '../util/bigIdea'
import { graphql } from 'gatsby'

export default ({ data }) => (
  <Layout isIndex="true">
    <Intro>
      <p>
        This study guide focuses on studying through active recall — that is, studying by trying to recall information, instead of just reading notes.
      </p>
      <p>
        It's organized into the categories put out by the College Board for this exam. 
      </p>
    </Intro>
    
    {data.allAirtable.distinct.map((number, i) => (
      <Block key={i} to={'/big-idea-' + number} text={
        `Big Idea ${number}: ${bigIdea[number].statement}`
      }/>
    ))}
    
  </Layout>
)

export const query = graphql`
  query {
    allAirtable(filter: {
      table: { eq: "Review Questions"}
      data: {
        Publish: { eq: true }
      }
    }) {
      distinct(field: data___Big_Idea)
    }
  }
`