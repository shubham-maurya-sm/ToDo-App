import React, { useState } from 'react'
import { useToDo } from '../contexts/ToDoContexts';

function ToDoForm() {

    const [todo,setTodo]=useState('')
    const {addToDo}=useToDo()  

    const add=(evnt)=>{
        evnt.preventDefault()

        if (!todo) return 

        addToDo({todo, completed:false})
        setTodo('')
    }


  return (
    <div>
      <form onSubmit={add} className="flex">
        <input
          type="text"
          placeholder="Write Todo..."
          className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
          value={todo}
          onChange={(evnt)=> setTodo(evnt.target.value)}
        />
        <button
          type="submit"
          className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default ToDoForm
