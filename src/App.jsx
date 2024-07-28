import { useEffect, useState } from "react";
import "./App.css";
import { ToDoProvider } from "./contexts";
import { ToDoForm, ToDoItem } from "./components";

function App() {
  const [todos, setTodos] = useState([]);

  const addToDo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateToDo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteToDo = (id) => {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  //search local storage in JS (w3schools, mdn docs)

  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem('todos'))
    if (todos && todos.length>0) {
      setTodos(todos)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos))
  },[todos])



  return (
    <ToDoProvider
      value={{ todos, addToDo, updateToDo, deleteToDo, toggleComplete }}
    >
      {/* <h1 className="text-3xl font-extrabold underline text-center p-6">
        To Do List Application
      </h1> */}

      <div className=" min-h-screen py-8"
         style={{
          backgroundImage: 'url(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVC1i2z3yuSZbiYsgRVbPyoVxnHzj-oIRnZxHvRPRTsJnrqZMkG-NsQKXTJVqVpAcPkZA&usqp=CAU`)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <ToDoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <ToDoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
        <footer className="text-center text-red-300">
          Developed and designed by Shubham By the help of Chai aur Code
        </footer>
      </div>
    </ToDoProvider>
  );
}

export default App;
