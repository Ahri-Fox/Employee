import React from "react";
import "./App.css";
import "antd/dist/reset.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import EmployeeList from "./pages/employee/EmployeeList";
import EmployeeTemplate from "./templates/EmployeeTemplate";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <EmployeeTemplate
            path="/listemployee"
            WrappedComponent={EmployeeList}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
