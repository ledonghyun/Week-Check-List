import React, { useCallback, useEffect, useState } from 'react'
import uuid from 'react-uuid';
import styled from 'styled-components';
import Todo from './TodoListItem/Todo';
import {FiRotateCcw} from "react-icons/fi";

const TodoUl = styled.ul`
    list-style: none;
    padding: 10px 0;
    box-sizing: border-box;

    .add-todo{
      width: 100%;
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 35px;
      font-weight: 300;
      cursor: pointer;

      &:hover{
        background-color: rgba(134, 200, 99, 0.3);
      }
    }

    #resetButton{
      display: block;
      width: 100%;
      background: none;
      border: none;
      text-align: right;
    }
`; 

const ReconfirmReset = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 999;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;

  div.confirmWrap{
    width: 550px;
    height: 300px;
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    p{
      text-align: center;
      width: 100%;
      height: 50px;
      font-size: 21px;

      button{
        cursor: pointer;
        display: inline-block;
        width: 80px;
        height: 50px;
        margin: 0 20px;
        border: none;
        font-size: 18px;

        &.no{
          background: rgba(134, 200, 99, 0.8);
        }
      }
    }
    @media screen and (max-width: 560px){
      width: 300px;
      height: 400px;

      &>p{
        font-size: 18px;

        &>button{
          font-size: 15px;
        }
      }
    }
  }
`;

function TodoList({dateString}) {
  const [reset, setReset] = useState(false);
  const ShowResetConfirm = () => {
    setReset(last => last = true);
  }
  const HideResetConfirm = () => {
    setReset(last => last = false);
  }
  const date = `${dateString}`;
  const localStorageGetDate = localStorage.getItem(date);


  const todoCommentInitial = '내용을 입력해주세요'
  const todoDataInitial = [
    {
      id: uuid(),
      comment: todoCommentInitial
    },
    {
      id: uuid(),
      comment: todoCommentInitial
    },
    {
      id: uuid(),
      comment: todoCommentInitial 
    }
  ];
  const [todoData, setTodoData] = useState(JSON.parse(localStorageGetDate) || todoDataInitial
  );
  
  const CommentChange = (e, id) =>{
    if (e){
      const dataCopy = [...todoData];
      dataCopy[id].comment = `${e}`;
      setTodoData(last=>last = dataCopy);
    }
  }; 
  const AddTodo = useCallback(() => { 
    const nextTodoData = [...todoData];
    nextTodoData.push({
      id: uuid(),
      comment: todoCommentInitial
    });
    setTodoData(currentData => currentData = nextTodoData);
  }, [todoData]);
  
  const RemoveTodo = useCallback((removeId)=>{
    const dataCopy = [...todoData];
    const nextTodoData = dataCopy.filter((value) => {
      return value.id !== removeId
    });
    setTodoData(currentData => currentData = nextTodoData)
  }, [todoData]);

  const ResetTodoData = useCallback(()=>{
    const nextTodoData =todoDataInitial;
    setTodoData(last => last = nextTodoData);
    HideResetConfirm();
  }, [todoDataInitial])
  
  useEffect(()=>{
    localStorage.setItem(date, JSON.stringify(todoData));
  }, [todoData, date]);
  
  const todo = todoData.map((elem, idx) => {
    return (<Todo key={date + idx} index={idx + 1} id={elem.id} CommentChange={CommentChange} RemoveTodo={RemoveTodo} comment={elem.comment}></Todo>);
  });

  return (
      <TodoUl>
        {reset && 
        <ReconfirmReset>
          <div className='confirmWrap'>
            <p>{date}의 일정을 초기화하시겠습니까?</p>
            <p>
              <button className='yes' onClick={ResetTodoData}>네</button>
              <button className='no' onClick={HideResetConfirm}>아니오</button>
            </p>
          </div>
        </ReconfirmReset>}
        <button id='resetButton' onClick={ShowResetConfirm}><FiRotateCcw size={20}/></button>
        {todo}
        <p className='add-todo' onClick={AddTodo}>+</p>
      </TodoUl>
  )
}

export default TodoList;
