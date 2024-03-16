import "./App.scss";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Home from "./Pages/home/home";
import Backlog from "./Pages/backlog/backlog";
import UserForm from "./Pages/userForm/userForm";
import Ranking from "./Pages/ranking/ranking";
import { authContext } from "./context/authContext";
import { useContext } from "react";

function App() {
  const { user } = useContext(authContext);
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route
          path="/sign-up"
          exact
          element={
            !user ? (
              <UserForm
                header="Sign-up"
                postUrl={"http://localhost:8999/api/user/signUp"}
                contextType={"LOGIN"}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/login"
          exact
          element={
            !user ? (
              <UserForm
                header="Login"
                postUrl={"http://localhost:8999/api/user/login"}
                contextType={"LOGIN"}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/backlog"
          element={user ? <Backlog /> : <Navigate to="/login" />}
        />
        <Route
          path="/ranking"
          element={user ? <Ranking /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
