import React from 'react'
import Layout from '../components/layout'
import BackButton from '../components/backButton'
import Eyebrow from '../components/eyebrow'
import Heading from '../components/heading'
import { css } from '@emotion/core'
import { useStaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

export default ({ pageContext: { row } }) => {
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
  
  return (
    <Layout>
      <Helmet>
        <title>{`${row.Question} | ${siteMetadata.title}`}</title>
        <meta property="og:title" content={`${row.Question} | ${siteMetadata.title}`} />
        
        <meta name="description" content={row.Answer.replace(/<\/(p|li)>/g, ' ').replace(/<.*?>/g, '').substr(0, 290) + "..."} />
        <meta property="og:description" content={row.Answer.replace(/<\/(p|li)>/g, ' ').replace(/<.*?>/g, '').substr(0, 290) + "..."} />
      </Helmet>
    
      <BackButton to={'/big-idea-' + row.Big_Idea} />
      <Eyebrow text={row.Big_Idea + '.' + row.Enduring_Understanding} />
      <Heading text={row.Question} />
      <div
        css={css`
          margin-top: 24px;
          
          p, li {
            line-height: 1.5;
          }
          
          p, ul {
            margin-bottom: 24px;
          }
          
          li {
            list-style-position: outside;
            margin-left: 16px;
          }
          
          strong {
            font-weight: 700;
          }
          
          em {
            font-style: italic;
          }
          
          a {
            text-decoration: underline;
          }
        `}
        dangerouslySetInnerHTML={{ __html: row.Answer }}
      />
    </Layout>
  )
}