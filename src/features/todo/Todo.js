import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { create, edit, remove, toggleComplete, selectTodos } from './todoSlice';

const Todo = () => {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState('');

  const onChange = useCallback((e) => setInputText(e.target.value), []);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(create(inputText));
    setInputText('');
  };

  const handleClick = (id) => () => {
    dispatch(remove({ id }));
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input value={inputText} onChange={onChange} />
        <button type="submit">Create TODO</button>
      </form>
      {todos &&
        todos.map((todo) => (
          <div key={todo.id}>
            {todo.description} {todo.isComplete ? 'Done' : ''}
            <button onClick={handleClick(todo.id)}>Delete TODO</button>
          </div>
        ))}
    </>
  );
};

export default Todo;
