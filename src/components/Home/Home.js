import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [user, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/user')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleUserDelete = (id) => {
    const proceed = window.confirm('Are You sure you want to delete');
    if (proceed) {
      const url = `http://localhost:5000/user/${id}`;
      fetch(url, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            const remaining = user.filter((u) => u._id !== id);
            setUsers(remaining);
          }
        });
    }
  };

  return (
    <div>
      <h2>Availabe users {user.length}</h2>
      <ul>
        {user.map((u) => (
          <li key={u._id}>
            {u.name} : {u.email}
            <Link to={`/update/${u._id}`}>
              <button>Update</button>
            </Link>
            <button onClick={() => handleUserDelete(u._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
