import "./App.css";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import PreviewData from "./PreviewData";
import Login from "./Login";
import Dashboard from "./Dashboard";

//TODO: change home route to propper component
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<h1>Home</h1>} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/preview" element={<PreviewData />} />
        <Route exact path="/createEvent" element={<h1>Create an event screen</h1>} />
        <Route exact path="/enroll" element={<h1>Enroll in a course screen</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
