import "../../../css/sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { useSidebarStore } from "../../stores/sidebarStore";

export const SidebarLink = ({ to, icon, children }) => {
    const { collapsed } = useSidebarStore();
    const location = useLocation();
    
    const isActive = location.pathname.startsWith(to);

    return (
        <Link to={to} className={`sidebar-link ${isActive ? "active" : ""}`}>
            <i className={icon}></i>
            {!collapsed && <span>{children}</span>}
        </Link>
    );
};
