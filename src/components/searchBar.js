/* eslint-disable react-hooks/exhaustive-deps, jsx-a11y/no-autofocus */

import React, { useState, useEffect } from 'react'
import Heading from '../components/heading'
import Block from '../components/block'
import { colors } from '../util/theme.js'
import { css } from '@emotion/core'

export default props => {
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [matchingItems, setMatchingItems] = useState([]);
  
  useEffect(() => {
    fetch(`/search.json`)
      .then(res => res.json())
      .then(json => {
        setSearchData(json);
      })
  }, [])
  
  const handleChange = e => {
    setSearchText(e.target.value.trim().toLowerCase().replace(/ */g, ''));
  }
  
  useEffect(() => {
    setMatchingItems([]);
    setMatchingItems(searchData.filter(item => item.questionAndAnswer.indexOf(searchText) > -1));
    
    if(searchText === '') setMatchingItems([]);
  }, [searchText])
  
  return (
    <div>
      <Heading text="Search all questions" />
      <input type="text" autoFocus onChange={handleChange} css={css`
        margin-bottom: 16px;
        -webkit-appearance: none;
        border: 2px solid ${colors.lightgray};
        border-radius: 4px;
        padding: 8px 8px;
        width: 100%;
        box-sizing: border-box;
      `}/>
      
      {matchingItems.map((item, i) => 
        <Block key={"search-result-" + i} to={item.slug} text={item.question} />
      )}
      
      {matchingItems.length === 0 && searchText !== '' ? <p css={css`
        font-size: 16px;
        font-weight: 500;
        color: ${colors.gray}
      `}>No results found.</p> : ""}
    </div>
  )
}