import React from 'react'
import styled from 'styled-components';

const TodoDateContainer = styled.div`
  height: 90px;
  background-color: rgba(202, 226, 193);
  box-sizing: border-box;
  display: flex;
  position: sticky;
  top: 0;
  justify-content: center;
  align-items: center;

  .dateWrap {
    top: 0;
    margin: 0;
    border: 1px solid black;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    text-align: center;
    line-height: 70px;
    font-size: 20px;
    background-color: white;
  }

  .dateString{
    position: absolute;
    right: 5px;
    bottom: 0;
    font-size: 28px;
    font-weight: bold;
    color: white;
  }
`;

function TodoDate({month, date, dateString}) {

  return (
    <TodoDateContainer className='dateContainer'>
      <p className='dateWrap'>
        {month} / {date}
      </p>
      <div className='dateString'>{dateString}</div>
    </TodoDateContainer>
  )
}

export default TodoDate;
