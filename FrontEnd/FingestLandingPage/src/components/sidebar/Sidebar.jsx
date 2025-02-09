import { useState } from "react";
import { toast } from "react-toastify";
import { PopupModal } from "./PopUpModal";
import { SidebarLink } from "./SidebarLink";
import { useNavigate } from "react-router-dom";
import "../../../css/sidebar.css";
import { useSidebarStore } from "../../stores/sidebarStore";

export const Sidebar = () => {
    const { collapsed, toggleSidebar } = useSidebarStore();
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const logout = () => {
        toast.warning("Has cerrado sesión...");
        // TODO: Lógica de cierre de sesión y redirección a la página de login
        navigate("/dashboard/auth/login");
    };

    return (
        <div className="sidebar shadow-lg" style={{ width: collapsed ? "60px" : "250px" }}>
            <SidebarLink to="/dashboard/citas" icon="bi bi-calendar-date">Citas Pendientes</SidebarLink>
            <SidebarLink to="/dashboard/analytics" icon="bi bi-bar-chart">Estadísticas</SidebarLink>

            <span className="logout-icon" onClick={() => setShowModal(true)}>
                <i className="bi bi-box-arrow-right text-black"></i>
                {!collapsed && <span style={{ fontWeight: '500' }}>Cerrar Sesión</span>}
            </span>

            <span className={`collapse-icon ${collapsed ? "rotate-180" : ""}`} onClick={toggleSidebar}>
                <i className="bi bi-chevron-double-left text-black" ></i>
            </span>

            {showModal && (
                <PopupModal show={showModal} onClose={() => setShowModal(false)}>
                    <div className="modal-header">
                        <h3>¡Espera!</h3>
                        <span className="scale" onClick={() => setShowModal(false)}>
                            <i className="bi bi-x-circle"></i>
                        </span>
                    </div>
                    <p style={{ fontSize: "large", color: "black" }}>¿De verdad quieres cerrar sesión?</p>
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                        <button className="btn btn-danger" style={{ width: "45%" }} onClick={() => setShowModal(false)}>Cancelar</button>
                        <button className="btn btn-primary" style={{ width: "45%" }} onClick={logout}>Confirmar</button>
                    </div>
                </PopupModal>
            )}
        </div>
    );
};
