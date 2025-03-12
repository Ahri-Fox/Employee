import React from "react";
import "./App.css";
import "antd/dist/reset.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import EmployeeList from "./pages/employee/EmployeeList";
import EmployeeTemplate from "./templates/EmployeeTemplate";
import NewEmployee from "./pages/employee/NewEmployee";
import Login from "./pages/login/Login";
import HomeTemplate from "./templates/HomeTemplate";
import Register from "./pages/register/Register";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <HomeTemplate exact path="/" WrappedComponent={Login} />
          <HomeTemplate exact path="/register" WrappedComponent={Register} />


          <EmployeeTemplate exact path="/listemployee" WrappedComponent={EmployeeList} />
          <EmployeeTemplate exact path="/employees/newemployee" WrappedComponent={NewEmployee} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
