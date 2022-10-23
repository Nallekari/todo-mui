import logo from './logo.svg';
import './App.css';
import TodoList from './TodoList'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { useState } from'react';

function App() {
  
  const [value, setValue] = useState('home');

  const handleChange = (event, value) => {  setValue(value);};


  return (
    <div className="App">
      <div >
        <Tabs  value={value} onChange={handleChange} >
          <Tab value="home"label="HOME"/>
          <Tab value="todolist"label="TODOS" />
        </Tabs>
        {value === 'home' && <div><b style={{ fontSize: '30px' }}>Welcome to the Home page of this amazing todolist react app</b></div>}
        {value === 'todolist' && <TodoList />}
      </div>
    </div>



);
  
}

export default App;
