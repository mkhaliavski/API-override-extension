import React from "react";
import {createRoot} from "react-dom/client";


const Main = () => (
    <span>This is main panel 2</span>
)


const root = createRoot(document.getElementById("root"));
root.render(<Main/>)


