import "./App.css";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import PreviewData from "./PreviewData";
import Login from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<h1>Home</h1>} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/preview" element={<PreviewData />} />
      </Routes>
    </Router>
  );
}

export default App;
