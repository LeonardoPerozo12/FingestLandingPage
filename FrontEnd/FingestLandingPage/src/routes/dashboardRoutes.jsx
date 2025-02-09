import { Routes, Route } from "react-router-dom";
import { Login } from "../Pages/authPages/Login";
import { CitasView } from "../Pages/dashboardPages/CitasView";
import { DashboardView } from "../Pages/dashboardPages/DashboardView";

export function DashboardRoutes() {
    return (
        <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/citas" element={<CitasView />} />
            <Route path="/analytics" element={<DashboardView />} />
        </Routes>
    );
}