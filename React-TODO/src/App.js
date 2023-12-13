import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import './App.css';
import Todo from './Todo';
import db from './firebase'
import { FormControl, Input, InputLabel } from '@mui/material';


function App() {
  const [todos, setTodos] = useState(['']);
  const [input, setInput] = useState('');

  useEffect(() => {
    db.collection('todos').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => doc.data().todo))
    })
  }, []);

  const addTodo = (event) => {
    event.preventDefault();

    db.collection('todos').add({
      todo: input
    })
    setInput('')
  }

  return (
    <div className="App">
      <h1>Todo List 🚀</h1>
      <form>
        <FormControl>
          <InputLabel htmlFor="my-input">Enter Your ToDo 📖✍ </InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" value={input} onChange={event => setInput(event.target.value)} />
          <Button variant="contained" disabled={!input} type="submit" onClick={addTodo}>Add Todo</Button>
        </FormControl>
      </form>


      <ul>
        {todos.map(todo => (
          <Todo text={todo} />
        ))}
      </ul>



    </div>
  );
}

export default App;
