import React, { useEffect, useState } from 'react';
import Form from './Cards/Form';
import ListCard from './Cards/ListCard';

export default function HomePage({ user }) {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState({
    title: '',
    description: '',
  });

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center' }}>Home Page</h1>
      {user
        ? (
          <>
            <div className="container">
              <Form setTasks={setTasks} input={input} setInput={setInput} />
            </div>
            <h2 style={{ textAlign: 'center' }}>Things ToDo:</h2>
            <ListCard tasks={tasks} setTasks={setTasks} user={user} input={input} setInput={setInput} />
          </>
        ) : (
          <h2 style={{ textAlign: 'center' }}>To use this app authorize or register</h2>
        )}
    </div>
  );
}
