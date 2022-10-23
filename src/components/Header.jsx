import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({ user, setUser }) {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/logout');
    if (response.ok) {
      setUser(null);
      navigate('/');
    }
    console.log('!!!!!!!!!!', user);
  };
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <p
          style={{
            margin: 'auto', fontSize: '30px', fontFamily: 'Arial', fontWeight: 'bold', marginRight: '10px',
          }}
          to="/"
        >
          Examus
        </p>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/something">Link</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {user ? (
              <>
                <li className="nav-item"><Link className="nav-link" onClick={handleLogout} to="/logout">logout</Link></li>
                <li className="nav-item"><p className="nav-link">{user.username}</p></li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/registration">register</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/authorization">login</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
