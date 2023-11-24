import Home from './pages/Home/_id'
import Login from './pages/Login/_id'
import Schedules from './pages/Schedules/_id'
import Profile from './pages/Profile/_id'
import Add from './pages/Schedules/Add'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/schedules/add" element={<Add />} />
        </Routes >
      </Router>
    </>

  )
}

export default App
