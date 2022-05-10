import "./App.css";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import PreviewData from "./PreviewData";
import Login from "./components/Login";
import Dashboard from "./Dashboard";
<<<<<<< HEAD
import CreateAccount from "./components/CreateAccount";
import CreateCourse from "./components/CreateCourse";
=======
import Signup from "./Signup";
import Enroll from "./Enroll";
>>>>>>> 875b770 (enroll and signup added 2)

//TODO: change home route to propper component
function App() {
  
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<h1>Home</h1>} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/createAccount" element={<CreateAccount />} />
        <Route exact path="/createCourse" element={<CreateCourse />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/preview" element={<PreviewData />} />
        <Route exact path="/createEvent" element={<h1>Create an event screen</h1>} />
        <Route exact path="/enroll" element={<Enroll />} />
      </Routes>
    </Router>
  );
}

export default App;
