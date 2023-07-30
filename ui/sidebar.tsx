import ReactDOM from "react-dom/client";
import React from "react";
import Sidebar from "components/pages/Sidebar.tsx";

const root = document.getElementById("sidebar") as HTMLElement;

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <Sidebar />
    </React.StrictMode>,
)
