import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { css, Global } from '@emotion/core'
import { colors } from '../util/theme.js'
import { Helmet } from 'react-helmet'
import { Search } from 'react-feather'

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
        <meta property="og:title" content={siteMetadata.title} />
        
        <meta name="description" content={siteMetadata.description} />
        <meta property="og:description" content={siteMetadata.description} />
        
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="https://emojicdn.elk.sh/🧬" />
        
        {/* Google Search Console verification - do not remove to keep site ownership verified */}
        <meta name="google-site-verification" content="16Dft6t4AuvD3VKEHCoFfE_6FI1qqUALy5jjYjBEwQ4" />
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
            background-color: white;
          }
          
          ::selection {
            background-color: ${colors.lightmain};
            color: ${colors.black};
          }
        `}
      />
    
      
      <header
        css={css`
          padding: 24px 0;
          padding-top: 36px;
          display: grid;
          grid-template-columns: 1fr auto;
        `}
      >
        <div>
          <Link
            to="/"
            css={css`
              text-decoration: none;
            `}
          >
            <p
              css={css`
                color: ${colors.black};
                font-weight: 600;
                display: inline-block;
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
              >Work in Progress</span> : ""}
            </p>
          </Link>
        </div>
          
        <Link to="/search/">
          <Search color={colors.gray} size={20} css={css`
            * {
              stroke-width: 2.5px;
              line-height: 0;
            }
          `}/>
        </Link>
          
      </header>
      
      <main
        css={css`
          padding: 24px 0;
        `}
      >
        {children}
      </main>
      
      <footer
        css={css`
          padding-top: 20px;
          padding-bottom: 32px;
          border-top: 1px solid ${colors.middlemain};
        `}
      >
        <p>
          Made by
          {" "}
          <a
            href="https://benborgers.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ben Borgers
          </a>
          . Good luck! 🌻
        </p>
      </footer>
    </div>
  )
}