import './AdminLayout.css';

import React from "react";
import Sidebar from "../admin/sidebar/Sidebar";
import { Outlet } from 'react-router-dom';

function AdminLayout() {
    return (
        <div className="admin-container">
            <Sidebar />
            <div className="admin-right-content">
                <Outlet/>
            </div>
        </div>
    );
}

export default AdminLayout;
