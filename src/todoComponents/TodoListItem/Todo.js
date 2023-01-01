import React, { useCallback, useState } from 'react'
import styled from 'styled-components';
import TodoEdit from './TodoEdit';

const TodoWrap = styled.li`
  padding: 10px 5px;
  border-bottom: 1.5px dashed #333;
  width: 290px;
  height: 60px;
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 45px;
  margin-bottom: 10px;
  box-sizing: border-box;

  &::-webkit-scrollbar{height: 8px;}
  &::-webkit-scrollbar-thumb{background: rgb(179 235 158); border-radius: 10px;}
  &::-webkit-scrollbar-track{background-color: rgb(89 201 47);}

  &:hover{
    background-color: rgba(134, 200, 99, 0.3);
    border: none;
    overflow-x:scroll;
  }

  & > p{
    width: 290px;
    height: 60px;
  }
`;

function Todo({comment, id, index, CommentChange, RemoveTodo}) {
  const [click, setClick] = useState(false);

  const EscClose = useCallback((e) => {
    if(e.keyCode === 27){
      setClick(value => value = false);
    }
  }, []);

  const ShowTodoEdit = () => {
    setClick(value => value = true);
  };

  const HideTodoEdit = () => {
    setClick(value => value = false);
  };

  return (
    <TodoWrap>
      <p onClick={ShowTodoEdit}>
        {comment}
      </p>
      {click && <TodoEdit 
      ShowTodoEdit={ShowTodoEdit} 
      HideTodoEdit={HideTodoEdit} 
      EscClose={EscClose}
      commnet={comment}
      CommentChange={CommentChange}
      index={index}
      id={id}
      RemoveTodo={RemoveTodo}
      ></TodoEdit>}
    </TodoWrap>
  )
}

export default Todo;