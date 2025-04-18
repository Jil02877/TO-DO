import Navbar from './components/Navbar'
import './App.css'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }
  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }
  const handleDelete = (e, id) => {
    // let a = confirm("Are you Want To Delete!")
    // if (a === true) {
      let newTodos = todos.filter(item => {
        return item.id !== id
      });
      setTodos(newTodos)
      saveToLS()
      // alert("Todo Is Successfully Delete!!")
    // }
    // else {
    //   alert("Todo Is not Delete!!")
    // }

  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheakBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id
    })
    console.log(`The id is ${id}`)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-3xl'>iTask - Manage Your todos at one place</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <div className="flex">

            <input onChange={handleChange} value={todo} type="text" className='w-full px-5 py-1 rounded-full' />
            <button onClick={handleAdd} disabled={todo.length < 3} className='bg-violet-800 disabled:bg-violet-700 hover:bg-violet-950 p-4 py-2 text-white font-bold rounded-full mx-2'>Save</button>
          </div>
        </div>
        <input onChange={toggleFinished} id='show' type="checkbox" checked={showFinished} /> 
        <label className='mx-2' htmlFor="show">Show Finshied</label>
        <div className="h-[1px] bg-black opacity-15 w-3/4 my-3 mx-auto"></div>
        <h2 className='text-lg my-5 font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todo To Display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-full md:w-1/2 justify-between gap-4">
              <div className='flex gap-5'>
                <input onChange={handleCheakBox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? "line-through" : ""} >{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 px-3 py-1 text-white font-bold rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 px-3 py-1 text-white font-bold rounded-md mx-1'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
