import Home from "./pages/Home/_id";
import Login from "./pages/Login/_id";
import Register from "./pages/Register/_id";
import Schedules from "./pages/Schedules/_id";
import Profile from "./pages/Profile/_id";
import Add from "./pages/Schedules/Add";
import Device from "./pages/Device/_id";
import Report from "./pages/Report/_id";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/schedules/add" element={<Add />} />
          <Route path="/device" element={<Device />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
