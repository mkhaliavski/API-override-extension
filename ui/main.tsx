import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from 'components/pages/Main.tsx'

const root = document.getElementById("main") as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)
