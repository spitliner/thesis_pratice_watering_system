<<<<<<< HEAD
import Home from './pages/Home/_id'
import Login from './pages/Login/_id'
import Register from './pages/Register/_id'
import Schedules from './pages/Schedules/_id'
import Profile from './pages/Profile/_id'
import Add from './pages/Schedules/Add'
import Device from './pages/Device/_id'
// import Report from './pages/Report/_id'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter
} from 'react-router-dom'
=======
import { useRoutes } from 'react-router-dom';
import routes from './router';
>>>>>>> 7f40234898d70b21a7a7c2c12f7b6b9142273fb3

function App() {
  const content = useRoutes(routes);
  return <>{content}</>;
}

export default App;
