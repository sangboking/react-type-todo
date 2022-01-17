import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Categories, IToDo, toDoState } from '../atoms'

export default function ToDo({text,category,id}:IToDo) {
  const toDos:IToDo[] = useRecoilValue(toDoState);
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event:React.MouseEvent<HTMLButtonElement>)=>{
    const {
      currentTarget:{name}
    }= event;
    setToDos(oldToDos=>{
      const targetIndex = oldToDos.findIndex(a=>a.id === id)
      const newToDo = {text, id, category:name as any}
      return [...oldToDos.slice(0,targetIndex),newToDo,...oldToDos.slice(targetIndex+1)]
    })
  }
  const remove = (event:React.MouseEvent<HTMLButtonElement>)=>{
    const {
      currentTarget: { parentElement },
    } = event;

    setToDos((todoArray) => {
      const newTodoArray = todoArray.filter((todo) => todo.id !== Number(parentElement?.id));
      const stringifiedNewToDos = JSON.stringify(newTodoArray);
      localStorage.setItem("ToDos", stringifiedNewToDos);
      return newTodoArray;
    });
  }
  
  return (
    <li>
    <span>{text}</span>
    {category !== Categories.DOING && (
      <button name={Categories.DOING+""} onClick={onClick}>
        Doing
      </button>
    )}
    {category !== Categories.TO_DO && (
      <button name={Categories.TO_DO+""} onClick={onClick}>
        To Do
      </button>
    )}
    {category !== Categories.DONE && (
      <button name={Categories.DONE+""} onClick={onClick}>
        Done
      </button>
    )}
    {/* <button onClick={remove}>삭제</button> */}
  </li>
  )
}
