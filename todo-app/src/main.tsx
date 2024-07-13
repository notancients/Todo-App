import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='flex bg-blue-400 h-screen w-screen'><RouterProvider router={router}/></div>
  </React.StrictMode>,
)
