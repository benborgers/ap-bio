import React from 'react'
import { css } from '@emotion/core'
import { colors } from '../util/theme.js'

export default props => (
  <h1
    css={css`
      margin-bottom: 16px;
      color: ${colors.black};
      font-weight: 700;
      font-size: 24px;
      line-height: 1.3;
    `}
  >
    {props.text}
  </h1>
)