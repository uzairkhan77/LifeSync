import "./App.css";
import MiniDrawer from "./components/Sidebar";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContextProvider } from "./context/AuthContext";
import AuthLayout from "./AuthContext";

function App() {
  return (
    <>
      <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          {/* Routes without MiniDrawer */}
          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />

          {/* Routes with MiniDrawer */}
          <Route path="/*" element={<MiniDrawer />} />
        </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;