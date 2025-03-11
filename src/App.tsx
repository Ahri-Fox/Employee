import React from 'react';
import './App.css';
import 'antd/dist/reset.css'
import { Button } from 'antd';
import EmployeeList from './pages/employee/EmployeeList';
function App() {
  return (
    <div className='App'>
      <EmployeeList/>
    </div>
  );
}

export default App;
