import AllRoutes from './components/AllRoutes'
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <>
      <HelmetProvider>
        <AllRoutes />
        <ToastContainer />
      </HelmetProvider>
    </>
  )
}

export default App;
