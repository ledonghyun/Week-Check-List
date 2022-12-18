import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FiCornerDownLeft, FiX, FiTrash } from "react-icons/fi";

const TodoEditCotainer = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 1;
  position: absolute;
  top: 50%; left: 50%; transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;

  div#EditWrap{
    display: flex;
    justify-content: right;
    align-content: space-arounds;
    flex-wrap: wrap;
    background-color: white;
    width: 550px;
    height: 300px;

    #inputBox{
      display: flex;
      width: 100%;
      height: 40px;
      margin: 20px 0;
      justify-content: center;

      &>input{
      box-sizing: border-box;
      width: 75%;
      height: 40px;
      font-size: 18px;
      outline: none;
      border: none;
      border-bottom: 1px solid #333;
      }
    }

    button{
      z-index: 999;
      display: block;
      width: 50px;
      height: 50px;
      background: none;
      border: none;
      cursor: pointer;
      margin: 5px;
    }

    #EditExit{
      background-color: rgb(134,200,99);
    }
    #todoRemove{
      width: 70px;
    }

    @media screen and (max-width: 560px){
    width: 300px;
    height: 400px;
    }
  }
`;

function TodoEdit({EscClose, HideTodoEdit, comment, CommentChange, id, index, RemoveTodo}) {

  const [enterInput, setEnterInput] = useState(comment);

  const onChangeEnterInput = useCallback(e=>{
    setEnterInput(last => last = e.target.value);
  }, [enterInput]);

  const inputFoucs = useRef();
  useEffect(()=>{
    inputFoucs.current.focus();
  },[]);

  
  const onClick = useCallback(() => {
    CommentChange(enterInput, index-1);
  }, [enterInput]);

  return (
    <TodoEditCotainer>
      <div id='EditWrap'>
        <button id='EditExit' onClick={HideTodoEdit}><FiX size={28} color='white'/></button>
        <div id='inputBox'>
          <input 
            placeholder={comment} 
            onChange={(e)=>onChangeEnterInput(e)} 
            onKeyDown={e=> {if(e.key =='Enter') {return onClick()};}} 
            onKeyUp={EscClose}
            ref={inputFoucs}>
          </input>
        </div>
        <button onClick={onClick}><FiCornerDownLeft size={23}/></button>
        <button id='todoRemove' onClick={()=>{RemoveTodo(id); HideTodoEdit()}}><FiTrash size={23}/></button>
      </div>
    </TodoEditCotainer>
  )
}

export default TodoEdit;