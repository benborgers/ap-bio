import React from 'react'
import { css } from '@emotion/core'

export default ({ children }) => (
  <div
    css={css`
      margin-bottom: 24px;
      
      p {
        line-height: 1.5;
        margin-bottom: 16px;
      }
    `}
  >
    {children}
  </div>
)