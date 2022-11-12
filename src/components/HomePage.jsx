import React, { useState } from 'react';
import Form from './Cards/Form';
import ListCard from './Cards/ListCard';

export default function HomePage({ user }) {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState({
    title: '',
    description: '',
  });

  console.log('user!!!!', user);
  return (
    <div className="container">
      <h1 style={{ textAlign: 'center' }}>Home Page</h1>
      {user?.id
        ? (
          <>
            <div className="container">
              <Form setTasks={setTasks} input={input} setInput={setInput} />
            </div>
            <h2 style={{ textAlign: 'center' }}>Things ToDo:</h2>
            <ListCard tasks={tasks} setTasks={setTasks} user={user} input={input} />
          </>
        ) : (
          <h2 style={{ textAlign: 'center' }}>To use this app authorize or register</h2>
        )}
    </div>
  );
}
