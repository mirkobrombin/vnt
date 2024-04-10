import { createApp } from 'vue'
import App from './App.vue'
import VNT from 'vnt/plugin/vnt'
import TauriEngine from 'vnt/lib/engines/Tauri'
import { Window } from '@tauri-apps/api/window'

const app = createApp(App)

app.use(VNT, new TauriEngine(Window.getCurrent()))

app.mount('#app')
