import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../Pages/HomePage";
import Login from "../Components/Login";
import Register from "../Components/Register";
import { Dashboard } from "../Pages/Dashboard";
import { AdminDashboared } from "../Pages/AdminDashboared";
import TrainCheck from "../Components/TrainCheck";
import { GetContextValue } from "../ContextProvider/TrainContext";
// import { Login } from '../Components/Login'

export const AllRoute = () => {
  const { isAuth } = GetContextValue();
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={!isAuth ? <Login /> : <Dashboard />}
        />
        <Route
          path="/admindashboard"
          element={!isAuth ? <Login /> : <AdminDashboared />}
        />
      </Routes>
    </div>
  );
};
