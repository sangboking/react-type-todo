import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Categories, categoryState, toDoSelector} from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';


export default function ToDList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category,setCategory] =  useRecoilState(categoryState)
  const onInput = (event:React.FormEvent<HTMLSelectElement>)=>{
    setCategory(event.currentTarget.value as any);
  }
  return (
    <div>
      <h1>To Dos</h1>
      <hr/>
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo/>
      {toDos?.map((todo)=><ToDo key={todo.id} {...todo}/>)}
       
          
      
    
    </div>
  )
}

