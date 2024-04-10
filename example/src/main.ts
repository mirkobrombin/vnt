import { createApp } from 'vue'
import App from './App.vue'
import VNT from 'vnt/plugin/vnt'

/* 
EXAMPLE: Using Tauri Engine
*/
import TauriEngine from 'vnt/lib/engines/Tauri'
import { Window } from '@tauri-apps/api/window'

const app = createApp(App)
app.use(VNT, new TauriEngine(Window.getCurrent()))

/*
EXAMPLE: Using Browser Engine

import BrowserEngine from 'vnt/lib/engines/Browser'

const app = createApp(App)
app.use(VNT, new BrowserEngine())
*/

app.mount('#app')
