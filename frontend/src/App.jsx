import "./App.css";
import { BrowserRouter, Routes, Route , Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Singup from "./pages/auth/Singup";
import Home from "./pages/home/Home";
import {useQuery, useQueryClient} from '@tanstack/react-query'
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import { Toaster } from "react-hot-toast";


function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("authUser is here : ", data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (isLoading) return <p>Loading...</p>;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Singup />} />
        <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
        <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
        <Route
            path="/dashboard"
            element={authUser ? <Dashboard /> : <Navigate to="/login" />}
          />
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
}

export default App;
