import React from 'react'
import { css } from '@emotion/core'
import { colors } from '../util/theme.js'
import { Link } from 'gatsby'

export default props => (
  <Link to={props.to}
    css={css`
      text-decoration: none;
    `}
  >
    <div
      css={css`
        background-color: ${colors.main};
        padding: 16px;
        border-radius: 4px;
        margin-bottom: 16px;
        text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
      `}
    >
      <p
        css={css`
          color: white;
          font-size: 20px;
          font-weight: 600;
        `}
      >
        {props.text}
      </p>
    </div>
  </Link>
)