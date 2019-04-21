import React from 'react'
import Layout from '../components/layout'
import BackButton from '../components/backButton'
import Eyebrow from '../components/eyebrow'
import Heading from '../components/heading'
import { css } from '@emotion/core'

export default ({ pageContext: { row } }) => (
  <Layout>
    <BackButton to={'/big-idea-' + row.Big_Idea} />
    <Eyebrow text={row.Big_Idea + '.' + row.Enduring_Understanding} />
    <Heading text={row.Question} />
    <div
      css={css`
        p, li {
          line-height: 1.5;
        }
        
        p, ul {
          margin-bottom: 24px;
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