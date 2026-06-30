import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 浏览器先加载 index.html 里的 <div id="app"></div>
// 再由这里创建 Vue 应用实例并挂载进去
createApp(App).mount('#app')
