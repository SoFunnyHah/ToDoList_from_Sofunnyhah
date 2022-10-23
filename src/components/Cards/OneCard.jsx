import React, { useEffect, useState } from 'react';

export default function OneCard({
  task, user, setTasks, input, setInput, index,
}) {
  const [newInput, setNewInput] = useState({
    title: '',
    description: '',
  });

  const newInputHandler = (e) => {
    console.log(e.target.name, e.target.value);
    console.log(input, '<-------NEW');
    setNewInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    fetch(`/api/delete/${task.id}`, {
      method: 'DELETE',
    }).then((res) => res.json())
      .then((data) => setTasks(data));
  };

  const editHandler = (e) => {
    e.preventDefault();
    console.log(task.id);
    fetch(`/api/edit/${task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newInput),
    }).then((res) => res.json())
      .then((data) => setTasks(data));
  };
  console.log(task);
  return (
    <>
      <li className="entry-item pad-b-4">
        <h4>
          {index}
          .
          {' '}
          {task.title}
        </h4>
        <p className="entry-stub" style={{ fontSize: '20px' }}>{task.description}</p>
        {task.userid === user.id
          ? (
            <>
              <button type="button" data-bs-toggle="modal" data-bs-target={`#staticBackdrop${task.id}`}>
                edit
              </button>
              <button type="button" onClick={deleteHandler}>delete</button>
            </>
          ) : (
            <p>To edit or delete u mas be a creater of the post</p>
          )}
      </li>
      {/* modal part */}
      <div className="modal fade" id={`staticBackdrop${task.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Введите изменения</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">

              <form>
                <p>
                  This form for
                  {' '}
                  {task.id}
                </p>
                <div style={{ margin: 'auto', textAlign: 'center' }}>
                  <label htmlFor="exampleInputEmail1" className="form-label" style={{ textAlign: 'left' }}>
                    Title:
                    <input onChange={newInputHandler} name="title" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </label>
                </div>
                <div style={{ margin: 'auto', textAlign: 'center' }}>
                  <label htmlFor="exampleInputEmail1" className="form-label" style={{ textAlign: 'left' }}>
                    Description:
                    <input onChange={newInputHandler} name="description" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </label>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <button type="submit" onClick={editHandler} className="btn btn-primary" style={{ backgroundColor: 'green' }} data-bs-dismiss="modal">Create post</button>
                </div>
              </form>

            </div>
            {/* <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal">OK</button>
              </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
