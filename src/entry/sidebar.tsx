import React from "react";
import {createRoot} from "react-dom/client";


const Sidebar = () => (
    <span>This is sidebar</span>
)

const root = createRoot(document.getElementById("root"));
root.render(<Sidebar/>)



