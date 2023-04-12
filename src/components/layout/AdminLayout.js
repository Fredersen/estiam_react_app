import './AdminLayout.css';

import React from "react";
import Sidebar from "../admin/sidebar/Sidebar";

function AdminLayout({ children }) {
    return (
        <div className="admin-container">
            <Sidebar />
            <div className="admin-right-content">
                {children}
            </div>
        </div>
    );
}

export default AdminLayout;
