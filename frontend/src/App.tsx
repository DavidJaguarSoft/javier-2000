import { BrowserRouter, Outlet, Route, Routes } from "react-router"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"
import { ToastContainer } from "react-toastify"
import HomePage from "./pages/home_page/home_page"
import LoginPage from "./pages/login_page/login_page"
import RegisterPage from "./pages/register_page/register_page"
import Navigation from './components/navigation'
import DashboardPage from "./pages/dashboard_page/dashboard_page"

function App() {
  
  return (
    <>
      <BrowserRouter>
        
          <Outlet />
          <ToastContainer />
          <Navigation/>
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
