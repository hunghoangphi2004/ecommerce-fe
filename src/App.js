import './App.css';
import AllRoutes from './components/AllRoutes'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <AllRoutes />
      <ToastContainer />
    </>
  )
}

export default App;
