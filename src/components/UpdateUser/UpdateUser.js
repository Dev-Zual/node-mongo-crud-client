import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUsers] = useState({});
  useEffect(() => {
    const url = `http://localhost:5000/user/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const updatedUser = { name, email };

    //send data to server
    const url = `http://localhost:5000/user/${id}`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => console.log('succes', data));
    alert('users added successfully..');
    e.target.reset();
  };
  return (
    <div>
      <h2>Update your information. {user.name}</h2>
      <form onSubmit={handleUpdateUser}>
        <input type="text" name="name" id="name" placeholder="Name" required />
        <br />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
        />
        <br />
        <input type="submit" value="Update User" />
      </form>
    </div>
  );
};

export default UpdateUser;
