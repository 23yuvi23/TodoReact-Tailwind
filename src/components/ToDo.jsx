import React, { useEffect, useRef , useState} from 'react'
import todo_icon from "../assets/todo_icon.png"
import TodoItems from './TodoItems'

const ToDo = () => {

  // adding state variable to store the Todo List
  // update the useState([]) to useState(localStorage.getItem) to get data even when page is refreshed 
  const[todoList, setTodoList] = useState
  (localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")) : []); 

  // we used useRef hook so that we get value entered in the input field below 
  const inputRef = useRef();
  const add = ()=>{
    const inputText = inputRef.current.value.trim(); 
    //trim method to remove the extra space 
    // console.log(inputText)

    //suppose we click on add button and nothin in th einput field then this code will not get executed
    if (inputText==="") {
      return null
    }

    // ---------------------status done or not done 
    const newTodo = {
      id: Date.now(),
      text :inputText,
      isComplete: false,
    }

    //store newTodo in array  setTodoList
    setTodoList((prev)=>[...prev,newTodo])
    //clear input field 
    inputRef.current.value="";
  }


  // ------------------delete todo logic
  const deleteTodo = (id)=>{
    setTodoList((prvTodos)=>{
      return prvTodos.filter((todo)=> todo.id!==id)
    })
  }

  //-------toggle complete or not logic
  const toggle = (id)=>{
    setTodoList((prevTodos)=>{
      return prevTodos.map((todo)=>{
        if(todo.id === id){
          return {...todo, isComplete:!todo.isComplete}     // if true then false if false it wil make it true
        }
        return todo;      // return other item without changing status
      })
    })
  }

  useEffect(()=>{
    // add the todos to your browser Local storage
    localStorage.setItem("todos", JSON.stringify(todoList))
    // console.log(todoList);
  },[todoList])

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl '>
        
    {/* --------------------------------Title----------------------------- */}

    <div className='flex items-center mt-7 gap-2'>
        <img className='w-8' src={todo_icon} alt="image"/>
        <h1 className='text-3xl font-semibold'>To-Do List</h1>
    </div>

     {/* --------------------------------Input box----------------------------- */}
    <div className='flex items-center my-7 bg-gray-200 rounded-full'>

        <input ref={inputRef} className='bg-transparent border-0 outline-none 
        flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600
        ' type="text" name="" id="" placeholder='add your task'/>

        <button onClick={add} className='border-none rounded-full 
                bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer 
        '>ADD +</button>
    </div>

     {/* --------------------------------Todo list----------------------------- */}
      <div>

        {/* //now this code will display the todo in screen that we input  */}
        {todoList.map((item,index)=>{
            return <TodoItems key={index} text ={item.text} id={item.id} 
            isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/> 
        })}

        {/* //   ------- hard coded value */}
        {/* <TodoItems text="Learn Coding"/>
        <TodoItems text="Learn Coding part 2"/> */}
      </div>
    <div>

    </div>
    </div>
  )
}

export default ToDo