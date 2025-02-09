import { Sidebar } from "../sidebar/Sidebar";
import "../../../css/sidebarLayout.css";

export const SidebarLayout = ({ children, sidebarWidthPx }) => {
    return (
        <div className="page">
            <Sidebar />
            <div className="page-content" style={{ marginLeft: sidebarWidthPx }}>
                {children}
            </div>
        </div>
    );
};
