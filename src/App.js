import React from 'react';
import logo from './logo.svg';
import { UserForm } from './features/userForm/UserForm';
import { UserTable } from './features/userTable/UserTable';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Your Favorite People</h1>
      </header>

      <UserForm />
      <UserTable />
    </div>
  );
}

export default App;
