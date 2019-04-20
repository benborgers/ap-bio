import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { css, Global } from '@emotion/core'
import { colors } from '../util/theme.js'
import { Helmet } from 'react-helmet'

export default ({ children }) => {
  const siteMetadata = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            isWorkInProgress
          }
        }
      }
    `
  ).site.siteMetadata
  
  return (
    <div>
      <Helmet>
        <title>{siteMetadata.title}</title>
        <meta name="description" content={siteMetadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
    
      <Global
        styles={css`
          * {
            font-family: -apple-system, BlinkMacSystemFont, Roboto, system-ui, sans-serif;
            color: ${colors.gray};
            font-size: 16px;
            font-weight: 400;
            margin: 0;
            padding: 0;
            outline: none;
            background: transparent;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        `}
      />
    
      <header
        css={css`
          background-color: ${colors.lightgray};
          padding: 24px;
        `}
      >
        <p
          css={css`
            color: ${colors.black};
            font-weight: 500;
          `}
        >{siteMetadata.title}</p>
      </header>
      
      <main
        css={css`
          padding: 24px;
        `}
      >
        {children}
      </main>
      
      <footer
        css={css`
          background-color: ${colors.lightgray};
          padding: 24px;
        `}
      >
        <p>Made by <a href="https://instagram.com/bborgers">Ben Borgers</a> — Good luck 🌻</p>
      </footer>
    </div>
  )
}