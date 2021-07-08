import React, { useState } from 'react';
import AddUser from './Users/AddUser';
import UserList from './Users/UserList';

function App() {

  const [users, setUsers] = useState([]);

  const addUserHandler = (username, age) => {
    setUsers(prevUsers => {
      return [...prevUsers, {id: Math.random(), name: username, age: age}];
    });
  };

  return (
    // Essentially is Wrapper
    <React.Fragment>
        <AddUser onAddUser = {addUserHandler}/>
        <UserList usersList = {users}/>
    </React.Fragment>
  );
}

export default App;
