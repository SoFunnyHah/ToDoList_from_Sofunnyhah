import React from 'react';

export default function Form({ setTasks, input, setInput }) {
  const inputHandler = (e) => {
    console.log(e.target.name, e.target.value);
    console.log(input, '<-------');
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetch('/api/createTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    }).then((res) => res.json())
      .then((data) => setTasks((prev) => [...prev, data]));
    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div style={{ margin: 'auto', textAlign: 'center' }}>
          <label htmlFor="exampleInputEmail1" className="form-label" style={{ textAlign: 'left' }}>
            Title:
            <input onChange={inputHandler} name="title" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </label>
        </div>
        <div style={{ margin: 'auto', textAlign: 'center' }}>
          <label htmlFor="exampleInputEmail1" className="form-label" style={{ textAlign: 'left' }}>
            Description:
            <input onChange={inputHandler} name="description" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </label>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'green' }}>Create post</button>
        </div>
      </form>
    </div>
  );
}
