import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import TodoBlock from './TodoBlock';
import Memo from './TodoListItem/Memo';

const Templete = styled.div`
  h1{
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.6);
    font-size: 35px;
    font-weight: bolder;
    padding: 15px;
    margin-bottom: 20px;

  }
`;

const TodoListWrap = styled.div`

  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;

  & > div, & > textarea {
    width: 290px;
    height: 430px;
    box-sizing: border-box;
    margin: 5px;
  }

  @media screen and (max-width: 1200px){
    width: 800px;
    justify-content: center;
  };
  @media screen and (max-width: 799.9px){
    width: 400px;
    justify-content: space-around;
    #EditWrap{
      width: 300px;
    }
  };
  @media screen and (max-width: 399.9px){
    width: 300px;
    justify-content: space-around;
  };
`;





function TodoListTemplete() {

  const [listDateData, setListDateData] = useState([]);
  const today = new Date();
  const todayDate = today.getDate();

  useEffect(()=>{
    const weekDateData = [];
    const todayDay = true;

    if (todayDay == true) {
      for (let i=0; i<7; i++){
        const tomorrow = new Date(today.setDate(today.getDate() + i));    
        const [tomorrowMonth, tomorrowDate, tomorrowDay] = [tomorrow.getMonth()+1, tomorrow.getDate(), tomorrow.getDay()];
  
        const dateData = {
          id: tomorrowDay,
          month: tomorrowMonth,
          date: tomorrowDate
        };
        weekDateData.push(dateData);
        today.setDate(today.getDate()-i);
      }
    };
    setListDateData(last => last=weekDateData);
  },[todayDate]);
  /* 오늘을 기준으로 일주일데이터(dateData)를 알려주는 함수 */

  const todoBlock = listDateData.map((elem)=>{
     return <TodoBlock key={elem.id} id={elem.id} month={elem.month} date={elem.date}></TodoBlock>;
  }); 

  return (
    <Templete>
      <h1>WeekTodoList</h1>
      <TodoListWrap>
        {todoBlock}
        <Memo></Memo>
      </TodoListWrap>
    </Templete>
  )
}

export default TodoListTemplete;