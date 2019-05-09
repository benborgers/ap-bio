import React from 'react'
import Layout from '../components/layout'
import Block from '../components/block'
import bigIdea from '../util/bigIdea'
import { graphql } from 'gatsby'

export default ({ data }) => (
  <Layout isIndex="true">
  
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
