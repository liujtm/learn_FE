import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 浏览器先加载 index.html 里的 <div id="root"></div>
// 然后这里把 React 组件树挂载进去
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
