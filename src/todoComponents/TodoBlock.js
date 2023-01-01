import React from 'react'
import styled from 'styled-components'
import TodoList from './TodoList'
import Todo from './TodoListItem/Todo'
import TodoDate from './TodoListItem/TodoDate'

const TodoListContainer = styled.div`
  overflow-x:hidden;

  &::-webkit-scrollbar{width: 9px; height: 310px;}
  &::-webkit-scrollbar-thumb{background: rgb(179 235 158);}
  &::-webkit-scrollbar-track{background-color: rgba(134,200,99,0.3);}

  &:hover{overflow-y: scroll;}
  &:nth-child(1)>div.dateContainer{
    background-color: rgb(134, 200, 99);
  }
`;

function TodoBlock({id, month, date}) {
  const idToDateString = () => {
    switch (id) {
      case 0:
        return 'Sun'; 
      case 1:
        return 'Mon';      
      case 2:
        return 'Tue';      
      case 3:
        return 'Wed';      
      case 4:
        return 'Thu';      
      case 5:
        return 'Fri';      
      case 6:
        return 'Sat';      
      default:
        break;
    }
  }
  return (
    <TodoListContainer>
      <TodoDate
        dateString = {idToDateString()}
        month = {month}
        date = {date}
      ></TodoDate>
      <TodoList dateString={idToDateString()}>
        <Todo></Todo>
      </TodoList>
    </TodoListContainer>
  )
}

export default TodoBlock;
