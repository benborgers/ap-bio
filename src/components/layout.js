import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { css, Global } from '@emotion/core'
import { colors } from '../util/theme.js'
import { Helmet } from 'react-helmet'

export default ({ children, isIndex }) => {
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
    <div
      css={css`
        background-color: white;
        min-height: 100vh;
        display: grid;
        grid-template-rows: auto 1fr auto;
        grid-template-columns: minmax(24px, 1fr) minmax(0, 720px) minmax(24px, 1fr);
        
        > * {
          grid-column: 2;
        }
      `}
    >
      <Helmet>
        <title>{siteMetadata.title}</title>
        <meta name="description" content={siteMetadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="https://emojicdn.elk.sh/🧬" />
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
            -webkit-tap-highlight-color: transparent;
          }
          
          body {
            background-color: ${colors.lightmain};
          }
          
          ::selection {
            background-color: ${colors.lightmain};
            color: ${colors.black};
          }
        `}
      />
    
      <Link
        to="/"
        css={css`
          text-decoration: none;
        `}
      >
        <header
          css={css`
            padding: 24px 0;
            padding-top: 36px;
          `}
        >
          <p
            css={css`
              color: ${colors.black};
              font-weight: 600;
            `}
          >
            {siteMetadata.title}
            {siteMetadata.isWorkInProgress ? <span
              css={css`
                background-color: ${colors.main};
                font-weight: inherit;
                margin-left: 8px;
                font-size: 14px;
                padding: 6px 8px;
                color: white;
                border-radius: 4px;
                text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
              `}
            >Work in Progress</span> : ''}
          </p>
        </header>
      </Link>
      
      <main
        css={css`
          padding: 24px 0;
        `}
      >
        {children}
      </main>
      
      <footer
        css={css`
          padding: 24px 0;
          padding-bottom: 36px;
          border-top: 1px solid ${colors.middlemain};
        `}
      >
        <p>
          {isIndex ? "Made by " : "Good luck! 🌻"}
          {isIndex ? <a href="https://instagram.com/bborgers">Ben Borgers</a> : ""}
          {isIndex ? "." : ""}
        </p>
      </footer>
    </div>
  )
}