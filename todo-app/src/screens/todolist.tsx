import axios from 'axios';
import { useState, useRef, useEffect } from 'react';

const API_ADDRESS = import.meta.env.VITE_API_ADDRESS;

export default function TodoList() {
  let [todos, setTodos] = useState<any[]>();
  let [page, setPage] = useState<number>(1);
  let userId = "Erjoy";

  async function fetchTodo() {
    let todos = await axios.get(
      `${API_ADDRESS}/todo/get-todo/${userId}?${(page ? page: null)}`
    )
    console.log(todos);
    return todos;
  }

  useEffect( () => {
    const fetchData = async () => {
      await fetchTodo();
    }
    
    fetchData();
  }, []);

  return(
  <>
  </>
  )
}