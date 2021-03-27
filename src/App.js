import React from 'react';
import logo from './logo.svg';
import { UserTable } from './features/userTable/UserTable';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <UserTable />
      </header>
    </div>
  );
}

export default App;
