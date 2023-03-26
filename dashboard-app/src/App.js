import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

//pages
import Home from "./pages/home"
import Create from "./pages/create"
import Update from "./pages/update"

function App() {
  return (
    <BrowserRouter>
    <nav>
      <h1>Dashboard App</h1>
    </nav>
    <h2>
        <Link to="/">Home</Link>
        <Link to="/create">Create New Entry</Link>
    </h2>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/:id" element={<Update />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
