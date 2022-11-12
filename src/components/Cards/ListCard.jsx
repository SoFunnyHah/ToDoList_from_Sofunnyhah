import React, { useEffect } from 'react';
import OneCard from './OneCard';

export default function ListCard({
  tasks, setTasks, user, input,
}) {
  useEffect(() => {
    fetch('/api/createTask', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  console.log('TASKS:', tasks);
  return (
    <div className="container">
      {tasks.length === 0
        ? (
          <p style={{
            marginTop: '10px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold',
          }}
          >
            Founded tasks: 0
          </p>
        ) : (
          <ul>
            {tasks?.map((el, i) => <OneCard key={el.id} task={el} user={user} setTasks={setTasks} input={input} index={i+1} />)}
          </ul>
        )}
    </div>
  );
}
