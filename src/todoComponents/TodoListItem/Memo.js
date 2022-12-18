import React, { memo, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components';

const MemoWrap = styled.textarea`
  display: block;
  background-color: rgb(254, 254, 165);
  padding: 10px;
  padding-top: 30px;
  font-size: 18px;
  resize: none;
  border: none;
  font-family: Arial, sans-serif;
`;

function Memo() {
  const memoInitial = '메모를 입력할수있어요'
  const memo = 'Memo';
  const [memoData, setMemoData] = useState(JSON.parse(localStorage.getItem(memo)) || memoInitial);
  const onFocusOut = useCallback(({target}) => {
    setMemoData(last => last = target.value);
  }, [memoData]);

  useEffect(()=>{
    localStorage.setItem(memo, JSON.stringify(memoData));
  },[memoData, setMemoData]);
  return (
    <MemoWrap 
      onBlur={onFocusOut}
      placeholder={memoData}
      >
    </MemoWrap>
  )
}

export default Memo;
