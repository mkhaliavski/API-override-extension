import ReactDOM from "react-dom/client";
import React from "react";
import Sidebar from "components/pages/Sidebar.tsx";

ReactDOM.createRoot(document.getElementById('sidebar')!).render(
    <React.StrictMode>
        <Sidebar />
    </React.StrictMode>,
)
