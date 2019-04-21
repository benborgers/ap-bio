import React from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

export default props => (
  <Link
    to={props.to}
    css={css`
      text-decoration: none;
      margin-bottom: 8px;
      font-size: 14px;
      margin-bottom: 16px;
      display: block;
      font-weight: 500;
    `}
  >
    ← Back
  </Link>
)