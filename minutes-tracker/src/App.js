import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PreviewData from "./PreviewData";
import Login from "./components/Login";
import Dashboard from "./Dashboard";
import CreateAccount from "./components/CreateAccount";
import Signup from "./Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Navigate to="/login" />}/>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/createAccount" element={<CreateAccount />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/preview" element={<PreviewData />} />
      </Routes>
    </Router>
  );
}

export default App;
