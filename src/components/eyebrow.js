import React from 'react'
import { css } from '@emotion/core'
import { colors } from '../util/theme.js'

export default props => (
  <p
    css={css`
      color: white;
      font-weight: 500;
      padding: 4px 8px;
      border-radius: 4px;
      max-width: max-content;
      background-color: ${colors.main};
      margin-bottom: 8px;
      text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    `}
  >
    {props.text}
  </p>
)